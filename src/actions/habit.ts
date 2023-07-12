"use server";

import { getSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { habits } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// TODO: move db logic to api folder

export const addHabit = async ({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) => {
  const { session } = await getSession();
  const [newHabit] = await db
    .insert(habits)
    .values({ name, description: desc, userId: session?.user.id! })
    .returning();
  return { habit: newHabit };
};
interface UpdatedHabit {
  name: string;
  id: number;
  description: string;
  active: boolean;
}
export const editHabit = async ({
  updatedHabit,
}: {
  updatedHabit: UpdatedHabit;
}) => {
  const { session } = await getSession();
  const [newHabit] = await db
    .update(habits)
    .set(updatedHabit)
    .where(
      and(eq(habits.id, updatedHabit.id), eq(habits.userId, session?.user.id!))
    )
    .returning();
  revalidatePath("/habits/edit");
  revalidatePath("/habits");
  return { habit: newHabit };
};

export const deleteHabit = async ({ id }: { id: number }) => {
  const { session } = await getSession();
  await db
    .delete(habits)
    .where(and(eq(habits.id, id), eq(habits.userId, session?.user.id!)));
  revalidatePath("/habits/edit");
};
