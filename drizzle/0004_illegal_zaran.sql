ALTER TABLE "investment" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "investment" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "investment" ADD COLUMN "userId" text;