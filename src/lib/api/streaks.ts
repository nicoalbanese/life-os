import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { habits as HABITS, streaks } from "../db/schema";
import { getSession } from "../auth/utils";

export const getActiveStreaks = async () => {
  const { session } = await getSession();
  const habitsWithStreaks = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!), eq(HABITS.active, true)))
    .leftJoin(
      streaks,
      and(
        eq(HABITS.id, streaks.habitId),
        eq(streaks.lastDay, sql`CURRENT_DATE - interval '1 day'`)
      )
    )
    .orderBy(HABITS.id);
  const activeStreaks = habitsWithStreaks.filter(
    (habits) => habits.streaks !== null
  );
  return activeStreaks;
};
