"use client";
import clientEnv from "@/client/lib/env";
import { Kakao } from "@/kakao/kakao";
import Script from "next/script";
import { createContext, useCallback, useContext, useState } from "react";

type kakaoLoginContext =
  | {
      kakao: Kakao;
      isLoaded: true;
    }
  | {
      kakao: null;
      isLoaded: false;
    };

const kakaoContext = createContext<kakaoLoginContext | undefined>({
  kakao: null,
  isLoaded: false,
});

export const useKakao = () => {
  const context = useContext(kakaoContext);
  if (!context) {
    throw new Error("useKakao must be used within a KakaoProvider");
  }
  return context;
};

export default function KakaoProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoad, setLoad] = useState(false);

  const initializeKakao = useCallback(() => {
    if (window.Kakao) {
      window.Kakao.init(clientEnv.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      if (window.Kakao.isInitialized()) {
        console.log("Kakao SDK initialized");
        setLoad(true);
      }
    }
  }, []);

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={initializeKakao}
      ></Script>
      <kakaoContext.Provider
        value={
          isLoad && window.Kakao
            ? {
                kakao: window.Kakao,
                isLoaded: true,
              }
            : {
                kakao: null,
                isLoaded: false,
              }
        }
      >
        {children}
      </kakaoContext.Provider>
    </>
  );
}
