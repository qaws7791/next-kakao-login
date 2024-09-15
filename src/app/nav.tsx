import LoginButton from "@/app/login-button";
import LogoutButton from "@/app/logout-button";
import { getUser } from "@/server/lib/user";

export default async function Nav() {
  const user = await getUser();

  return (
    <nav className="w-full border-b border-neutral-600 flex justify-between items-center px-4 py-2">
      <h1 className="text-xl font-semibold">Nextjs Kakao Login</h1>
      {user ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}
