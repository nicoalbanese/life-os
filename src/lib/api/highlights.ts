import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { highlights } from "../db/schema";
import { getSession } from "../auth/utils";

export async function getHighlight() {
  const { session } = await getSession();
  const [highlight] = await db
    .select()
    .from(highlights)
    .where(
      and(
        eq(highlights.userId, session?.user.id!),
        eq(highlights.date, sql`CURRENT_DATE`)
      )
    );
  if (highlight === undefined) {
    return { highlight: null };
  }
  return { highlight };
}
