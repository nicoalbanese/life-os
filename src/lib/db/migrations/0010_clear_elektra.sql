ALTER TABLE "streaks" ALTER COLUMN "last_day" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "streaks" ALTER COLUMN "last_day" SET NOT NULL;