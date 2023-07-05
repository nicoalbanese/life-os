import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { habits as HABITS, streaks } from "../db/schema";
import { getSession } from "../auth/utils";

export const getTopStreaks = async () => {
  const { session } = await getSession();
  const habitsWithStreaks = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!), eq(HABITS.active, true)))
    .leftJoin(streaks, and(eq(HABITS.id, streaks.habitId)))
    .orderBy(HABITS.id);
  const topStreaks = habitsWithStreaks.filter(
    (habits) => habits.streaks !== null
  );
  return topStreaks;
};
