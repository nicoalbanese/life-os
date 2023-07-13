import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: `${process.env.DRIZZLE_DATABASE_URL!}?sslmode=require`,
    ssl: true,
  },
  // breakpoints: true,
} satisfies Config;
