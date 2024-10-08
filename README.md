# nextjs with kakao login

## Stack

- Language: <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
- Authentication: <img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink">, KAKAO Login
- Deploy and Database: <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- Frontend and Server: <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
- Validation: <img src="https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
- ORM: <img src="https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=000&style=for-the-badge" alt="Drizzle Badge">



## Description

카카오 로그인을 이용한 간단한 로그인 기능을 구현하는 예제입니다.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Diagram

- 카카오 로그인(https://kauth.kakao.com/oauth/authorize)으로 이동 전:   previous page url, state 값 저장
- 로그인 성공 경로(/signin/success)에서 state 값 파싱 후 저장 해둔 값과 일치하면 previous page url을 꺼내서 리디렉션

```mermaid
sequenceDiagram
    participant Client as User Client
    participant Server as Service Server
    participant KaKao as KaKao Server
    Client->>Client: generate state and save state·previous page url
    Note over Client,KaKao: KaKao Login
    Client->>KaKao: Click kakao login button(move to https://kauth.kakao.com/oauth/authorize)
    KaKao-->>Client: Show authentication, authorization screen
    Client->>KaKao: User completes consent
    KaKao-->>Server: Redirect to RedirectURI(/oauth/kakao/callback)
    Server->>KaKao: Request Token
    KaKao-->>Server: Token
    Note over Client,KaKao: Verify and enroll members
    Server->>KaKao: Fetch user info from https://kapi.kakao.com/v2/user/me
    KaKao-->>Server: User info
    alt If a new user
        Server->>Server: Register a user
    end
    Note over Client,KaKao: Service login
    Server->>Client: Create a service session and redirect to login success page
    alt state is vaild
    Client->>Client: Create a service session and redirect to [previous page]
    else state is invaild
    Client->>Client: Invalidate a service session and redirect to [service root page]
    end
```



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



