import { getCookie } from "@/app/actions";
import { API_BASE_URL } from "@/lib/env";
import { refreshAccessToken } from "@/lib/refresh-token";

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(message: string, status: number, data?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data ?? {};
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function api<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const isRefreshRequest = endpoint === "/refresh-token";

  // Build URL with query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const token = await getCookie("accessToken");

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...fetchOptions.headers,
    };

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized - Refresh Token Flow
      if (response.status === 401 && !isRefreshRequest) {
        try {
          const refreshToken = await getCookie("refreshToken");

          if (refreshToken) {
            // Use shared refresh utility (read-only, in-memory token)
            const newAccessToken = await refreshAccessToken(refreshToken);

            if (newAccessToken) {
              // Retry the original request with the new access token
              const retryHeaders = {
                ...headers,
                Authorization: `Bearer ${newAccessToken}`,
              };

              const retryResponse = await fetch(url, {
                ...fetchOptions,
                headers: retryHeaders,
              });

              const retryData = await retryResponse.json();
              if (!retryResponse.ok) {
                throw new ApiError(
                  retryData.message || "API Error",
                  retryResponse.status,
                  retryData,
                );
              }
              return retryData;
            }
          }
        } catch (refreshError) {
          // Refresh failed — let it fall through to throw the original 401
          console.error("Token refresh failed:", refreshError);
        }
      }

      throw new ApiError(data.message || "API Error", response.status, data);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
