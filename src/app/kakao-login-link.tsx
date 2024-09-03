import clientEnv from "@/client/lib/env";
import Image from "next/image";
/**
 * 카카오 로그인 링크 컴포넌트.
 * @description REST API 키와 리다이렉트 URI를 사용하여 카카오 로그인 링크를 생성한다.
 */
export default function KakaoLoginLink() {
  return (
    <a
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${clientEnv.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${clientEnv.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
    >
      <Image
        src="/kakao_login.png"
        alt="카카오 계정으로 로그인"
        width={600}
        height={90}
      />
    </a>
  );
}
