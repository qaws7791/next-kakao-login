import LogoutButton from "@/app/account/logout-button";
import { getUser } from "@/server/lib/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold my-16">Welcome, {user.name}</h1>
      <p className="text-2xl font-medium my-4">KaKao ID: {user.kakaoId}</p>

      <div className="flex flex-col gap-4">
        {user.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photo}
            alt={user.name}
            width={256}
            height={256}
            className="rounded-2xl"
          />
        )}
        <LogoutButton />
      </div>
    </div>
  );
}
