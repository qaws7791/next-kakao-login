import { deleteSession } from "@/server/lib/session";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  deleteSession();

  redirect("/");
}
