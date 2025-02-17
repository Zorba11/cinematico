-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "user_id" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscription_id" TEXT NOT NULL,
    "stripe_user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionPlanId" INTEGER NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_id" TEXT NOT NULL,
    "subscription_id" INTEGER NOT NULL,
    "amount_paid" INTEGER NOT NULL,
    "amount_due" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "product_image_url" TEXT,
    "prompt_character_count" INTEGER NOT NULL,
    "prompt_character_count_limit" INTEGER NOT NULL,
    "story_structure_style" TEXT NOT NULL,
    "animation_style" TEXT NOT NULL,
    "is_all_asset_ready" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "top10_ideas" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "idea_list" JSONB NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "top10_ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idea_selected" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "selected_idea" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "idea_selected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "first_script_draft" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "script_content" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "first_script_draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_script" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "final_script_content" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "final_script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directors_screenplay" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "screenplay_content" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "directors_screenplay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "portrait_prompt" TEXT NOT NULL,
    "portrait_url" TEXT,
    "model_id" INTEGER NOT NULL,
    "voice_model" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dialogues" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,
    "dialogue_number" INTEGER NOT NULL,
    "dialogue_text" TEXT NOT NULL,
    "speech_audio_url" TEXT,
    "tone" TEXT NOT NULL,
    "model_name" TEXT,
    "model_id" INTEGER NOT NULL,
    "is_live_portrait_dialogue" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "dialogues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "live_portraits" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "live_portrait_url" TEXT,
    "dialogue_id" INTEGER NOT NULL,
    "model_name" TEXT,

    CONSTRAINT "live_portraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenes" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "scene_number" INTEGER NOT NULL,
    "scene_duration" INTEGER NOT NULL,
    "has_product" BOOLEAN NOT NULL DEFAULT false,
    "prompt_first_draft" TEXT NOT NULL,
    "prompt_final_draft" TEXT,
    "scene_base_image_url1" TEXT,
    "scene_base_image_url2" TEXT,
    "has_character" BOOLEAN NOT NULL DEFAULT false,
    "character_id" INTEGER,
    "scene_image_best_url" TEXT,
    "scene_intro_effect" TEXT,
    "scene_exit_effect" TEXT,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scene_videos" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "scene_id" INTEGER NOT NULL,
    "scene_video_url" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "camera_movement" TEXT,
    "scene_video_final_url" TEXT,
    "scene_video_trimmed_url" TEXT,

    CONSTRAINT "scene_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "music" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "music_url" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inference_costs" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "inference_duration" INTEGER NOT NULL,
    "cost_in_dollars" INTEGER NOT NULL,
    "output_url" TEXT,

    CONSTRAINT "inference_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_movies" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "movie_url" TEXT NOT NULL,
    "render_duration" INTEGER,
    "file_size" INTEGER,
    "full_stitched_video_url" TEXT NOT NULL,
    "full_stitched_sound_mixed_url" TEXT NOT NULL,
    "final_movie_upscaled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "final_movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plan_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "models_name_key" ON "models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "top10_ideas" ADD CONSTRAINT "top10_ideas_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "top10_ideas" ADD CONSTRAINT "top10_ideas_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea_selected" ADD CONSTRAINT "idea_selected_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea_selected" ADD CONSTRAINT "idea_selected_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "first_script_draft" ADD CONSTRAINT "first_script_draft_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "first_script_draft" ADD CONSTRAINT "first_script_draft_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_script" ADD CONSTRAINT "final_script_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_script" ADD CONSTRAINT "final_script_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directors_screenplay" ADD CONSTRAINT "directors_screenplay_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directors_screenplay" ADD CONSTRAINT "directors_screenplay_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dialogues" ADD CONSTRAINT "dialogues_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_portraits" ADD CONSTRAINT "live_portraits_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_portraits" ADD CONSTRAINT "live_portraits_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "dialogues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inference_costs" ADD CONSTRAINT "inference_costs_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inference_costs" ADD CONSTRAINT "inference_costs_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_movies" ADD CONSTRAINT "final_movies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
