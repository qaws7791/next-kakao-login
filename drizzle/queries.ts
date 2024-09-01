import { eq } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, users } from "./schemas";

export async function insertUser(data: InsertUser) {
  const result = await db.insert(users).values(data).returning();
  return result.length > 0 ? result[0] : null;
}
export async function selectUserByKakaoId(kakaoId: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.kakaoId, kakaoId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function selectUser(userId: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateUser(userId: number, data: Partial<InsertUser>) {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
    .returning();

  return result.length > 0 ? result[0] : null;
}
