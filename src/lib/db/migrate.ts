import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// inspired by Raphael Moreau @rphlmr for Postgres, extended for Planetscale
const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const localClient = postgres(process.env.DATABASE_URL!);

  const productionClient = postgres({ ssl: "require", max: 1 });
  let client: postgres.Sql<{}> | null;
  process.env.NODE_ENV == "production"
    ? (client = productionClient)
    : (client = localClient);

  const db = drizzle(client);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "src/lib/db/migrations" });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
