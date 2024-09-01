import { verifySession } from "@/server/lib/session";
import { cache } from "react";
import "server-only";
import { selectUser } from "../../../drizzle/queries";

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await selectUser(session.userId);

    return data;
  } catch (error) {
    return null;
  }
});
