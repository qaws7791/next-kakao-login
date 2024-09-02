import "server-only";
import serverEnv from "@/server/lib/env";
import { KakaoApi, KakaoTokenResponse } from "./kakao-api.types";
import clientEnv from "@/client/lib/env";
import { KakaoUserInfo } from "@/kakao/kakao";

const kakaoApi: KakaoApi = {
  fetchUser(accessToken: string) {
    return fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json() as Promise<KakaoUserInfo>);
  },

  fetchToken(code: string) {
    return fetch(
      `https://kauth.kakao.com/oauth/token?${new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: clientEnv.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        redirect_uri: clientEnv.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        client_secret: serverEnv.KAKAO_CLIENT_SECRET,
      })}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((response) => response.json() as Promise<KakaoTokenResponse>);
  },
};
export default kakaoApi;
