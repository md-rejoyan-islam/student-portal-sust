import { refreshAccessToken } from "@/lib/refresh-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "No refresh token" },
      { status: 401 },
    );
  }

  try {
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      return NextResponse.json(
        { success: false, message: "Refresh failed" },
        { status: 401 },
      );
    }

    // Set the new access token cookie — this works because Route Handlers CAN modify cookies
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/students", // Ensure this matches your basePath
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token route handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal error during refresh" },
      { status: 500 },
    );
  }
}
