import { NextRequest } from "next/server";
import {
  insertUser,
  selectUserByKakaoId,
  updateUser,
} from "../../../../../drizzle/queries";
import { createSession } from "@/server/lib/session";
import { redirect } from "next/navigation";
import KakaoApi from "@/kakao/api";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response(
      JSON.stringify({
        error: "Bad Request",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  try {
    const { access_token } = await KakaoApi.fetchToken(code);

    const kakaoUser = await KakaoApi.fetchUser(access_token);

    const existingUser = await selectUserByKakaoId(kakaoUser.id);
    const updatedUser = existingUser
      ? await updateUser(existingUser.id, {
          photo: kakaoUser.properties?.profile_image,
        })
      : await insertUser({
          kakaoId: kakaoUser.id,
          name: kakaoUser.properties?.nickname || "Unknown",
          photo: kakaoUser.properties?.profile_image,
        });
    if (!updatedUser) {
      throw new Error("Failed to create or update user");
    }
    createSession(updatedUser.id);
  } catch (error) {
    console.error(error);
  } finally {
    return redirect("/");
  }
}
