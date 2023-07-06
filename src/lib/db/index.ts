import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const localClient = postgres(process.env.DATABASE_URL!, {
  idle_timeout: 0, // Idle connection timeout in seconds
});

const productionClient = postgres({
  ssl: "require",
  idle_timeout: 1000,
  max: 10,
});
let client: postgres.Sql<{}> | null;
process.env.NODE_ENV == "production"
  ? (client = productionClient)
  : (client = localClient);

export const db = drizzle(client);
