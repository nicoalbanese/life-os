"use server";

import { db } from "@/lib/db";
import { completions, streaks } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addCompletion = async ({ habitId }: { habitId: number }) => {
  const newCompletion = await db.insert(completions).values({ habitId });
  const [streak] = await db
    .select()
    .from(streaks)
    .where(
      and(
        eq(streaks.habitId, habitId),
        eq(streaks.lastDay, sql`CURRENT_DATE - interval '1 day'`)
      )
    );
  if (streak) {
    await db
      .update(streaks)
      .set({ lastDay: sql`CURRENT_DATE` })
      .where(eq(streaks.id, streak.id));
  } else {
    await db.insert(streaks).values({ habitId: habitId });
  }
  revalidatePath("/habits");
  return newCompletion;
};
