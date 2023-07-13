"use server";

import { revalidatePath } from "next/cache";

export const refreshQuote = async () => {
  revalidatePath("/");
};
