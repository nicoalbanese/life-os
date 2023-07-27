import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { habits as HABITS, habits, streaks } from "../db/schema";
import { getSession } from "../auth/utils";
export type TopStreak = {
  name: string;
  streak_length: number;
  first_day: string;
  last_day: string;
};

export const getTopStreaks = async () => {
  const { session } = await getSession();
  // const subquery = db
  //   .select({
  //     habitId: streaks.habitId,
  //     mostRecent: sql`MAX(${streaks.lastDay})`,
  //   })
  //   .from(streaks)
  //   .leftJoin(HABITS, eq(streaks.habitId, HABITS.id))
  //   .groupBy(streaks.habitId);
  // console.log(subquery);
  const habitsWithStreaks = await db
    .select()
    .from(HABITS)
    .where(and(eq(HABITS.userId, session?.user.id!), eq(HABITS.active, true)))
    .innerJoin(streaks, and(eq(HABITS.id, streaks.habitId)))
    .orderBy(HABITS.id);

  const { rows: longestStreaks } = await db.execute(sql<TopStreak[]>`
SELECT h.name as name, s2.max_streak_length as streak_length, s1.first_day as first_day, s1.last_day as last_day
FROM streaks s1
JOIN (
    SELECT habit_id, MAX(last_day::date - first_day::date + 1) AS max_streak_length
    FROM streaks
    GROUP BY habit_id
) s2 ON s1.habit_id = s2.habit_id AND (s1.last_day::date - s1.first_day::date + 1) = s2.max_streak_length
LEFT JOIN streaks s3 ON s1.habit_id = s3.habit_id AND (s1.last_day::date - s1.first_day::date + 1) = (s3.last_day::date - s3.first_day::date + 1) AND s1.last_day < s3.last_day
JOIN habits h ON s1.habit_id = h.id
WHERE s3.id IS NULL;

`);

  // console.log(longestStreaks);
  // const { rows } = await db.execute(
  //   sql`SELECT first_day::date, last_day::date, last_day::date - first_day::date + 1 as difference FROM streaks order by difference desc LIMIT 10;`
  // );
  // console.log(rows);

  // const topStreaks = habitsWithStreaks.filter(
  //   (habits) => habits.streaks !== null
  // );
  return longestStreaks as TopStreak[];
};
