"use server";

import { getSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { quotes } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export const createQuote = async ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => {
  const { session } = await getSession();
  await db.insert(quotes).values({ quote, author, userId: session?.user.id! });
  revalidatePath("/quotes/edit");
};
