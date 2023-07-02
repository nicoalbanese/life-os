CREATE TABLE IF NOT EXISTS "completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"habit_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"habit" boolean DEFAULT true,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "completions" ADD CONSTRAINT "completions_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
