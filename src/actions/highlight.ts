"use server";

import { getSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { highlights } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createHighlight({ content }: { content: string }) {
  const { session } = await getSession();
  const [highlight] = await db
    .insert(highlights)
    .values({ userId: session?.user.id!, content });
  revalidatePath("/goals");
  return { highlight };
}
