import { eq } from "drizzle-orm";
import { getSession } from "../auth/utils";
import { db } from "../db";
import { dates as Dates } from "../db/schema";

export const getDates = async () => {
  const { session } = await getSession();
  const dates = await db
    .select()
    .from(Dates)
    .where(eq(Dates.userId, session?.user.id!));
  return { dates };
};
