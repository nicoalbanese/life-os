ALTER TABLE "completions" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "completions" ADD COLUMN "time" timestamp DEFAULT now() NOT NULL;