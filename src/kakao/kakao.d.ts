/**
 * Kakao JavaScript SDK 타입 정의
 */

import { KakaoAuth } from "@/kakao/auth/kakao-auth.types";

interface KakaoUserInfo {
  /**
   * 회원번호
   * Member number
   * @type {number}
   */
  id: number;

  /**
   * 연결하기 호출의 완료 여부
   * Whether the connection call is complete
   * 자동 연결 설정을 비활성화한 경우만 존재
   * Only exists when automatic connection setting is disabled
   * @type {boolean}
   */
  has_signed_up?: boolean;

  /**
   * 서비스에 연결 완료된 시각, UTC*
   * Time when connected to the service, UTC*
   */
  connected_at?: string;

  /**
   * 카카오싱크 간편가입을 통해 로그인한 시각, UTC*
   * Time when logged in through Kakao Sync simple registration, UTC*
   */
  synched_at?: string;
  /**
   * 사용자 프로퍼티(Property)로 nickname, profile_image, thumbnail_image는 예약된 이름입니다.
   * nickname, profile_image, thumbnail_image are reserved names for user properties
   */
  properties?: {
    nickname?: string; // 닉네임
    profile_image?: string; // 프로필 이미지 URL
    thumbnail_image?: string; // 썸네일 이미지 URL
  } & Record<string, string>;

  /**
   * 카카오계정 정보
   * Kakao Account information
   */
  kakao_account?: KakaoAccount;

  /**
   * uuid 등 추가 정보
   * Additional information such as uuid
   */
  for_partner?: KakaoPartner;
}

interface KakaoAccount {
  /**
   * 카카오계정 대표 이메일(카카오계정 이메일 동의 필요)
   * Kakao Account representative email
   * @type {string}
   */
  email?: string;
  /**
   * 사용자 동의 시 카카오계정 대표 이메일 제공 가능
   */
  email_needs_agreement?: boolean;
  /**
   * 카카오계정이 있는지 여부
   */
  has_email?: boolean;
  /**
   * 전화번호가 있는지 여부
   */
  has_phone_number?: boolean;
  /**
   * 이메일 유효 여부
   */
  is_email_valid?: boolean;
  /**
   * 이메일 인증 여부
   */
  is_email_verified?: boolean;
  /**
   * 카카오톡 사용자 여부
   */
  is_kakaotalk_user?: boolean;
  /**
   * 전화번호 국내 번호: "+82 00-0000-0000"형식 / 해외 번호 https://github.com/google/libphonenumber 참고
   *
   */
  phone_number?: string;
  /**
   * 사용자 동의 시 전화번호 제공 가능
   */
  phone_number_needs_agreement?: boolean;
  /**
   * 사용자 동의 시 프로필 정보(닉네임/프로필 사진) 제공 가능
   */
  profile_needs_agreement?: boolean;

  /**
   * 사용자 동의 시 닉네임 제공 가능
   */
  profile_nickname_needs_agreement?: boolean;

  /**
   * 사용자 동의 시 프로필 사진 제공 가능
   */
  profile_image_needs_agreement?: boolean;

  /**
   * 프로필 정보
   */
  profile?: KakaoProfile;

  /**
   * 사용자 동의 시 카카오 계정 이름 제공 가능
   */
  name_needs_agreement?: boolean;

  /**
   * 카카오 계정 이름
   */
  name?: string;

  /**
   * 사용자 동의 시 연령대 제공 가능
   */
  age_range_needs_agreement?: boolean;

  /**
   * 연령대
   * @type {"1~9" | "10~14" | "15~19" | "20~29" | "30~39" | "40~49" | "50~59" | "60~69" | "70~79" | "80~89" | "90~"}
   *
   */
  age_range?:
    | "1~9"
    | "10~14"
    | "15~19"
    | "20~29"
    | "30~39"
    | "40~49"
    | "50~59"
    | "60~69"
    | "70~79"
    | "80~89"
    | "90~";

  /**
   * 사용자 동의 시 출생 연도 제공 가능
   */
  birthyear_needs_agreement?: boolean;

  /**
   * 출생 연도(YYYY 형식)
   */
  birthyear?: string;

  /**
   * 사용자 동의 시 생일 제공 가능
   */
  birthday_needs_agreement?: boolean;

  /**
   * 생일(MMDD 형식)
   */
  birthday?: string;

  /**
   * 생일 타입
   * @type {"SOLAR" | "LUNAR"}
   */
  birthday_type?: "SOLAR" | "LUNAR";

  /**
   * 사용자 동의 시 성별 제공 가능
   */
  gender_needs_agreement?: boolean;

  /**
   * 성별
   * @type {"female" | "male"}
   */
  gender?: "female" | "male";

  /**
   * 사용자 동의 시 CI 참고 가능
   */
  ci_needs_agreement?: boolean;

  /**
   * 연계정보
   */
  ci?: string;

  /**
   * CI 발급 시각, UTC*
   */
  ci_authenticated_at?: string;
}

interface KakaoProfile {
  /**
   * 프로필 사진 URL이 기본 프로필 사진 URL인지 여부
   */
  is_default_image?: boolean;
  /**
   * 닉네임이 기본 닉네임인지 여부
   */
  is_default_nickname?: boolean;
  /**
   * 닉네임
   */
  nickname?: string;
  /**
   * 프로필 사진 URL. 640px * 640px 또는 480px * 480px
   */
  profile_image_url?: string;
  /**
   * 프로필 미리보기 이미지 URL. 110px * 110px 또는 100px * 100px
   */
  thumbnail_image_url?: string;
}

interface KakaoPartner {
  /**
   * 고유 ID. 카카오톡 메시지 API 사용 권한이 있는 경우에만 제공
   */
  uuid?: string;
}

interface Kakao {
  /**
   * 카카오 SDK 초기화 여부를 반환합니다.
   */
  isInitialized(): boolean;
  /**
   * 카카오 SDK를 초기화합니다.
   * @param apiKey 카카오 앱의 JavaScript 키를 입력합니다.
   */
  init(apiKey: string): void;
  Auth: KakaoAuth;
  API: KakaoAPI;
  Link: KakaoLink;
  Story: KakaoStory;
  Channel: KakaoChannel;
  PlusFriend: KakaoPlusFriend;
}

// 전역 Kakao 네임스페이스 선언
declare global {
  interface Window {
    Kakao?: Kakao;
  }
}
