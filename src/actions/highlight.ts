"use server";

import { getSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { highlights } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createHighlight({ content }: { content: string }) {
  const { session } = await getSession();
  const [highlight] = await db
    .insert(highlights)
    .values({ userId: session?.user.id!, content })
    .returning();
  revalidatePath("/goals");
  return { highlight };
}

export async function completeHighlight({
  highlightId,
}: {
  highlightId: number;
}) {
  const { session } = await getSession();
  const [highlight] = await db
    .update(highlights)
    .set({ completed: true })
    .where(
      and(
        eq(highlights.userId, session?.user.id!),
        eq(highlights.id, highlightId)
      )
    )
    .returning();
  revalidatePath("/goals");
  return { highlight };
}
