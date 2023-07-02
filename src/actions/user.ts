"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
interface UpdateUserInterface {
  id: number;
  name?: string;
  email?: string;
  currentLocation?: string;
}
export const updateUser = async (user: UpdateUserInterface) => {
  const [updatedUser] = await db
    .update(users)
    .set({ ...user })
    .where(eq(users.id, user.id!))
    .returning();

  revalidatePath("/");
  return { user: updatedUser };
};
