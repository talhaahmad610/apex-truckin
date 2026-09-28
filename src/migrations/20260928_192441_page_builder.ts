import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_page_hero_size" AS ENUM('default', 'short', 'legal');
  CREATE TYPE "public"."enum_pages_blocks_stats_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_full_service_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_full_service_style" AS ENUM('split', 'cards', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_steps_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_steps_style" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_services_tabs_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_services_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_pricing_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_pricing_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_faq_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_faq_source" AS ENUM('group', 'picked');
  CREATE TYPE "public"."enum_pages_blocks_faq_group" AS ENUM('general', 'pricing', 'service');
  CREATE TYPE "public"."enum_pages_blocks_blog_preview_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_contact_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_contact_style" AS ENUM('section', 'page');
  CREATE TYPE "public"."enum_pages_blocks_team_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_timeline_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_values_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_requirements_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('820', '1100');
  CREATE TYPE "public"."enum_pages_blocks_image_text_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_change_frequency" AS ENUM('weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_size" AS ENUM('default', 'short', 'legal');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_full_service_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_full_service_style" AS ENUM('split', 'cards', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_style" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_services_tabs_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_services_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_source" AS ENUM('group', 'picked');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_group" AS ENUM('general', 'pricing', 'service');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_preview_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_style" AS ENUM('section', 'page');
  CREATE TYPE "public"."enum__pages_v_blocks_team_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_values_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_requirements_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('820', '1100');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_change_frequency" AS ENUM('weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_content_steps_icon" AS ENUM('phone-call', 'search', 'handshake', 'truck', 'file-check', 'map-pinned', 'dollar-sign', 'clipboard-check', 'clock-3', 'route', 'network', 'shield-check');
  CREATE TYPE "public"."enum_home_page_blocks_flight_hero_beats_chips_icon" AS ENUM('phone-call', 'search', 'handshake', 'truck', 'file-check', 'map-pinned', 'dollar-sign', 'clipboard-check', 'clock-3', 'route', 'network', 'shield-check');
  CREATE TYPE "public"."enum_home_page_blocks_flight_hero_beats_ctas_variant" AS ENUM('primary', 'ghost');
  CREATE TYPE "public"."enum_home_page_blocks_how_it_works_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_coverage_map_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_page_hero_size" AS ENUM('default', 'short', 'legal');
  CREATE TYPE "public"."enum_home_page_blocks_stats_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_full_service_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_full_service_style" AS ENUM('split', 'cards', 'compact');
  CREATE TYPE "public"."enum_home_page_blocks_steps_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_steps_style" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_home_page_blocks_services_tabs_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_services_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_pricing_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_pricing_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_testimonials_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_faq_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_faq_source" AS ENUM('group', 'picked');
  CREATE TYPE "public"."enum_home_page_blocks_faq_group" AS ENUM('general', 'pricing', 'service');
  CREATE TYPE "public"."enum_home_page_blocks_blog_preview_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_contact_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_contact_style" AS ENUM('section', 'page');
  CREATE TYPE "public"."enum_home_page_blocks_team_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_timeline_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_values_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_requirements_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_rich_text_width" AS ENUM('820', '1100');
  CREATE TYPE "public"."enum_home_page_blocks_image_text_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum_home_page_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_blocks_flight_hero_beats_chips_icon" AS ENUM('phone-call', 'search', 'handshake', 'truck', 'file-check', 'map-pinned', 'dollar-sign', 'clipboard-check', 'clock-3', 'route', 'network', 'shield-check');
  CREATE TYPE "public"."enum__home_page_v_blocks_flight_hero_beats_ctas_variant" AS ENUM('primary', 'ghost');
  CREATE TYPE "public"."enum__home_page_v_blocks_how_it_works_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_coverage_map_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_page_hero_size" AS ENUM('default', 'short', 'legal');
  CREATE TYPE "public"."enum__home_page_v_blocks_stats_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_full_service_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_full_service_style" AS ENUM('split', 'cards', 'compact');
  CREATE TYPE "public"."enum__home_page_v_blocks_steps_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_steps_style" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__home_page_v_blocks_services_tabs_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_services_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_pricing_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_pricing_compare_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_testimonials_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_faq_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_faq_source" AS ENUM('group', 'picked');
  CREATE TYPE "public"."enum__home_page_v_blocks_faq_group" AS ENUM('general', 'pricing', 'service');
  CREATE TYPE "public"."enum__home_page_v_blocks_blog_preview_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_contact_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_contact_style" AS ENUM('section', 'page');
  CREATE TYPE "public"."enum__home_page_v_blocks_team_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_timeline_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_values_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_requirements_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_rich_text_width" AS ENUM('820', '1100');
  CREATE TYPE "public"."enum__home_page_v_blocks_image_text_numbering" AS ENUM('counter', 'dash', 'none');
  CREATE TYPE "public"."enum__home_page_v_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"size" "enum_pages_blocks_page_hero_size" DEFAULT 'default',
  	"updated" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"reverse" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'By the numbers',
  	"numbering" "enum_pages_blocks_stats_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_full_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Full-service dispatch',
  	"numbering" "enum_pages_blocks_full_service_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"style" "enum_pages_blocks_full_service_style" DEFAULT 'split',
  	"show_stats" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'How dispatch works',
  	"numbering" "enum_pages_blocks_steps_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"style" "enum_pages_blocks_steps_style" DEFAULT 'list',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'What we do',
  	"numbering" "enum_pages_blocks_services_tabs_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare',
  	"numbering" "enum_pages_blocks_services_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"emit_collection_ld" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Pricing',
  	"numbering" "enum_pages_blocks_pricing_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare plans',
  	"numbering" "enum_pages_blocks_pricing_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Carrier voice',
  	"numbering" "enum_pages_blocks_testimonials_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'FAQ',
  	"numbering" "enum_pages_blocks_faq_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"source" "enum_pages_blocks_faq_source" DEFAULT 'group',
  	"group" "enum_pages_blocks_faq_group" DEFAULT 'general',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Insights',
  	"numbering" "enum_pages_blocks_blog_preview_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"truck" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Contact',
  	"numbering" "enum_pages_blocks_contact_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Start dispatching',
  	"status_line" varchar,
  	"reply_note" varchar,
  	"style" "enum_pages_blocks_contact_style" DEFAULT 'section',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The team',
  	"numbering" "enum_pages_blocks_team_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Our story',
  	"numbering" "enum_pages_blocks_timeline_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Mission & values',
  	"numbering" "enum_pages_blocks_values_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Requirements',
  	"numbering" "enum_pages_blocks_requirements_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"content" jsonb,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT '820',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT '',
  	"numbering" "enum_pages_blocks_image_text_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"image_side" "enum_pages_blocks_image_text_image_side" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"show_in_sitemap" boolean DEFAULT true,
  	"change_frequency" "enum_pages_change_frequency" DEFAULT 'monthly',
  	"sitemap_priority" numeric DEFAULT 0.7,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"size" "enum__pages_v_blocks_page_hero_size" DEFAULT 'default',
  	"updated" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"reverse" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'By the numbers',
  	"numbering" "enum__pages_v_blocks_stats_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Full-service dispatch',
  	"numbering" "enum__pages_v_blocks_full_service_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"style" "enum__pages_v_blocks_full_service_style" DEFAULT 'split',
  	"show_stats" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'How dispatch works',
  	"numbering" "enum__pages_v_blocks_steps_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"style" "enum__pages_v_blocks_steps_style" DEFAULT 'list',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'What we do',
  	"numbering" "enum__pages_v_blocks_services_tabs_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare',
  	"numbering" "enum__pages_v_blocks_services_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"emit_collection_ld" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Pricing',
  	"numbering" "enum__pages_v_blocks_pricing_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare plans',
  	"numbering" "enum__pages_v_blocks_pricing_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Carrier voice',
  	"numbering" "enum__pages_v_blocks_testimonials_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'FAQ',
  	"numbering" "enum__pages_v_blocks_faq_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"source" "enum__pages_v_blocks_faq_source" DEFAULT 'group',
  	"group" "enum__pages_v_blocks_faq_group" DEFAULT 'general',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Insights',
  	"numbering" "enum__pages_v_blocks_blog_preview_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"truck" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Contact',
  	"numbering" "enum__pages_v_blocks_contact_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Start dispatching',
  	"status_line" varchar,
  	"reply_note" varchar,
  	"style" "enum__pages_v_blocks_contact_style" DEFAULT 'section',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The team',
  	"numbering" "enum__pages_v_blocks_team_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Our story',
  	"numbering" "enum__pages_v_blocks_timeline_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Mission & values',
  	"numbering" "enum__pages_v_blocks_values_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Requirements',
  	"numbering" "enum__pages_v_blocks_requirements_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"content" jsonb,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT '820',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT '',
  	"numbering" "enum__pages_v_blocks_image_text_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"image_side" "enum__pages_v_blocks_image_text_image_side" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_show_in_sitemap" boolean DEFAULT true,
  	"version_change_frequency" "enum__pages_v_version_change_frequency" DEFAULT 'monthly',
  	"version_sitemap_priority" numeric DEFAULT 0.7,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "site_content_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"decimals" numeric DEFAULT 0,
  	"suffix" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_full_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_site_content_steps_icon",
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_carrier_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_pricing_comparison_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tier_id" integer NOT NULL,
  	"included" boolean DEFAULT true,
  	"text" varchar
  );
  
  CREATE TABLE "site_content_pricing_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_blocks_flight_hero_beats_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_blocks_flight_hero_beats_chips_icon",
  	"text" varchar
  );
  
  CREATE TABLE "home_page_blocks_flight_hero_beats_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_home_page_blocks_flight_hero_beats_ctas_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "home_page_blocks_flight_hero_beats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rail_label" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subheading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "home_page_blocks_flight_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The process',
  	"numbering" "enum_home_page_blocks_how_it_works_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_coverage_map_regions_states" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_blocks_coverage_map_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "home_page_blocks_coverage_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Local broker network',
  	"numbering" "enum_home_page_blocks_coverage_map_numbering" DEFAULT 'dash',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"size" "enum_home_page_blocks_page_hero_size" DEFAULT 'default',
  	"updated" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"reverse" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'By the numbers',
  	"numbering" "enum_home_page_blocks_stats_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_full_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Full-service dispatch',
  	"numbering" "enum_home_page_blocks_full_service_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"style" "enum_home_page_blocks_full_service_style" DEFAULT 'split',
  	"show_stats" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'How dispatch works',
  	"numbering" "enum_home_page_blocks_steps_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"style" "enum_home_page_blocks_steps_style" DEFAULT 'list',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_services_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'What we do',
  	"numbering" "enum_home_page_blocks_services_tabs_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_services_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare',
  	"numbering" "enum_home_page_blocks_services_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"emit_collection_ld" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Pricing',
  	"numbering" "enum_home_page_blocks_pricing_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_pricing_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare plans',
  	"numbering" "enum_home_page_blocks_pricing_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Carrier voice',
  	"numbering" "enum_home_page_blocks_testimonials_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'FAQ',
  	"numbering" "enum_home_page_blocks_faq_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"source" "enum_home_page_blocks_faq_source" DEFAULT 'group',
  	"group" "enum_home_page_blocks_faq_group" DEFAULT 'general',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_blog_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Insights',
  	"numbering" "enum_home_page_blocks_blog_preview_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"truck" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Contact',
  	"numbering" "enum_home_page_blocks_contact_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Start dispatching',
  	"status_line" varchar,
  	"reply_note" varchar,
  	"style" "enum_home_page_blocks_contact_style" DEFAULT 'section',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The team',
  	"numbering" "enum_home_page_blocks_team_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_timeline_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "home_page_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Our story',
  	"numbering" "enum_home_page_blocks_timeline_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_values_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "home_page_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Mission & values',
  	"numbering" "enum_home_page_blocks_values_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Requirements',
  	"numbering" "enum_home_page_blocks_requirements_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"content" jsonb,
  	"width" "enum_home_page_blocks_rich_text_width" DEFAULT '820',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT '',
  	"numbering" "enum_home_page_blocks_image_text_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"image_side" "enum_home_page_blocks_image_text_image_side" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_home_page_v_blocks_flight_hero_beats_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_page_v_blocks_flight_hero_beats_chips_icon",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_flight_hero_beats_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__home_page_v_blocks_flight_hero_beats_ctas_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_flight_hero_beats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rail_label" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subheading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_flight_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The process',
  	"numbering" "enum__home_page_v_blocks_how_it_works_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_coverage_map_regions_states" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_coverage_map_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_coverage_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Local broker network',
  	"numbering" "enum__home_page_v_blocks_coverage_map_numbering" DEFAULT 'dash',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"size" "enum__home_page_v_blocks_page_hero_size" DEFAULT 'default',
  	"updated" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"reverse" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'By the numbers',
  	"numbering" "enum__home_page_v_blocks_stats_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_full_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Full-service dispatch',
  	"numbering" "enum__home_page_v_blocks_full_service_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"style" "enum__home_page_v_blocks_full_service_style" DEFAULT 'split',
  	"show_stats" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'How dispatch works',
  	"numbering" "enum__home_page_v_blocks_steps_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"style" "enum__home_page_v_blocks_steps_style" DEFAULT 'list',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_services_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'What we do',
  	"numbering" "enum__home_page_v_blocks_services_tabs_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_services_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare',
  	"numbering" "enum__home_page_v_blocks_services_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"emit_collection_ld" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Pricing',
  	"numbering" "enum__home_page_v_blocks_pricing_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_pricing_compare" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Compare plans',
  	"numbering" "enum__home_page_v_blocks_pricing_compare_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Carrier voice',
  	"numbering" "enum__home_page_v_blocks_testimonials_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'FAQ',
  	"numbering" "enum__home_page_v_blocks_faq_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"source" "enum__home_page_v_blocks_faq_source" DEFAULT 'group',
  	"group" "enum__home_page_v_blocks_faq_group" DEFAULT 'general',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_blog_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Insights',
  	"numbering" "enum__home_page_v_blocks_blog_preview_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"truck" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Contact',
  	"numbering" "enum__home_page_v_blocks_contact_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"form_heading" varchar DEFAULT 'Start dispatching',
  	"status_line" varchar,
  	"reply_note" varchar,
  	"style" "enum__home_page_v_blocks_contact_style" DEFAULT 'section',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'The team',
  	"numbering" "enum__home_page_v_blocks_team_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_timeline_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Our story',
  	"numbering" "enum__home_page_v_blocks_timeline_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_values_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Mission & values',
  	"numbering" "enum__home_page_v_blocks_values_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT 'Requirements',
  	"numbering" "enum__home_page_v_blocks_requirements_numbering" DEFAULT 'counter',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"content" jsonb,
  	"width" "enum__home_page_v_blocks_rich_text_width" DEFAULT '820',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar DEFAULT '',
  	"numbering" "enum__home_page_v_blocks_image_text_numbering" DEFAULT 'none',
  	"heading" varchar,
  	"highlight" varchar,
  	"tail" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_id" integer,
  	"image_side" "enum__home_page_v_blocks_image_text_image_side" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_service" ADD CONSTRAINT "pages_blocks_full_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_service" ADD CONSTRAINT "pages_blocks_full_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_tabs" ADD CONSTRAINT "pages_blocks_services_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_compare" ADD CONSTRAINT "pages_blocks_services_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_compare" ADD CONSTRAINT "pages_blocks_pricing_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_preview" ADD CONSTRAINT "pages_blocks_blog_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_paragraphs" ADD CONSTRAINT "pages_blocks_timeline_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_milestones" ADD CONSTRAINT "pages_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_cards" ADD CONSTRAINT "pages_blocks_values_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements" ADD CONSTRAINT "pages_blocks_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_service" ADD CONSTRAINT "_pages_v_blocks_full_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_service" ADD CONSTRAINT "_pages_v_blocks_full_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps" ADD CONSTRAINT "_pages_v_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_tabs" ADD CONSTRAINT "_pages_v_blocks_services_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_compare" ADD CONSTRAINT "_pages_v_blocks_services_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_compare" ADD CONSTRAINT "_pages_v_blocks_pricing_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_preview" ADD CONSTRAINT "_pages_v_blocks_blog_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_paragraphs" ADD CONSTRAINT "_pages_v_blocks_timeline_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_milestones" ADD CONSTRAINT "_pages_v_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_cards" ADD CONSTRAINT "_pages_v_blocks_values_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values" ADD CONSTRAINT "_pages_v_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values" ADD CONSTRAINT "_pages_v_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements" ADD CONSTRAINT "_pages_v_blocks_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_marquee_items" ADD CONSTRAINT "site_content_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_stats" ADD CONSTRAINT "site_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_full_service" ADD CONSTRAINT "site_content_full_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_steps" ADD CONSTRAINT "site_content_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_carrier_requirements" ADD CONSTRAINT "site_content_carrier_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_pricing_comparison_cells" ADD CONSTRAINT "site_content_pricing_comparison_cells_tier_id_pricing_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content_pricing_comparison_cells" ADD CONSTRAINT "site_content_pricing_comparison_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_pricing_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_pricing_comparison" ADD CONSTRAINT "site_content_pricing_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_flight_hero_beats_chips" ADD CONSTRAINT "home_page_blocks_flight_hero_beats_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_flight_hero_beats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_flight_hero_beats_ctas" ADD CONSTRAINT "home_page_blocks_flight_hero_beats_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_flight_hero_beats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_flight_hero_beats" ADD CONSTRAINT "home_page_blocks_flight_hero_beats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_flight_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_flight_hero" ADD CONSTRAINT "home_page_blocks_flight_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_how_it_works" ADD CONSTRAINT "home_page_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_coverage_map_regions_states" ADD CONSTRAINT "home_page_blocks_coverage_map_regions_states_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_coverage_map_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_coverage_map_regions" ADD CONSTRAINT "home_page_blocks_coverage_map_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_coverage_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_coverage_map" ADD CONSTRAINT "home_page_blocks_coverage_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_page_hero" ADD CONSTRAINT "home_page_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_page_hero" ADD CONSTRAINT "home_page_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee" ADD CONSTRAINT "home_page_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_stats" ADD CONSTRAINT "home_page_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_full_service" ADD CONSTRAINT "home_page_blocks_full_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_full_service" ADD CONSTRAINT "home_page_blocks_full_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_steps" ADD CONSTRAINT "home_page_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_services_tabs" ADD CONSTRAINT "home_page_blocks_services_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_services_grid" ADD CONSTRAINT "home_page_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_services_compare" ADD CONSTRAINT "home_page_blocks_services_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_pricing" ADD CONSTRAINT "home_page_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_pricing_compare" ADD CONSTRAINT "home_page_blocks_pricing_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_testimonials" ADD CONSTRAINT "home_page_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_faq" ADD CONSTRAINT "home_page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_blog_preview" ADD CONSTRAINT "home_page_blocks_blog_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_cta_banner" ADD CONSTRAINT "home_page_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_contact" ADD CONSTRAINT "home_page_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_team" ADD CONSTRAINT "home_page_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_timeline_paragraphs" ADD CONSTRAINT "home_page_blocks_timeline_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_timeline_milestones" ADD CONSTRAINT "home_page_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_timeline" ADD CONSTRAINT "home_page_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_values_cards" ADD CONSTRAINT "home_page_blocks_values_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_values" ADD CONSTRAINT "home_page_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_values" ADD CONSTRAINT "home_page_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_requirements" ADD CONSTRAINT "home_page_blocks_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_rich_text" ADD CONSTRAINT "home_page_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_image_text" ADD CONSTRAINT "home_page_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_image_text" ADD CONSTRAINT "home_page_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats_chips" ADD CONSTRAINT "_home_page_v_blocks_flight_hero_beats_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_flight_hero_beats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats_ctas" ADD CONSTRAINT "_home_page_v_blocks_flight_hero_beats_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_flight_hero_beats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats" ADD CONSTRAINT "_home_page_v_blocks_flight_hero_beats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_flight_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_flight_hero" ADD CONSTRAINT "_home_page_v_blocks_flight_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_how_it_works" ADD CONSTRAINT "_home_page_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_coverage_map_regions_states" ADD CONSTRAINT "_home_page_v_blocks_coverage_map_regions_states_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_coverage_map_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_coverage_map_regions" ADD CONSTRAINT "_home_page_v_blocks_coverage_map_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_coverage_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_coverage_map" ADD CONSTRAINT "_home_page_v_blocks_coverage_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_page_hero" ADD CONSTRAINT "_home_page_v_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_page_hero" ADD CONSTRAINT "_home_page_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_marquee" ADD CONSTRAINT "_home_page_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_stats" ADD CONSTRAINT "_home_page_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_full_service" ADD CONSTRAINT "_home_page_v_blocks_full_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_full_service" ADD CONSTRAINT "_home_page_v_blocks_full_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_steps" ADD CONSTRAINT "_home_page_v_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_services_tabs" ADD CONSTRAINT "_home_page_v_blocks_services_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_services_grid" ADD CONSTRAINT "_home_page_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_services_compare" ADD CONSTRAINT "_home_page_v_blocks_services_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_pricing" ADD CONSTRAINT "_home_page_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_pricing_compare" ADD CONSTRAINT "_home_page_v_blocks_pricing_compare_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_testimonials" ADD CONSTRAINT "_home_page_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_faq" ADD CONSTRAINT "_home_page_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_blog_preview" ADD CONSTRAINT "_home_page_v_blocks_blog_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_cta_banner" ADD CONSTRAINT "_home_page_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_contact" ADD CONSTRAINT "_home_page_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_team" ADD CONSTRAINT "_home_page_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_timeline_paragraphs" ADD CONSTRAINT "_home_page_v_blocks_timeline_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_timeline_milestones" ADD CONSTRAINT "_home_page_v_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_timeline" ADD CONSTRAINT "_home_page_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_values_cards" ADD CONSTRAINT "_home_page_v_blocks_values_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_values" ADD CONSTRAINT "_home_page_v_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_values" ADD CONSTRAINT "_home_page_v_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_requirements" ADD CONSTRAINT "_home_page_v_blocks_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_rich_text" ADD CONSTRAINT "_home_page_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_image_text" ADD CONSTRAINT "_home_page_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_image_text" ADD CONSTRAINT "_home_page_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_hero_image_idx" ON "pages_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_service_order_idx" ON "pages_blocks_full_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_service_parent_id_idx" ON "pages_blocks_full_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_service_path_idx" ON "pages_blocks_full_service" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_service_image_idx" ON "pages_blocks_full_service" USING btree ("image_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_tabs_order_idx" ON "pages_blocks_services_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_tabs_parent_id_idx" ON "pages_blocks_services_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_tabs_path_idx" ON "pages_blocks_services_tabs" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_compare_order_idx" ON "pages_blocks_services_compare" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_compare_parent_id_idx" ON "pages_blocks_services_compare" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_compare_path_idx" ON "pages_blocks_services_compare" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_compare_order_idx" ON "pages_blocks_pricing_compare" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_compare_parent_id_idx" ON "pages_blocks_pricing_compare" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_compare_path_idx" ON "pages_blocks_pricing_compare" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_preview_order_idx" ON "pages_blocks_blog_preview" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_preview_parent_id_idx" ON "pages_blocks_blog_preview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_preview_path_idx" ON "pages_blocks_blog_preview" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_paragraphs_order_idx" ON "pages_blocks_timeline_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_paragraphs_parent_id_idx" ON "pages_blocks_timeline_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_milestones_order_idx" ON "pages_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_milestones_parent_id_idx" ON "pages_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_cards_order_idx" ON "pages_blocks_values_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_cards_parent_id_idx" ON "pages_blocks_values_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_order_idx" ON "pages_blocks_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_parent_id_idx" ON "pages_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_path_idx" ON "pages_blocks_values" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_image_idx" ON "pages_blocks_values" USING btree ("image_id");
  CREATE INDEX "pages_blocks_requirements_order_idx" ON "pages_blocks_requirements" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_parent_id_idx" ON "pages_blocks_requirements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_path_idx" ON "pages_blocks_requirements" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_blocks_page_hero_order_idx" ON "_pages_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_parent_id_idx" ON "_pages_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_path_idx" ON "_pages_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_hero_image_idx" ON "_pages_v_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_service_order_idx" ON "_pages_v_blocks_full_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_service_parent_id_idx" ON "_pages_v_blocks_full_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_service_path_idx" ON "_pages_v_blocks_full_service" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_service_image_idx" ON "_pages_v_blocks_full_service" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_steps_order_idx" ON "_pages_v_blocks_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_parent_id_idx" ON "_pages_v_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_path_idx" ON "_pages_v_blocks_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_tabs_order_idx" ON "_pages_v_blocks_services_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_tabs_parent_id_idx" ON "_pages_v_blocks_services_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_tabs_path_idx" ON "_pages_v_blocks_services_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_compare_order_idx" ON "_pages_v_blocks_services_compare" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_compare_parent_id_idx" ON "_pages_v_blocks_services_compare" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_compare_path_idx" ON "_pages_v_blocks_services_compare" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_compare_order_idx" ON "_pages_v_blocks_pricing_compare" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_compare_parent_id_idx" ON "_pages_v_blocks_pricing_compare" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_compare_path_idx" ON "_pages_v_blocks_pricing_compare" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_preview_order_idx" ON "_pages_v_blocks_blog_preview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_preview_parent_id_idx" ON "_pages_v_blocks_blog_preview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_preview_path_idx" ON "_pages_v_blocks_blog_preview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_paragraphs_order_idx" ON "_pages_v_blocks_timeline_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_paragraphs_parent_id_idx" ON "_pages_v_blocks_timeline_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_order_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_parent_id_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_cards_order_idx" ON "_pages_v_blocks_values_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_cards_parent_id_idx" ON "_pages_v_blocks_values_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_order_idx" ON "_pages_v_blocks_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_parent_id_idx" ON "_pages_v_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_path_idx" ON "_pages_v_blocks_values" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_image_idx" ON "_pages_v_blocks_values" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_requirements_order_idx" ON "_pages_v_blocks_requirements" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_parent_id_idx" ON "_pages_v_blocks_requirements" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_path_idx" ON "_pages_v_blocks_requirements" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "site_content_marquee_items_order_idx" ON "site_content_marquee_items" USING btree ("_order");
  CREATE INDEX "site_content_marquee_items_parent_id_idx" ON "site_content_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "site_content_stats_order_idx" ON "site_content_stats" USING btree ("_order");
  CREATE INDEX "site_content_stats_parent_id_idx" ON "site_content_stats" USING btree ("_parent_id");
  CREATE INDEX "site_content_full_service_order_idx" ON "site_content_full_service" USING btree ("_order");
  CREATE INDEX "site_content_full_service_parent_id_idx" ON "site_content_full_service" USING btree ("_parent_id");
  CREATE INDEX "site_content_steps_order_idx" ON "site_content_steps" USING btree ("_order");
  CREATE INDEX "site_content_steps_parent_id_idx" ON "site_content_steps" USING btree ("_parent_id");
  CREATE INDEX "site_content_carrier_requirements_order_idx" ON "site_content_carrier_requirements" USING btree ("_order");
  CREATE INDEX "site_content_carrier_requirements_parent_id_idx" ON "site_content_carrier_requirements" USING btree ("_parent_id");
  CREATE INDEX "site_content_pricing_comparison_cells_order_idx" ON "site_content_pricing_comparison_cells" USING btree ("_order");
  CREATE INDEX "site_content_pricing_comparison_cells_parent_id_idx" ON "site_content_pricing_comparison_cells" USING btree ("_parent_id");
  CREATE INDEX "site_content_pricing_comparison_cells_tier_idx" ON "site_content_pricing_comparison_cells" USING btree ("tier_id");
  CREATE INDEX "site_content_pricing_comparison_order_idx" ON "site_content_pricing_comparison" USING btree ("_order");
  CREATE INDEX "site_content_pricing_comparison_parent_id_idx" ON "site_content_pricing_comparison" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_flight_hero_beats_chips_order_idx" ON "home_page_blocks_flight_hero_beats_chips" USING btree ("_order");
  CREATE INDEX "home_page_blocks_flight_hero_beats_chips_parent_id_idx" ON "home_page_blocks_flight_hero_beats_chips" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_flight_hero_beats_ctas_order_idx" ON "home_page_blocks_flight_hero_beats_ctas" USING btree ("_order");
  CREATE INDEX "home_page_blocks_flight_hero_beats_ctas_parent_id_idx" ON "home_page_blocks_flight_hero_beats_ctas" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_flight_hero_beats_order_idx" ON "home_page_blocks_flight_hero_beats" USING btree ("_order");
  CREATE INDEX "home_page_blocks_flight_hero_beats_parent_id_idx" ON "home_page_blocks_flight_hero_beats" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_flight_hero_order_idx" ON "home_page_blocks_flight_hero" USING btree ("_order");
  CREATE INDEX "home_page_blocks_flight_hero_parent_id_idx" ON "home_page_blocks_flight_hero" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_flight_hero_path_idx" ON "home_page_blocks_flight_hero" USING btree ("_path");
  CREATE INDEX "home_page_blocks_how_it_works_order_idx" ON "home_page_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "home_page_blocks_how_it_works_parent_id_idx" ON "home_page_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_how_it_works_path_idx" ON "home_page_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "home_page_blocks_coverage_map_regions_states_order_idx" ON "home_page_blocks_coverage_map_regions_states" USING btree ("_order");
  CREATE INDEX "home_page_blocks_coverage_map_regions_states_parent_id_idx" ON "home_page_blocks_coverage_map_regions_states" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_coverage_map_regions_order_idx" ON "home_page_blocks_coverage_map_regions" USING btree ("_order");
  CREATE INDEX "home_page_blocks_coverage_map_regions_parent_id_idx" ON "home_page_blocks_coverage_map_regions" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_coverage_map_order_idx" ON "home_page_blocks_coverage_map" USING btree ("_order");
  CREATE INDEX "home_page_blocks_coverage_map_parent_id_idx" ON "home_page_blocks_coverage_map" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_coverage_map_path_idx" ON "home_page_blocks_coverage_map" USING btree ("_path");
  CREATE INDEX "home_page_blocks_page_hero_order_idx" ON "home_page_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "home_page_blocks_page_hero_parent_id_idx" ON "home_page_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_page_hero_path_idx" ON "home_page_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "home_page_blocks_page_hero_image_idx" ON "home_page_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_marquee_order_idx" ON "home_page_blocks_marquee" USING btree ("_order");
  CREATE INDEX "home_page_blocks_marquee_parent_id_idx" ON "home_page_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_path_idx" ON "home_page_blocks_marquee" USING btree ("_path");
  CREATE INDEX "home_page_blocks_stats_order_idx" ON "home_page_blocks_stats" USING btree ("_order");
  CREATE INDEX "home_page_blocks_stats_parent_id_idx" ON "home_page_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_stats_path_idx" ON "home_page_blocks_stats" USING btree ("_path");
  CREATE INDEX "home_page_blocks_full_service_order_idx" ON "home_page_blocks_full_service" USING btree ("_order");
  CREATE INDEX "home_page_blocks_full_service_parent_id_idx" ON "home_page_blocks_full_service" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_full_service_path_idx" ON "home_page_blocks_full_service" USING btree ("_path");
  CREATE INDEX "home_page_blocks_full_service_image_idx" ON "home_page_blocks_full_service" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_steps_order_idx" ON "home_page_blocks_steps" USING btree ("_order");
  CREATE INDEX "home_page_blocks_steps_parent_id_idx" ON "home_page_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_steps_path_idx" ON "home_page_blocks_steps" USING btree ("_path");
  CREATE INDEX "home_page_blocks_services_tabs_order_idx" ON "home_page_blocks_services_tabs" USING btree ("_order");
  CREATE INDEX "home_page_blocks_services_tabs_parent_id_idx" ON "home_page_blocks_services_tabs" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_services_tabs_path_idx" ON "home_page_blocks_services_tabs" USING btree ("_path");
  CREATE INDEX "home_page_blocks_services_grid_order_idx" ON "home_page_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "home_page_blocks_services_grid_parent_id_idx" ON "home_page_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_services_grid_path_idx" ON "home_page_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "home_page_blocks_services_compare_order_idx" ON "home_page_blocks_services_compare" USING btree ("_order");
  CREATE INDEX "home_page_blocks_services_compare_parent_id_idx" ON "home_page_blocks_services_compare" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_services_compare_path_idx" ON "home_page_blocks_services_compare" USING btree ("_path");
  CREATE INDEX "home_page_blocks_pricing_order_idx" ON "home_page_blocks_pricing" USING btree ("_order");
  CREATE INDEX "home_page_blocks_pricing_parent_id_idx" ON "home_page_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_pricing_path_idx" ON "home_page_blocks_pricing" USING btree ("_path");
  CREATE INDEX "home_page_blocks_pricing_compare_order_idx" ON "home_page_blocks_pricing_compare" USING btree ("_order");
  CREATE INDEX "home_page_blocks_pricing_compare_parent_id_idx" ON "home_page_blocks_pricing_compare" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_pricing_compare_path_idx" ON "home_page_blocks_pricing_compare" USING btree ("_path");
  CREATE INDEX "home_page_blocks_testimonials_order_idx" ON "home_page_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "home_page_blocks_testimonials_parent_id_idx" ON "home_page_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_testimonials_path_idx" ON "home_page_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "home_page_blocks_faq_order_idx" ON "home_page_blocks_faq" USING btree ("_order");
  CREATE INDEX "home_page_blocks_faq_parent_id_idx" ON "home_page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_faq_path_idx" ON "home_page_blocks_faq" USING btree ("_path");
  CREATE INDEX "home_page_blocks_blog_preview_order_idx" ON "home_page_blocks_blog_preview" USING btree ("_order");
  CREATE INDEX "home_page_blocks_blog_preview_parent_id_idx" ON "home_page_blocks_blog_preview" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_blog_preview_path_idx" ON "home_page_blocks_blog_preview" USING btree ("_path");
  CREATE INDEX "home_page_blocks_cta_banner_order_idx" ON "home_page_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "home_page_blocks_cta_banner_parent_id_idx" ON "home_page_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_cta_banner_path_idx" ON "home_page_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "home_page_blocks_contact_order_idx" ON "home_page_blocks_contact" USING btree ("_order");
  CREATE INDEX "home_page_blocks_contact_parent_id_idx" ON "home_page_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_contact_path_idx" ON "home_page_blocks_contact" USING btree ("_path");
  CREATE INDEX "home_page_blocks_team_order_idx" ON "home_page_blocks_team" USING btree ("_order");
  CREATE INDEX "home_page_blocks_team_parent_id_idx" ON "home_page_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_team_path_idx" ON "home_page_blocks_team" USING btree ("_path");
  CREATE INDEX "home_page_blocks_timeline_paragraphs_order_idx" ON "home_page_blocks_timeline_paragraphs" USING btree ("_order");
  CREATE INDEX "home_page_blocks_timeline_paragraphs_parent_id_idx" ON "home_page_blocks_timeline_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_timeline_milestones_order_idx" ON "home_page_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "home_page_blocks_timeline_milestones_parent_id_idx" ON "home_page_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_timeline_order_idx" ON "home_page_blocks_timeline" USING btree ("_order");
  CREATE INDEX "home_page_blocks_timeline_parent_id_idx" ON "home_page_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_timeline_path_idx" ON "home_page_blocks_timeline" USING btree ("_path");
  CREATE INDEX "home_page_blocks_values_cards_order_idx" ON "home_page_blocks_values_cards" USING btree ("_order");
  CREATE INDEX "home_page_blocks_values_cards_parent_id_idx" ON "home_page_blocks_values_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_values_order_idx" ON "home_page_blocks_values" USING btree ("_order");
  CREATE INDEX "home_page_blocks_values_parent_id_idx" ON "home_page_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_values_path_idx" ON "home_page_blocks_values" USING btree ("_path");
  CREATE INDEX "home_page_blocks_values_image_idx" ON "home_page_blocks_values" USING btree ("image_id");
  CREATE INDEX "home_page_blocks_requirements_order_idx" ON "home_page_blocks_requirements" USING btree ("_order");
  CREATE INDEX "home_page_blocks_requirements_parent_id_idx" ON "home_page_blocks_requirements" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_requirements_path_idx" ON "home_page_blocks_requirements" USING btree ("_path");
  CREATE INDEX "home_page_blocks_rich_text_order_idx" ON "home_page_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "home_page_blocks_rich_text_parent_id_idx" ON "home_page_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_rich_text_path_idx" ON "home_page_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "home_page_blocks_image_text_order_idx" ON "home_page_blocks_image_text" USING btree ("_order");
  CREATE INDEX "home_page_blocks_image_text_parent_id_idx" ON "home_page_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_image_text_path_idx" ON "home_page_blocks_image_text" USING btree ("_path");
  CREATE INDEX "home_page_blocks_image_text_image_idx" ON "home_page_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_faqs_id_idx" ON "home_page_rels" USING btree ("faqs_id");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_chips_order_idx" ON "_home_page_v_blocks_flight_hero_beats_chips" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_chips_parent_id_idx" ON "_home_page_v_blocks_flight_hero_beats_chips" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_ctas_order_idx" ON "_home_page_v_blocks_flight_hero_beats_ctas" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_ctas_parent_id_idx" ON "_home_page_v_blocks_flight_hero_beats_ctas" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_order_idx" ON "_home_page_v_blocks_flight_hero_beats" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_flight_hero_beats_parent_id_idx" ON "_home_page_v_blocks_flight_hero_beats" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_flight_hero_order_idx" ON "_home_page_v_blocks_flight_hero" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_flight_hero_parent_id_idx" ON "_home_page_v_blocks_flight_hero" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_flight_hero_path_idx" ON "_home_page_v_blocks_flight_hero" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_how_it_works_order_idx" ON "_home_page_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_how_it_works_parent_id_idx" ON "_home_page_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_how_it_works_path_idx" ON "_home_page_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_coverage_map_regions_states_order_idx" ON "_home_page_v_blocks_coverage_map_regions_states" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_coverage_map_regions_states_parent_id_idx" ON "_home_page_v_blocks_coverage_map_regions_states" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_coverage_map_regions_order_idx" ON "_home_page_v_blocks_coverage_map_regions" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_coverage_map_regions_parent_id_idx" ON "_home_page_v_blocks_coverage_map_regions" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_coverage_map_order_idx" ON "_home_page_v_blocks_coverage_map" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_coverage_map_parent_id_idx" ON "_home_page_v_blocks_coverage_map" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_coverage_map_path_idx" ON "_home_page_v_blocks_coverage_map" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_page_hero_order_idx" ON "_home_page_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_page_hero_parent_id_idx" ON "_home_page_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_page_hero_path_idx" ON "_home_page_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_page_hero_image_idx" ON "_home_page_v_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "_home_page_v_blocks_marquee_order_idx" ON "_home_page_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_marquee_parent_id_idx" ON "_home_page_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_marquee_path_idx" ON "_home_page_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_stats_order_idx" ON "_home_page_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_stats_parent_id_idx" ON "_home_page_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_stats_path_idx" ON "_home_page_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_full_service_order_idx" ON "_home_page_v_blocks_full_service" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_full_service_parent_id_idx" ON "_home_page_v_blocks_full_service" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_full_service_path_idx" ON "_home_page_v_blocks_full_service" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_full_service_image_idx" ON "_home_page_v_blocks_full_service" USING btree ("image_id");
  CREATE INDEX "_home_page_v_blocks_steps_order_idx" ON "_home_page_v_blocks_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_steps_parent_id_idx" ON "_home_page_v_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_steps_path_idx" ON "_home_page_v_blocks_steps" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_services_tabs_order_idx" ON "_home_page_v_blocks_services_tabs" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_services_tabs_parent_id_idx" ON "_home_page_v_blocks_services_tabs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_services_tabs_path_idx" ON "_home_page_v_blocks_services_tabs" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_services_grid_order_idx" ON "_home_page_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_services_grid_parent_id_idx" ON "_home_page_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_services_grid_path_idx" ON "_home_page_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_services_compare_order_idx" ON "_home_page_v_blocks_services_compare" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_services_compare_parent_id_idx" ON "_home_page_v_blocks_services_compare" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_services_compare_path_idx" ON "_home_page_v_blocks_services_compare" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_pricing_order_idx" ON "_home_page_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_pricing_parent_id_idx" ON "_home_page_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_pricing_path_idx" ON "_home_page_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_pricing_compare_order_idx" ON "_home_page_v_blocks_pricing_compare" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_pricing_compare_parent_id_idx" ON "_home_page_v_blocks_pricing_compare" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_pricing_compare_path_idx" ON "_home_page_v_blocks_pricing_compare" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_testimonials_order_idx" ON "_home_page_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_testimonials_parent_id_idx" ON "_home_page_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_testimonials_path_idx" ON "_home_page_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_faq_order_idx" ON "_home_page_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_faq_parent_id_idx" ON "_home_page_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_faq_path_idx" ON "_home_page_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_blog_preview_order_idx" ON "_home_page_v_blocks_blog_preview" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_blog_preview_parent_id_idx" ON "_home_page_v_blocks_blog_preview" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_blog_preview_path_idx" ON "_home_page_v_blocks_blog_preview" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_cta_banner_order_idx" ON "_home_page_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_cta_banner_parent_id_idx" ON "_home_page_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_cta_banner_path_idx" ON "_home_page_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_contact_order_idx" ON "_home_page_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_contact_parent_id_idx" ON "_home_page_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_contact_path_idx" ON "_home_page_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_team_order_idx" ON "_home_page_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_team_parent_id_idx" ON "_home_page_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_team_path_idx" ON "_home_page_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_timeline_paragraphs_order_idx" ON "_home_page_v_blocks_timeline_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_timeline_paragraphs_parent_id_idx" ON "_home_page_v_blocks_timeline_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_timeline_milestones_order_idx" ON "_home_page_v_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_timeline_milestones_parent_id_idx" ON "_home_page_v_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_timeline_order_idx" ON "_home_page_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_timeline_parent_id_idx" ON "_home_page_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_timeline_path_idx" ON "_home_page_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_values_cards_order_idx" ON "_home_page_v_blocks_values_cards" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_values_cards_parent_id_idx" ON "_home_page_v_blocks_values_cards" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_values_order_idx" ON "_home_page_v_blocks_values" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_values_parent_id_idx" ON "_home_page_v_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_values_path_idx" ON "_home_page_v_blocks_values" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_values_image_idx" ON "_home_page_v_blocks_values" USING btree ("image_id");
  CREATE INDEX "_home_page_v_blocks_requirements_order_idx" ON "_home_page_v_blocks_requirements" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_requirements_parent_id_idx" ON "_home_page_v_blocks_requirements" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_requirements_path_idx" ON "_home_page_v_blocks_requirements" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_rich_text_order_idx" ON "_home_page_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_rich_text_parent_id_idx" ON "_home_page_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_rich_text_path_idx" ON "_home_page_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_image_text_order_idx" ON "_home_page_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_image_text_parent_id_idx" ON "_home_page_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_image_text_path_idx" ON "_home_page_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_image_text_image_idx" ON "_home_page_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_meta_version_meta_image_idx" ON "_home_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX "_home_page_v_rels_faqs_id_idx" ON "_home_page_v_rels" USING btree ("faqs_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_full_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_blog_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_full_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_full_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_carrier_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_pricing_comparison_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_pricing_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_flight_hero_beats_chips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_flight_hero_beats_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_flight_hero_beats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_flight_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_coverage_map_regions_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_coverage_map_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_coverage_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_full_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_services_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_services_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_pricing_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_blog_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_timeline_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_values_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats_chips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_flight_hero_beats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_flight_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_coverage_map_regions_states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_coverage_map_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_coverage_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_full_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_services_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_services_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_pricing_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_blog_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_timeline_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_values_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_full_service" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_services_tabs" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_services_compare" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_pricing_compare" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_blog_preview" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_timeline_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_timeline_milestones" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_values_cards" CASCADE;
  DROP TABLE "pages_blocks_values" CASCADE;
  DROP TABLE "pages_blocks_requirements" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_full_service" CASCADE;
  DROP TABLE "_pages_v_blocks_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_services_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_services_compare" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_compare" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_preview" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_milestones" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_values_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_values" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "site_content_marquee_items" CASCADE;
  DROP TABLE "site_content_stats" CASCADE;
  DROP TABLE "site_content_full_service" CASCADE;
  DROP TABLE "site_content_steps" CASCADE;
  DROP TABLE "site_content_carrier_requirements" CASCADE;
  DROP TABLE "site_content_pricing_comparison_cells" CASCADE;
  DROP TABLE "site_content_pricing_comparison" CASCADE;
  DROP TABLE "site_content" CASCADE;
  DROP TABLE "home_page_blocks_flight_hero_beats_chips" CASCADE;
  DROP TABLE "home_page_blocks_flight_hero_beats_ctas" CASCADE;
  DROP TABLE "home_page_blocks_flight_hero_beats" CASCADE;
  DROP TABLE "home_page_blocks_flight_hero" CASCADE;
  DROP TABLE "home_page_blocks_how_it_works" CASCADE;
  DROP TABLE "home_page_blocks_coverage_map_regions_states" CASCADE;
  DROP TABLE "home_page_blocks_coverage_map_regions" CASCADE;
  DROP TABLE "home_page_blocks_coverage_map" CASCADE;
  DROP TABLE "home_page_blocks_page_hero" CASCADE;
  DROP TABLE "home_page_blocks_marquee" CASCADE;
  DROP TABLE "home_page_blocks_stats" CASCADE;
  DROP TABLE "home_page_blocks_full_service" CASCADE;
  DROP TABLE "home_page_blocks_steps" CASCADE;
  DROP TABLE "home_page_blocks_services_tabs" CASCADE;
  DROP TABLE "home_page_blocks_services_grid" CASCADE;
  DROP TABLE "home_page_blocks_services_compare" CASCADE;
  DROP TABLE "home_page_blocks_pricing" CASCADE;
  DROP TABLE "home_page_blocks_pricing_compare" CASCADE;
  DROP TABLE "home_page_blocks_testimonials" CASCADE;
  DROP TABLE "home_page_blocks_faq" CASCADE;
  DROP TABLE "home_page_blocks_blog_preview" CASCADE;
  DROP TABLE "home_page_blocks_cta_banner" CASCADE;
  DROP TABLE "home_page_blocks_contact" CASCADE;
  DROP TABLE "home_page_blocks_team" CASCADE;
  DROP TABLE "home_page_blocks_timeline_paragraphs" CASCADE;
  DROP TABLE "home_page_blocks_timeline_milestones" CASCADE;
  DROP TABLE "home_page_blocks_timeline" CASCADE;
  DROP TABLE "home_page_blocks_values_cards" CASCADE;
  DROP TABLE "home_page_blocks_values" CASCADE;
  DROP TABLE "home_page_blocks_requirements" CASCADE;
  DROP TABLE "home_page_blocks_rich_text" CASCADE;
  DROP TABLE "home_page_blocks_image_text" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v_blocks_flight_hero_beats_chips" CASCADE;
  DROP TABLE "_home_page_v_blocks_flight_hero_beats_ctas" CASCADE;
  DROP TABLE "_home_page_v_blocks_flight_hero_beats" CASCADE;
  DROP TABLE "_home_page_v_blocks_flight_hero" CASCADE;
  DROP TABLE "_home_page_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_home_page_v_blocks_coverage_map_regions_states" CASCADE;
  DROP TABLE "_home_page_v_blocks_coverage_map_regions" CASCADE;
  DROP TABLE "_home_page_v_blocks_coverage_map" CASCADE;
  DROP TABLE "_home_page_v_blocks_page_hero" CASCADE;
  DROP TABLE "_home_page_v_blocks_marquee" CASCADE;
  DROP TABLE "_home_page_v_blocks_stats" CASCADE;
  DROP TABLE "_home_page_v_blocks_full_service" CASCADE;
  DROP TABLE "_home_page_v_blocks_steps" CASCADE;
  DROP TABLE "_home_page_v_blocks_services_tabs" CASCADE;
  DROP TABLE "_home_page_v_blocks_services_grid" CASCADE;
  DROP TABLE "_home_page_v_blocks_services_compare" CASCADE;
  DROP TABLE "_home_page_v_blocks_pricing" CASCADE;
  DROP TABLE "_home_page_v_blocks_pricing_compare" CASCADE;
  DROP TABLE "_home_page_v_blocks_testimonials" CASCADE;
  DROP TABLE "_home_page_v_blocks_faq" CASCADE;
  DROP TABLE "_home_page_v_blocks_blog_preview" CASCADE;
  DROP TABLE "_home_page_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_home_page_v_blocks_contact" CASCADE;
  DROP TABLE "_home_page_v_blocks_team" CASCADE;
  DROP TABLE "_home_page_v_blocks_timeline_paragraphs" CASCADE;
  DROP TABLE "_home_page_v_blocks_timeline_milestones" CASCADE;
  DROP TABLE "_home_page_v_blocks_timeline" CASCADE;
  DROP TABLE "_home_page_v_blocks_values_cards" CASCADE;
  DROP TABLE "_home_page_v_blocks_values" CASCADE;
  DROP TABLE "_home_page_v_blocks_requirements" CASCADE;
  DROP TABLE "_home_page_v_blocks_rich_text" CASCADE;
  DROP TABLE "_home_page_v_blocks_image_text" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_page_hero_size";
  DROP TYPE "public"."enum_pages_blocks_stats_numbering";
  DROP TYPE "public"."enum_pages_blocks_full_service_numbering";
  DROP TYPE "public"."enum_pages_blocks_full_service_style";
  DROP TYPE "public"."enum_pages_blocks_steps_numbering";
  DROP TYPE "public"."enum_pages_blocks_steps_style";
  DROP TYPE "public"."enum_pages_blocks_services_tabs_numbering";
  DROP TYPE "public"."enum_pages_blocks_services_compare_numbering";
  DROP TYPE "public"."enum_pages_blocks_pricing_numbering";
  DROP TYPE "public"."enum_pages_blocks_pricing_compare_numbering";
  DROP TYPE "public"."enum_pages_blocks_testimonials_numbering";
  DROP TYPE "public"."enum_pages_blocks_faq_numbering";
  DROP TYPE "public"."enum_pages_blocks_faq_source";
  DROP TYPE "public"."enum_pages_blocks_faq_group";
  DROP TYPE "public"."enum_pages_blocks_blog_preview_numbering";
  DROP TYPE "public"."enum_pages_blocks_contact_numbering";
  DROP TYPE "public"."enum_pages_blocks_contact_style";
  DROP TYPE "public"."enum_pages_blocks_team_numbering";
  DROP TYPE "public"."enum_pages_blocks_timeline_numbering";
  DROP TYPE "public"."enum_pages_blocks_values_numbering";
  DROP TYPE "public"."enum_pages_blocks_requirements_numbering";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_image_text_numbering";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_side";
  DROP TYPE "public"."enum_pages_change_frequency";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_size";
  DROP TYPE "public"."enum__pages_v_blocks_stats_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_full_service_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_full_service_style";
  DROP TYPE "public"."enum__pages_v_blocks_steps_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_steps_style";
  DROP TYPE "public"."enum__pages_v_blocks_services_tabs_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_services_compare_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_compare_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_faq_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_faq_source";
  DROP TYPE "public"."enum__pages_v_blocks_faq_group";
  DROP TYPE "public"."enum__pages_v_blocks_blog_preview_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_contact_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_contact_style";
  DROP TYPE "public"."enum__pages_v_blocks_team_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_values_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_requirements_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_numbering";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_side";
  DROP TYPE "public"."enum__pages_v_version_change_frequency";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_site_content_steps_icon";
  DROP TYPE "public"."enum_home_page_blocks_flight_hero_beats_chips_icon";
  DROP TYPE "public"."enum_home_page_blocks_flight_hero_beats_ctas_variant";
  DROP TYPE "public"."enum_home_page_blocks_how_it_works_numbering";
  DROP TYPE "public"."enum_home_page_blocks_coverage_map_numbering";
  DROP TYPE "public"."enum_home_page_blocks_page_hero_size";
  DROP TYPE "public"."enum_home_page_blocks_stats_numbering";
  DROP TYPE "public"."enum_home_page_blocks_full_service_numbering";
  DROP TYPE "public"."enum_home_page_blocks_full_service_style";
  DROP TYPE "public"."enum_home_page_blocks_steps_numbering";
  DROP TYPE "public"."enum_home_page_blocks_steps_style";
  DROP TYPE "public"."enum_home_page_blocks_services_tabs_numbering";
  DROP TYPE "public"."enum_home_page_blocks_services_compare_numbering";
  DROP TYPE "public"."enum_home_page_blocks_pricing_numbering";
  DROP TYPE "public"."enum_home_page_blocks_pricing_compare_numbering";
  DROP TYPE "public"."enum_home_page_blocks_testimonials_numbering";
  DROP TYPE "public"."enum_home_page_blocks_faq_numbering";
  DROP TYPE "public"."enum_home_page_blocks_faq_source";
  DROP TYPE "public"."enum_home_page_blocks_faq_group";
  DROP TYPE "public"."enum_home_page_blocks_blog_preview_numbering";
  DROP TYPE "public"."enum_home_page_blocks_contact_numbering";
  DROP TYPE "public"."enum_home_page_blocks_contact_style";
  DROP TYPE "public"."enum_home_page_blocks_team_numbering";
  DROP TYPE "public"."enum_home_page_blocks_timeline_numbering";
  DROP TYPE "public"."enum_home_page_blocks_values_numbering";
  DROP TYPE "public"."enum_home_page_blocks_requirements_numbering";
  DROP TYPE "public"."enum_home_page_blocks_rich_text_width";
  DROP TYPE "public"."enum_home_page_blocks_image_text_numbering";
  DROP TYPE "public"."enum_home_page_blocks_image_text_image_side";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_blocks_flight_hero_beats_chips_icon";
  DROP TYPE "public"."enum__home_page_v_blocks_flight_hero_beats_ctas_variant";
  DROP TYPE "public"."enum__home_page_v_blocks_how_it_works_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_coverage_map_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_page_hero_size";
  DROP TYPE "public"."enum__home_page_v_blocks_stats_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_full_service_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_full_service_style";
  DROP TYPE "public"."enum__home_page_v_blocks_steps_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_steps_style";
  DROP TYPE "public"."enum__home_page_v_blocks_services_tabs_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_services_compare_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_pricing_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_pricing_compare_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_testimonials_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_faq_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_faq_source";
  DROP TYPE "public"."enum__home_page_v_blocks_faq_group";
  DROP TYPE "public"."enum__home_page_v_blocks_blog_preview_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_contact_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_contact_style";
  DROP TYPE "public"."enum__home_page_v_blocks_team_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_timeline_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_values_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_requirements_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__home_page_v_blocks_image_text_numbering";
  DROP TYPE "public"."enum__home_page_v_blocks_image_text_image_side";
  DROP TYPE "public"."enum__home_page_v_version_status";`)
}
