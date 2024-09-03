"use client";

import { useKakao } from "@/app/kakao-provider";
import clientEnv from "@/client/lib/env";
import Image from "next/image";

/**
 * 카카오 로그인 버튼 컴포넌트.
 * @description 카카오 SDK가 로드되었는지 확인한 후, 로그인을 시도한다.
 */

export default function KakaoLoginButton() {
  const { kakao, isLoaded } = useKakao();
  return (
    <button
      onClick={() => {
        if (!isLoaded)
          return alert(
            "카카오 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
          );
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
