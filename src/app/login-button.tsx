"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleGoToLogin = () => {
    const redirectUrl = encodeURIComponent(pathname + searchParams.toString());
    router.push(`/auth/signin?redirect_url=${redirectUrl}`);
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGoToLogin}
    >
      Login
    </button>
  );
}
