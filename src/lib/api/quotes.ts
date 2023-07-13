import { eq, sql } from "drizzle-orm";
import { getSession } from "../auth/utils";
import { db } from "../db";
import { quotes as Quotes } from "../db/schema";
import { revalidatePath } from "next/cache";

export const getQuotes = async () => {
  const { session } = await getSession();
  const quotes = await db
    .select()
    .from(Quotes)
    .where(eq(Quotes.userId, session?.user.id!));
  return { quotes };
};

export const getRandomQuote = async () => {
  const { session } = await getSession();
  const [quote] = await db
    .select()
    .from(Quotes)
    .where(eq(Quotes.userId, session?.user.id!))
    .orderBy(sql`RANDOM()`)
    .limit(1);
  return { quote };
};
