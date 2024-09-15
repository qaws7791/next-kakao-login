import { generateState } from "@/server/lib/utils";
import { cookies } from "next/headers";

export function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = decodeURIComponent(
    url.searchParams.get("redirect_url") || "/"
  );

  const randomState = generateState();
  const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${randomState}`;

  cookies().set("callback_url", redirectUrl, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  cookies().set("state", randomState, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login</title>
        <style>
          html {
            height: 100%;
          }
          body {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid #dddddd;
            padding: 1.5rem;
            border-radius: 0.75rem;
          }
        </style>
        </head>
        <body>
        <div class="container">
        
        <h1>Login</h1>
        <p>Click the button below to login with Kakao.</p>
        <a href=${loginUrl}>
        <img
         src="/kakao_login.png"
          alt="kakao login"
          width="300"
          height="45"
        />
        </a>
        </div>
        </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html",
      },
    }
  );
}
