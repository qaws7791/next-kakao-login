import LogoutButton from "@/app/logout-button";
import { getUser } from "@/server/lib/user";

export default async function Home() {
  const user = await getUser();

  if (!user)
    return (
      <main className="flex flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold my-16">
          Nextjs OAuth with Kakao Login
        </h1>
      </main>
    );

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
