"use server";
import { cookies } from "next/headers";

// Set a cookie
export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

// Get a cookie value
export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  await setCookie("accessToken", accessToken);
  await setCookie("refreshToken", refreshToken);
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function getAccessToken() {
  return await getCookie("accessToken");
}
