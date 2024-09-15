import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function GET(request: Request) {
  const url = new URL(request.url);
  const requestState = url.searchParams.get("state");
  const clientCallbackUrl = cookies().get("callback_url")?.value || "/";
  const clientState = cookies().get("state")?.value || "";
  console.log(`Check state - request: ${requestState}, client: ${clientState}`);
  if (clientCallbackUrl) {
    cookies().delete("callback_url");
  }

  if (clientState) {
    cookies().delete("state");
  }

  if (requestState !== clientState) {
    return redirect("/");
  }

  return redirect(clientCallbackUrl);
}
