CREATE TABLE "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"name" text NOT NULL,
	"portrait_prompt" text NOT NULL,
	"portrait_url" text,
	"model_id" integer,
	"voice_model" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dialogues" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"character_id" integer,
	"dialogue_number" integer NOT NULL,
	"dialogue_text" text NOT NULL,
	"speech_audio_url" text,
	"tone" text NOT NULL,
	"model_name" text,
	"model_id" integer,
	"is_live_portrait_dialogue" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "directors_screenplay" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"screenplay_content" text NOT NULL,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "final_movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"movie_url" text,
	"render_duration" integer,
	"file_size" integer,
	"full_stitched_video_url" text,
	"full_stitched_sound_mixed_url" text,
	"final_movie_upscaled" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "final_script" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"final_script_content" text NOT NULL,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "first_script_draft" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"script_content" text NOT NULL,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "idea_selected" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"selected_idea" text NOT NULL,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "inference_costs" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"model_id" integer,
	"inference_duration" integer NOT NULL,
	"cost_in_dollars" integer NOT NULL,
	"output_url" text
);
--> statement-breakpoint
CREATE TABLE "live_portraits" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"prompt" text NOT NULL,
	"live_portrait_url" text,
	"dialogue_id" integer,
	"model_name" text
);
--> statement-breakpoint
CREATE TABLE "models" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "models_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"user_id" integer,
	"prompt" text NOT NULL,
	"product_image_url" text,
	"prompt_character_count" integer NOT NULL,
	"prompt_character_count_limit" integer NOT NULL,
	"story_structure_style" text NOT NULL,
	"animation_style" text NOT NULL,
	"is_all_asset_ready" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "music" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"music_url" text,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "scene_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"scene_id" integer,
	"scene_video_url" text,
	"model_id" integer,
	"camera_movement" text,
	"scene_video_final_url" text,
	"scene_video_trimmed_url" text
);
--> statement-breakpoint
CREATE TABLE "scenes" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"scene_number" integer NOT NULL,
	"scene_duration" integer NOT NULL,
	"has_product" boolean DEFAULT false,
	"prompt_first_draft" text NOT NULL,
	"prompt_final_draft" text,
	"scene_base_image_url1" text,
	"scene_base_image_url2" text,
	"has_character" boolean DEFAULT false,
	"character_id" integer,
	"scene_image_best_url" text,
	"scene_intro_effect" text,
	"scene_exit_effect" text,
	"model_id" integer
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"plan_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text NOT NULL,
	"interval" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "top10_ideas" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"idea_list" json NOT NULL,
	"model_id" integer
);
--> statement-breakpoint
ALTER TABLE "subscriptions_plans" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "subscriptions_plans" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_user_id_unique";--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "invoice_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "subscription_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "amount_paid" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "amount_paid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "amount_due" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "amount_due" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "currency" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "subscription_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "stripe_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "start_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "end_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "end_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "plan_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_uid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directors_screenplay" ADD CONSTRAINT "directors_screenplay_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directors_screenplay" ADD CONSTRAINT "directors_screenplay_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "final_movies" ADD CONSTRAINT "final_movies_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "final_script" ADD CONSTRAINT "final_script_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "final_script" ADD CONSTRAINT "final_script_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "first_script_draft" ADD CONSTRAINT "first_script_draft_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "first_script_draft" ADD CONSTRAINT "first_script_draft_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_selected" ADD CONSTRAINT "idea_selected_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_selected" ADD CONSTRAINT "idea_selected_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inference_costs" ADD CONSTRAINT "inference_costs_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inference_costs" ADD CONSTRAINT "inference_costs_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_portraits" ADD CONSTRAINT "live_portraits_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_portraits" ADD CONSTRAINT "live_portraits_dialogue_id_dialogues_id_fk" FOREIGN KEY ("dialogue_id") REFERENCES "public"."dialogues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music" ADD CONSTRAINT "music_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music" ADD CONSTRAINT "music_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top10_ideas" ADD CONSTRAINT "top10_ideas_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top10_ideas" ADD CONSTRAINT "top10_ideas_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "default_payment_method_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "gender";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "subscription";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_uid_unique" UNIQUE("user_uid");