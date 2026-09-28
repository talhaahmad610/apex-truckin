import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "rate_disclaimer" SET DEFAULT 'Rates vary by state, lane, equipment, load type, market conditions, deadhead and negotiated rate, and are not guaranteed.';
  ALTER TABLE "site_settings" ALTER COLUMN "gross_disclaimer" SET DEFAULT 'Weekly gross is an estimate based on about 2,500–3,000 miles per week, before fuel, dispatch fees, insurance and other operating costs. It is not a guarantee of earnings — actual revenue varies by market, lanes, load availability, equipment and negotiated rates.';
  ALTER TABLE "site_settings" ADD COLUMN "open24x7" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "head_html" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "body_end_html" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "extra_allowed_domains" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "google_site_verification" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "bing_site_verification" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "rate_disclaimer" SET DEFAULT 'Rates vary by state, lane, equipment, load type, market conditions, deadhead and negotiated rate.';
  ALTER TABLE "site_settings" ALTER COLUMN "gross_disclaimer" SET DEFAULT 'Weekly gross is an estimate based on about 2,500–3,000 miles per week. Actual revenue varies by market, lanes, load availability, equipment and negotiated rates.';
  ALTER TABLE "site_settings" DROP COLUMN "open24x7";
  ALTER TABLE "site_settings" DROP COLUMN "head_html";
  ALTER TABLE "site_settings" DROP COLUMN "body_end_html";
  ALTER TABLE "site_settings" DROP COLUMN "extra_allowed_domains";
  ALTER TABLE "site_settings" DROP COLUMN "google_site_verification";
  ALTER TABLE "site_settings" DROP COLUMN "bing_site_verification";`)
}
