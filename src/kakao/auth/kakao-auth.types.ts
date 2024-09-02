import { KakaoUserInfo } from "@/kakao/kakao";

export default interface KakaoAuth {
  /**
   * 카카오 로그인 간편로그인
   * Login for Kakao Login
   *
   * @param {KakaoAuthorizeSettings} settings - 로그인 설정 객체
   * @see https://developers.kakao.com/sdk/reference/js/release/Kakao.Auth.html#.authorize
   */
  authorize(settings: KakaoAuthorizeSettings): void;
  /**
   * 사용한 카카오 로그인 모듈 리소스 해제
   * Cleans up used Kakao Login module resources
   */
  cleanup(): void;

  /**
   * Kakao SDK에 할당된 액세스 토큰 값 반환
   * Returns the access token set in the Kakao SDK
   *
   * @returns {string} 액세스 토큰 값
   *          The access token value
   */
  getAccessToken(): string;

  /**
   * Kakao SDK 초기화 시 사용된 앱 키 반환
   * Returns the app key used to initialize the Kakao SDK
   *
   * @returns {string} 앱 키 값
   *          The app key value
   */
  getAppKey(): string;

  /**
   * 현재 사용자의 카카오 로그인 상태 반환
   * Returns the current user's Kakao login status
   *
   * @returns {Promise<StatusResponse | AuthError>} 로그인 상태 또는 에러 정보
   *          The login status or error information
   */
  getStatusInfo(): Promise<StatusResponse | AuthError>;

  /**
   * 로그아웃
   * Logout
   *
   * @returns {Promise<LogoutResponse | AuthError>} 로그아웃 응답 또는 에러 정보
   *          The logout response or error information
   */
  logout(): Promise<LogoutResponse | AuthError>;

  /**
   * 배송지 선택하기
   * Select shipping address
   *
   * @param {Object} settings - 배송지 선택 설정 객체
   * @param {boolean} [settings.forceMobileLayout=false] - 모바일 레이아웃으로 고정 여부
   * @param {boolean} [settings.enableBackButton=true] - 뒤로가기 버튼 활성화 여부
   * @returns {Promise<ShippingAddressResponse | ShippingAddressError>} 배송지 정보 또는 에러 정보
   *          Shipping address response or error information
   */
  selectShippingAddress(settings: {
    forceMobileLayout?: boolean;
    enableBackButton?: boolean;
  }): Promise<ShippingAddressResponse | ShippingAddressError>;

  /**
   * 토큰 할당하기
   * Set tokens
   *
   * @param {string} token - 액세스 토큰
   * @param {boolean} [persist=true] - 세션 스토리지에 액세스 토큰을 저장할지 여부
   */
  setAccessToken(token: string, persist?: boolean): void;
}

interface KakaoAuthorizeSettings {
  /**
   * 인가 코드를 전달받을 서비스 서버의 URI
   * URI of the service server to get the authorization code
   */
  redirectUri?: string;

  /**
   * 카카오 로그인 과정 중 동일한 값을 유지하는 임의의 문자열 (정해진 형식 없음)
   * A string that keeps the same value during the Kakao Login process (No fixed format)
   */
  state?: string;

  /**
   * 사용자에게 동의 요청할 동의항목 ID 목록, 쉼표로 구분된 문자열
   * Scope IDs to request for user's consent, a comma-separated string
   */
  scope?: string;

  /**
   * 동의 화면에 상호작용 추가 요청 프롬프트
   * Prompt to add an interaction to the consent screen
   * Possible values: 'login', 'none', 'create', 'select_account'
   */
  prompt?: "login" | "none" | "create" | "select_account";

  /**
   * 카카오계정 로그인 페이지의 ID란에 자동 입력할 값
   * A value to fill in the ID field of the Kakao Account login page
   */
  loginHint?: string;

  /**
   * ID 토큰 재생 공격 방지를 위한 검증 값, 임의의 문자열
   * Random strings to prevent replay attacks
   */
  nonce?: string;

  /**
   * 간편로그인 사용 여부
   * Whether to use simple login
   */
  throughTalk?: boolean;
}

interface AuthError {
  error: {
    code: number; // 에러 코드
    msg: string; // 에러 메시지
  };
}

interface LogoutResponse {
  userInfo: {
    id: number; // 회원번호
  };
}

interface ShippingAddressError {
  error: {
    error_code: string; // 에러 코드
    error_msg: string; // 에러 메시지
  };
  status: "error"; // 요청 결과, error로 고정
}

interface ShippingAddressResponse {
  response: {
    address_id: number; // 배송지 ID
  };
  status: "success"; // 요청 결과, success로 고정
}

interface StatusResponse {
  statusInfo: {
    status: "connected" | "not_connected"; // 로그인 상태
    user: KakaoUserInfo; // 사용자 정보
  };
}
