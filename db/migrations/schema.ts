import { pgTable, serial, timestamp, text, unique, integer, boolean, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const invoices = pgTable("invoices", {
	id: serial().primaryKey().notNull(),
	createdTime: timestamp("created_time", { mode: 'string' }).defaultNow(),
	invoiceId: text("invoice_id").notNull(),
	subscriptionId: text("subscription_id"),
	amountPaid: text("amount_paid"),
	amountDue: text("amount_due"),
	currency: text(),
	status: text(),
	email: text(),
	userId: text("user_id"),
});

export const user = pgTable("user", {
	id: serial().primaryKey().notNull(),
	createdTime: timestamp("created_time", { mode: 'string' }).defaultNow(),
	email: text(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	gender: text(),
	profileImageUrl: text("profile_image_url"),
	userId: text("user_id"),
	subscription: text(),
	credits: text(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const subscriptions = pgTable("subscriptions", {
	id: serial().primaryKey().notNull(),
	createdTime: timestamp("created_time", { mode: 'string' }).defaultNow(),
	subscriptionId: text("subscription_id"),
	stripeUserId: text("stripe_user_id"),
	status: text(),
	startDate: text("start_date"),
	endDate: text("end_date"),
	planId: text("plan_id"),
	defaultPaymentMethodId: text("default_payment_method_id"),
	email: text(),
	userId: text("user_id"),
});

export const characters = pgTable("characters", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	name: text().notNull(),
	portraitPrompt: text("portrait_prompt").notNull(),
	portraitUrl: text("portrait_url"),
	modelId: integer("model_id"),
	voiceModel: text("voice_model").notNull(),
});

export const dialogues = pgTable("dialogues", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	characterId: integer("character_id"),
	dialogueNumber: integer("dialogue_number").notNull(),
	dialogueText: text("dialogue_text").notNull(),
	speechAudioUrl: text("speech_audio_url"),
	tone: text().notNull(),
	modelName: text("model_name"),
	modelId: integer("model_id"),
	isLivePortraitDialogue: boolean("is_live_portrait_dialogue").default(false),
});

export const directorsScreenplay = pgTable("directors_screenplay", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	screenplayContent: text("screenplay_content").notNull(),
	modelId: integer("model_id"),
});

export const finalMovies = pgTable("final_movies", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	movieUrl: text("movie_url"),
	renderDuration: integer("render_duration"),
	fileSize: integer("file_size"),
	fullStitchedVideoUrl: text("full_stitched_video_url"),
	fullStitchedSoundMixedUrl: text("full_stitched_sound_mixed_url"),
	finalMovieUpscaled: boolean("final_movie_upscaled").default(false),
});

export const finalScript = pgTable("final_script", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	finalScriptContent: text("final_script_content").notNull(),
	modelId: integer("model_id"),
});

export const firstScriptDraft = pgTable("first_script_draft", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	scriptContent: text("script_content").notNull(),
	modelId: integer("model_id"),
});

export const ideaSelected = pgTable("idea_selected", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	selectedIdea: text("selected_idea").notNull(),
	modelId: integer("model_id"),
});

export const inferenceCosts = pgTable("inference_costs", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	modelId: integer("model_id"),
	inferenceDuration: integer("inference_duration").notNull(),
	costInDollars: integer("cost_in_dollars").notNull(),
	outputUrl: text("output_url"),
});

export const livePortraits = pgTable("live_portraits", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	prompt: text().notNull(),
	livePortraitUrl: text("live_portrait_url"),
	dialogueId: integer("dialogue_id"),
	modelName: text("model_name"),
});

export const models = pgTable("models", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("models_name_unique").on(table.name),
]);

export const music = pgTable("music", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	musicUrl: text("music_url"),
	modelId: integer("model_id"),
});

export const movie = pgTable("movie", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	userId: integer("user_id"),
	prompt: text().notNull(),
	productImageUrl: text("product_image_url"),
	promptCharacterCount: integer("prompt_character_count").notNull(),
	promptCharacterCountLimit: integer("prompt_character_count_limit").notNull(),
	storyStructureStyle: text("story_structure_style").notNull(),
	animationStyle: text("animation_style").notNull(),
	isAllAssetReady: boolean("is_all_asset_ready").default(false),
});

export const sceneVideos = pgTable("scene_videos", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	sceneId: integer("scene_id"),
	sceneVideoUrl: text("scene_video_url"),
	modelId: integer("model_id"),
	cameraMovement: text("camera_movement"),
	sceneVideoFinalUrl: text("scene_video_final_url"),
	sceneVideoTrimmedUrl: text("scene_video_trimmed_url"),
});

export const scenes = pgTable("scenes", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	sceneNumber: integer("scene_number").notNull(),
	sceneDuration: integer("scene_duration").notNull(),
	hasProduct: boolean("has_product").default(false),
	promptFirstDraft: text("prompt_first_draft").notNull(),
	promptFinalDraft: text("prompt_final_draft"),
	sceneBaseImageUrl1: text("scene_base_image_url1"),
	sceneBaseImageUrl2: text("scene_base_image_url2"),
	hasCharacter: boolean("has_character").default(false),
	characterId: integer("character_id"),
	sceneImageBestUrl: text("scene_image_best_url"),
	sceneIntroEffect: text("scene_intro_effect"),
	sceneExitEffect: text("scene_exit_effect"),
	modelId: integer("model_id"),
});

export const subscriptionPlans = pgTable("subscription_plans", {
	id: serial().primaryKey().notNull(),
	createdTime: timestamp("created_time", { mode: 'string' }).defaultNow(),
	planId: text("plan_id").notNull(),
	name: text().notNull(),
	description: text().notNull(),
	amount: integer().notNull(),
	currency: text().notNull(),
	interval: text().notNull(),
});

export const top10Ideas = pgTable("top10_ideas", {
	id: serial().primaryKey().notNull(),
	movieId: integer("movie_id"),
	ideaList: json("idea_list").notNull(),
	modelId: integer("model_id"),
});
