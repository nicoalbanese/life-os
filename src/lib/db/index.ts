// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);

// const localClient = postgres(process.env.DATABASE_URL!, {
//   idle_timeout: 0, // Idle connection timeout in seconds
// });

// const productionClient = postgres({
//   ssl: "require",
//   idle_timeout: 1000,
//   max: 10,
// });
// let client: postgres.Sql<{}> | null;
// process.env.NODE_ENV == "production"
//   ? (client = productionClient)
//   : (client = localClient);
//
// export const db = drizzle(client);
