import { eq } from "drizzle-orm";
import { db } from "../db";
import { highlights } from "../db/schema";
import { getSession } from "../auth/utils";

export async function getHighlight() {
  const { session } = await getSession();
  const [highlight] = await db
    .select()
    .from(highlights)
    .where(eq(highlights.userId, session?.user.id!));
  if (highlight === undefined) {
    return { highlight: null };
  }
  return { highlight };
}
