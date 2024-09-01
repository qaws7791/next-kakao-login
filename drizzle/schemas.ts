import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { bigint, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  kakaoId: bigint("kakao_id", { mode: "number" }).unique(),
  name: text("name").notNull(),
  photo: text("photo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertUser = InferInsertModel<typeof users>;
export type SelectUser = InferSelectModel<typeof users>;
