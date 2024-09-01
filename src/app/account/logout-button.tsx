"use client";
import clientEnv from "@/client/lib/env";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    const logoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientEnv.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=${clientEnv.NEXT_PUBLIC_KAKAO_LOGOUT_URI}`;
    router.push(logoutUrl);
  };
  return (
    <button
      onClick={handleLogout}
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all w-full"
    >
      Logout
    </button>
  );
}
