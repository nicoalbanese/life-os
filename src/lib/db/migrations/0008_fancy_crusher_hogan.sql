CREATE TABLE IF NOT EXISTS "highlights" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "highlights" ADD CONSTRAINT "highlights_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
