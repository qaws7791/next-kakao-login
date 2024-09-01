import { z } from "zod";

const serverEnvSchema = z.object({
  KAKAO_CLIENT_SECRET: z.string(),
});

const serverEnv = serverEnvSchema.parse({
  KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
});

export default serverEnv;
