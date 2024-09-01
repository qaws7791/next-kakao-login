"use client";
import clientEnv from "@/client/lib/env";
import Script from "next/script";
import { createContext, useContext, useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

type kakaoLoginContext = {
  kakao: any;
};

const kakaoContext = createContext<kakaoLoginContext | undefined>({
  kakao: null,
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
  return (
    <kakaoContext.Provider value={{ kakao: isLoad ? window.Kakao : null }}>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        onLoad={() => {
          window.Kakao.init(clientEnv.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
          if (window.Kakao.isInitialized()) {
            console.log("Kakao SDK initialized");
            setLoad(true);
          }
        }}
      ></Script>
      {children}
    </kakaoContext.Provider>
  );
}
