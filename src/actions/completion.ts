"use server";

import { db } from "@/lib/db";
import { completions } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export const addCompletion = async ({ habitId }: { habitId: number }) => {
  const newCompletion = await db.insert(completions).values({ habitId });
  revalidatePath("/habits");
  return newCompletion;
};
