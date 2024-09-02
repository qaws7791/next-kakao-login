import { KakaoUserInfo } from "@/kakao/kakao";

export interface KakaoTokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  id_token?: string;
  scope?: string;
}

export type KakaoApi = {
  fetchUser: (accessToken: string) => Promise<KakaoUserInfo>;
  fetchToken: (code: string) => Promise<KakaoTokenResponse>;
};
