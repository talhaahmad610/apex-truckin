import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_flight_sources_grade" AS ENUM('standard', 'darker');
  CREATE TYPE "public"."enum_flight_sources_status" AS ENUM('queued', 'processing', 'ready', 'failed');
  ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'processFlightLeg' BEFORE 'schedulePublish';
  ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'processFlightLeg' BEFORE 'schedulePublish';
  CREATE TABLE "flight_sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"trim_start" numeric DEFAULT 0,
  	"max_seconds" numeric DEFAULT 8,
  	"grade" "enum_flight_sources_grade" DEFAULT 'standard',
  	"reprocess" boolean,
  	"status" "enum_flight_sources_status" DEFAULT 'queued',
  	"error" varchar,
  	"source_duration" numeric,
  	"source_width" numeric,
  	"source_height" numeric,
  	"output_desktop" varchar,
  	"output_mobile" varchar,
  	"output_poster" varchar,
  	"output_poster_mobile" varchar,
  	"output_duration" numeric,
  	"output_hash" varchar,
  	"prefix" varchar DEFAULT 'raw',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
  
  ALTER TABLE "pricing_tiers" ADD COLUMN "cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "flight_sources_id" integer;
  ALTER TABLE "home_page_rels" ADD COLUMN "flight_sources_id" integer;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "flight_sources_id" integer;
  CREATE INDEX "flight_sources_updated_at_idx" ON "flight_sources" USING btree ("updated_at");
  CREATE INDEX "flight_sources_created_at_idx" ON "flight_sources" USING btree ("created_at");
  CREATE UNIQUE INDEX "flight_sources_filename_idx" ON "flight_sources" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_flight_sources_fk" FOREIGN KEY ("flight_sources_id") REFERENCES "public"."flight_sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_flight_sources_fk" FOREIGN KEY ("flight_sources_id") REFERENCES "public"."flight_sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_flight_sources_fk" FOREIGN KEY ("flight_sources_id") REFERENCES "public"."flight_sources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_flight_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("flight_sources_id");
  CREATE INDEX "home_page_rels_flight_sources_id_idx" ON "home_page_rels" USING btree ("flight_sources_id");
  CREATE INDEX "_home_page_v_rels_flight_sources_id_idx" ON "_home_page_v_rels" USING btree ("flight_sources_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "flight_sources" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "flight_sources" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_flight_sources_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_flight_sources_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_flight_sources_fk";
  
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_log_task_slug" USING "task_slug"::"public"."enum_payload_jobs_log_task_slug";
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_task_slug" USING "task_slug"::"public"."enum_payload_jobs_task_slug";
  DROP INDEX "payload_locked_documents_rels_flight_sources_id_idx";
  DROP INDEX "home_page_rels_flight_sources_id_idx";
  DROP INDEX "_home_page_v_rels_flight_sources_id_idx";
  ALTER TABLE "pricing_tiers" DROP COLUMN "cta_href";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "flight_sources_id";
  ALTER TABLE "home_page_rels" DROP COLUMN "flight_sources_id";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "flight_sources_id";
  DROP TYPE "public"."enum_flight_sources_grade";
  DROP TYPE "public"."enum_flight_sources_status";`)
}
