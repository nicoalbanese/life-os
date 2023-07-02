import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { habits as HABITS, completions } from "../db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getSession = async () => {
  return getServerSession(authOptions);
};
export const getHabitsWithCompletions = async () => {
  const session = await getSession();
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
    );
  return habits;
};

export const getHabits = async () => {
  const session = await getSession();
  const habits = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!)));
  return habits;
};
