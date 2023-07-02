"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { completions } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const getSession = async () => {
  return getServerSession(authOptions);
};

export const addCompletion = async ({ habitId }: { habitId: number }) => {
  const newCompletion = await db.insert(completions).values({ habitId });
  revalidatePath("/habits");
  return newCompletion;
};
