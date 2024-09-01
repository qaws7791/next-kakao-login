import KakaoLoginButton from "@/app/kakao-login-button";
import { getUser } from "@/server/lib/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if (user) {
    return redirect("/account");
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold my-16">
        Nextjs OAuth with Kakao Login
      </h1>
      <KakaoLoginButton />
    </main>
  );
}
