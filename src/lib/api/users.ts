import { eq } from "drizzle-orm";
import { getSession } from "../auth/utils";
import { db } from "../db";
import { users } from "../db/schema";

export const getUser = async () => {
  const { session } = await getSession();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id!));
  return { user };
};
