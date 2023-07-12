ALTER TABLE "quotes" ALTER COLUMN "quote" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "quote" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quotes" ADD COLUMN "author" varchar;