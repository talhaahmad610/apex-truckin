import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "weekly_gross" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "rate_disclaimer" varchar DEFAULT 'Rates vary by state, lane, equipment, load type, market conditions, deadhead and negotiated rate.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "gross_disclaimer" varchar DEFAULT 'Weekly gross is an estimate based on about 2,500–3,000 miles per week. Actual revenue varies by market, lanes, load availability, equipment and negotiated rates.' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DROP COLUMN "weekly_gross";
  ALTER TABLE "site_settings" DROP COLUMN "rate_disclaimer";
  ALTER TABLE "site_settings" DROP COLUMN "gross_disclaimer";`)
}
