import { eq } from "drizzle-orm";
import { getSession } from "../auth/utils";
import { db } from "../db";
import { quotes as Quotes } from "../db/schema";

export const getQuotes = async () => {
  const { session } = await getSession();
  const quotes = await db
    .select()
    .from(Quotes)
    .where(eq(Quotes.userId, session?.user.id!));
  return { quotes };
};
