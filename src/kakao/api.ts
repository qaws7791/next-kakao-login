import "server-only";
import serverEnv from "@/server/lib/env";
import { KakaoTokenResponse, KakaoUserResponse } from "./kakao.types";
import clientEnv from "@/client/lib/env";

const KakaoApi = {
  fetchUser(accessToken: string) {
    return fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json() as Promise<KakaoUserResponse>);
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
export default KakaoApi;
