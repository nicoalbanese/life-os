"use server";

import { getSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { DBDate, dates } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createDate = async () => {
  const { session } = await getSession();
  const [date] = await db.insert(dates).values({
    date: sql`CURRENT_DATE`,
    title: "New Date",
    type: "days_until",
    userId: session?.user.id!,
  });
  revalidatePath("/dates/edit");
  return { date };
};

interface DateType {
  title: string;
  date: string;
  type: "days_until" | "days_since";
  id: number;
}
export const updateDate = async ({ date }: { date: DateType }) => {
  const { session } = await getSession();
  const [updatedDate] = await db
    .update(dates)
    .set(date)
    .where(and(eq(dates.id, date.id), eq(dates.userId, session?.user.id!)))
    .returning();
  revalidatePath("/dates/edit");
  return { date: updatedDate };
};

export const deleteDate = async ({ dateId }: { dateId: number }) => {
  const { session } = await getSession();
  await db
    .delete(dates)
    .where(and(eq(dates.id, dateId), eq(dates.userId, session?.user.id!)));
  revalidatePath("/dates/edit");
};
