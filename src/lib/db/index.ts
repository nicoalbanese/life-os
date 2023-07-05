import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const localClient = postgres(process.env.DATABASE_URL!);

const productionClient = postgres({ ssl: "require", max: 1 });
let client: postgres.Sql<{}> | null;
process.env.NODE_ENV == "production"
  ? (client = productionClient)
  : (client = localClient);

export const db = drizzle(client);
