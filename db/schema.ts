import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  json,
} from 'drizzle-orm/pg-core';

// ==================================================================
// Models
// ==================================================================
export const models = pgTable('models', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
});

// ==================================================================
// Users
// ==================================================================
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  createdTime: timestamp('created_time').defaultNow(),
  email: text('email').unique().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  profileImageUrl: text('profile_image_url'),
  userId: text('user_id').unique().notNull(),
  credits: integer('credits').default(0),
});

// ==================================================================
// Subscriptions
// ==================================================================
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  createdTime: timestamp('created_time').defaultNow(),
  subscriptionId: text('subscription_id').notNull(),
  stripeUserId: text('stripe_user_id').notNull(),
  status: text('status').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  planId: text('plan_id').notNull(), // ideally an FK to subscription_plans but stored as text here
  email: text('email').notNull(),
  userId: integer('user_id').references(() => users.id),
});

// ==================================================================
// Invoices
// ==================================================================
export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  createdTime: timestamp('created_time').defaultNow(),
  invoiceId: text('invoice_id').notNull(),
  subscriptionId: integer('subscription_id').references(() => subscriptions.id),
  amountPaid: integer('amount_paid').notNull(),
  amountDue: integer('amount_due').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  userId: integer('user_id').references(() => users.id),
});

// ==================================================================
// Movies
// ==================================================================
export const movie = pgTable('movie', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  userId: integer('user_id').references(() => users.id),
  prompt: text('prompt').notNull(),
  productImageUrl: text('product_image_url'),
  promptCharacterCount: integer('prompt_character_count').notNull(),
  promptCharacterCountLimit: integer('prompt_character_count_limit').notNull(),
  storyStructureStyle: text('story_structure_style').notNull(),
  animationStyle: text('animation_style').notNull(),
  isAllAssetReady: boolean('is_all_asset_ready').default(false),
});

// ==================================================================
// Top 10 Ideas
// ==================================================================
export const top10Ideas = pgTable('top10_ideas', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  ideaList: json('idea_list').notNull(), // stores an array of ideas
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Idea Selected
// ==================================================================
export const ideaSelected = pgTable('idea_selected', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  selectedIdea: text('selected_idea').notNull(),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// First Script Draft
// ==================================================================
export const firstScriptDraft = pgTable('first_script_draft', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  scriptContent: text('script_content').notNull(),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Final Script
// ==================================================================
export const finalScript = pgTable('final_script', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  finalScriptContent: text('final_script_content').notNull(),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Director's Screenplay
// ==================================================================
export const directorsScreenplay = pgTable('directors_screenplay', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  screenplayContent: text('screenplay_content').notNull(),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Characters
// ==================================================================
export const characters = pgTable('characters', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  name: text('name').notNull(),
  portraitPrompt: text('portrait_prompt').notNull(),
  portraitUrl: text('portrait_url'),
  modelId: integer('model_id').references(() => models.id),
  voiceModel: text('voice_model').notNull(),
});

// ==================================================================
// Dialogues
// ==================================================================
export const dialogues = pgTable('dialogues', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  characterId: integer('character_id').references(() => characters.id),
  dialogueNumber: integer('dialogue_number').notNull(),
  dialogueText: text('dialogue_text').notNull(),
  speechAudioUrl: text('speech_audio_url'),
  tone: text('tone').notNull(),
  modelName: text('model_name'),
  modelId: integer('model_id').references(() => models.id),
  isLivePortraitDialogue: boolean('is_live_portrait_dialogue').default(false),
});

// ==================================================================
// Live Portraits
// ==================================================================
export const livePortraits = pgTable('live_portraits', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  prompt: text('prompt').notNull(),
  livePortraitUrl: text('live_portrait_url'),
  dialogueId: integer('dialogue_id').references(() => dialogues.id),
  modelName: text('model_name'),
});

// ==================================================================
// Scenes
// ==================================================================
export const scenes = pgTable('scenes', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  sceneNumber: integer('scene_number').notNull(),
  sceneDuration: integer('scene_duration').notNull(), // duration in seconds
  hasProduct: boolean('has_product').default(false),
  promptFirstDraft: text('prompt_first_draft').notNull(),
  promptFinalDraft: text('prompt_final_draft'),
  sceneBaseImageUrl1: text('scene_base_image_url1'),
  sceneBaseImageUrl2: text('scene_base_image_url2'),
  hasCharacter: boolean('has_character').default(false),
  characterId: integer('character_id').references(() => characters.id),
  sceneImageBestUrl: text('scene_image_best_url'),
  sceneIntroEffect: text('scene_intro_effect'),
  sceneExitEffect: text('scene_exit_effect'),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Scene Videos
// ==================================================================
export const sceneVideos = pgTable('scene_videos', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  sceneId: integer('scene_id').references(() => scenes.id),
  sceneVideoUrl: text('scene_video_url'),
  modelId: integer('model_id').references(() => models.id),
  cameraMovement: text('camera_movement'),
  sceneVideoFinalUrl: text('scene_video_final_url'),
  sceneVideoTrimmedUrl: text('scene_video_trimmed_url'),
});

// ==================================================================
// Music
// ==================================================================
export const music = pgTable('music', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  musicUrl: text('music_url'),
  modelId: integer('model_id').references(() => models.id),
});

// ==================================================================
// Inference Costs
// ==================================================================
export const inferenceCosts = pgTable('inference_costs', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  modelId: integer('model_id').references(() => models.id),
  inferenceDuration: integer('inference_duration').notNull(), // e.g. in seconds
  costInDollars: integer('cost_in_dollars').notNull(),
  outputUrl: text('output_url'),
});

// ==================================================================
// Final Movies
// ==================================================================
export const finalMovies = pgTable('final_movies', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movie.id),
  movieUrl: text('movie_url'),
  renderDuration: integer('render_duration'),
  fileSize: integer('file_size'),
  fullStitchedVideoUrl: text('full_stitched_video_url'),
  fullStitchedSoundMixedUrl: text('full_stitched_sound_mixed_url'),
  finalMovieUpscaled: boolean('final_movie_upscaled').default(false),
});

// ==================================================================
// Subscription Plans
// ==================================================================
export const subscriptionPlans = pgTable('subscription_plans', {
  id: serial('id').primaryKey(),
  createdTime: timestamp('created_time').defaultNow(),
  planId: text('plan_id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  interval: text('interval').notNull(),
});
