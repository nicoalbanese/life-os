import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { habits as HABITS, completions, streaks } from "../db/schema";
import { getSession } from "../auth/utils";

export const getHabitsWithCompletions = async () => {
  const { session } = await getSession();
  const habits = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!), eq(HABITS.active, true)))
    .leftJoin(
      completions,
      and(
        eq(HABITS.id, completions.habitId),
        eq(completions.date, sql`CURRENT_DATE`)
      )
    )
    .leftJoin(
      streaks,
      and(
        eq(HABITS.id, streaks.habitId),
        eq(streaks.lastDay, sql`CURRENT_DATE - interval '1 day'`)
      )
    )

    .orderBy(HABITS.id);
  return habits;
};

export const getHabits = async () => {
  const { session } = await getSession();
  const habits = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!)))
    .orderBy(HABITS.id);

  return habits;
};

export const getStreaks = async () => {
  const { session } = await getSession();
  const habits = await db
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
  return habits;
};
