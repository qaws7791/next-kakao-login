"use client";

import { useKakao } from "@/app/kakao-provider";
import clientEnv from "@/client/lib/env";
import Image from "next/image";

export default function KakaoLoginButton() {
  const { kakao } = useKakao();
  return (
    <button
      onClick={() => {
        if (!kakao?.Auth) return;
        kakao.Auth.authorize({
          redirectUri: clientEnv.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        });
      }}
    >
      <Image
        src="/kakao_login.png"
        alt="카카오 계정으로 로그인"
        width={600}
        height={90}
      />
    </button>
  );
}
