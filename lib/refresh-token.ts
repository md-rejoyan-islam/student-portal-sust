import { API_BASE_URL } from "./env";

/**
 * Exchange a refresh token for a new access token.
 * @returns The new access token string, or `null` if refresh failed.
 */
export async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data?.accessToken ?? null;
  } catch (error) {
    console.error("refreshAccessToken error:", error);
    return null;
  }
}
