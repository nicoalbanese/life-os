import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// const client = postgres(process.env.DATABASE_URL!);

const client = postgres({ ssl: "require" });

export const db = drizzle(client);
