import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  integer,
  numeric,
  jsonb,
  timestamp,
  date,
  time,
  smallint,
  unique,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

// ---------- Enums ----------
export const userRoleEnum = pgEnum("user_role", ["consumer", "staff", "admin"]);
export const localeEnum = pgEnum("locale", ["ka", "en", "ru"]);
export const staffTypeEnum = pgEnum("staff_type", ["dietitian", "trainer", "both"]);
export const otpPurposeEnum = pgEnum("otp_purpose", [
  "login",
  "signup",
  "booking_verification",
  "password_reset",
]);

export const quizSessionStatusEnum = pgEnum("quiz_session_status", [
  "in_progress",
  "completed",
  "abandoned",
]);

export const tierCodeEnum = pgEnum("tier_code", ["starter", "pro", "vip"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "paused",
  "canceled",
]);
export const tierChangeTypeEnum = pgEnum("tier_change_type", ["upgrade", "downgrade"]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);
export const paymentTypeEnum = pgEnum("payment_type", ["initial", "recurring", "refund"]);

export const mealTypeEnum = pgEnum("meal_type", ["breakfast", "lunch", "dinner", "snack"]);
export const mealPlanStatusEnum = pgEnum("meal_plan_status", ["draft", "active", "archived"]);
export const generatedByEnum = pgEnum("generated_by", ["ai", "dietitian", "trainer"]);
export const generationJobStatusEnum = pgEnum("generation_job_status", [
  "pending",
  "running",
  "succeeded",
  "failed",
]);
export const generationJobTriggerEnum = pgEnum("generation_job_trigger", [
  "subscribe",
  "weekly_refresh",
  "user_requested_regenerate",
  "dietitian_requested",
]);
export const logSourceEnum = pgEnum("log_source", ["plan", "manual"]);

export const groceryCategoryEnum = pgEnum("grocery_category", [
  "produce",
  "dairy",
  "meat",
  "pantry",
  "spices",
  "other",
]);
export const groceryListStatusEnum = pgEnum("grocery_list_status", ["active", "archived"]);

export const bookingTypeEnum = pgEnum("booking_type", ["dietitian_consult", "trainer_session"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "rescheduled",
  "canceled",
  "completed",
  "no_show",
]);

export const fitpassStatusEnum = pgEnum("fitpass_status", ["provisioned", "active", "revoked"]);

export const notificationChannelEnum = pgEnum("notification_channel", ["whatsapp", "email"]);
export const notificationEventTypeEnum = pgEnum("notification_event_type", [
  "welcome",
  "receipt",
  "booking_confirmation",
  "booking_reminder_24h",
  "booking_reminder_1h",
  "booking_canceled",
  "booking_rescheduled",
  "plan_ready",
  "renewal_upcoming",
  "payment_failed",
  "subscription_canceled",
  "password_reset",
  "cancellation_confirmation",
]);
export const notificationStatusEnum = pgEnum("notification_status", [
  "queued",
  "sent",
  "delivered",
  "failed",
]);

// ---------- Identity ----------
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  phone: text("phone").unique(),
  email: text("email").unique(),
  passwordHash: text("password_hash"),
  fullName: text("full_name"),
  preferredLanguage: localeEnum("preferred_language").notNull().default("ka"),
  role: userRoleEnum("role").notNull().default("consumer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const staffProfiles = pgTable("staff_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  staffType: staffTypeEnum("staff_type").notNull(),
  bioKa: text("bio_ka"),
  bioEn: text("bio_en"),
  certifications: jsonb("certifications").$type<
    { name: string; issuingBody: string; year: number }[]
  >(),
  specialties: text("specialties").array(),
  languages: text("languages").array(),
  photoUrl: text("photo_url"),
  isActive: boolean("is_active").notNull().default(true),
});

export const otpCodes = pgTable("otp_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  phoneOrEmail: text("phone_or_email").notNull(),
  codeHash: text("code_hash").notNull(),
  purpose: otpPurposeEnum("purpose").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  consumedAt: timestamp("consumed_at", { withTimezone: true }),
  attemptCount: integer("attempt_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Subscriptions & tiers ----------
export const subscriptionTiers = pgTable("subscription_tiers", {
  id: smallint("id").primaryKey(),
  code: tierCodeEnum("code").notNull().unique(),
  nameKa: text("name_ka").notNull(),
  nameEn: text("name_en").notNull(),
  priceGel: integer("price_gel").notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  tierId: smallint("tier_id").notNull().references(() => subscriptionTiers.id),
  status: subscriptionStatusEnum("status").notNull().default("active"),
  currentPeriodStart: date("current_period_start").notNull(),
  currentPeriodEnd: date("current_period_end").notNull(),
  billingAnniversaryDay: smallint("billing_anniversary_day").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  pspCustomerId: text("psp_customer_id"),
  pspSubscriptionId: text("psp_subscription_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscriptionTierChanges = pgTable("subscription_tier_changes", {
  id: uuid("id").defaultRandom().primaryKey(),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  fromTierId: smallint("from_tier_id").references(() => subscriptionTiers.id),
  toTierId: smallint("to_tier_id").notNull().references(() => subscriptionTiers.id),
  changeType: tierChangeTypeEnum("change_type").notNull(),
  effectiveAt: timestamp("effective_at", { withTimezone: true }).notNull(),
});

export const paymentMethods = pgTable("payment_methods", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  provider: text("provider").notNull(),
  providerCardToken: text("provider_card_token").notNull(),
  cardBrand: text("card_brand"),
  last4: text("last4"),
  expMonth: smallint("exp_month"),
  expYear: smallint("exp_year"),
  isDefault: boolean("is_default").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  provider: text("provider").notNull(),
  providerPaymentId: text("provider_payment_id").notNull().unique(),
  kvappOrderId: text("kvapp_order_id").notNull().unique(),
  amountGel: integer("amount_gel").notNull(),
  type: paymentTypeEnum("type").notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  failureReason: text("failure_reason"),
  billingPeriodStart: date("billing_period_start"),
  billingPeriodEnd: date("billing_period_end"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  settledAt: timestamp("settled_at", { withTimezone: true }),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id").references(() => payments.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amountGel: integer("amount_gel").notNull(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
  pdfUrl: text("pdf_url"),
  mailgunMessageId: text("mailgun_message_id"),
});

export const dunningAttempts = pgTable("dunning_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  attemptNumber: smallint("attempt_number").notNull(),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }),
  nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }),
  outcome: text("outcome"),
});

export const addonPurchases = pgTable("addon_purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  addonType: text("addon_type").notNull(),
  quantityRemaining: integer("quantity_remaining").notNull().default(0),
  purchasedAt: timestamp("purchased_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Quiz ----------
export const quizSessions = pgTable("quiz_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  sessionToken: text("session_token").notNull().unique(),
  locale: localeEnum("locale").notNull().default("ka"),
  status: quizSessionStatusEnum("status").notNull().default("in_progress"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const quizResponses = pgTable(
  "quiz_responses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    quizSessionId: uuid("quiz_session_id").notNull().references(() => quizSessions.id),
    stepKey: text("step_key").notNull(),
    answerValue: jsonb("answer_value").notNull(),
    answeredAt: timestamp("answered_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique().on(t.quizSessionId, t.stepKey)]
);

export const quizResults = pgTable("quiz_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  quizSessionId: uuid("quiz_session_id")
    .notNull()
    .references(() => quizSessions.id)
    .unique(),
  recommendedTierId: smallint("recommended_tier_id").notNull().references(() => subscriptionTiers.id),
  computedProfile: jsonb("computed_profile").notNull(),
  rulesVersion: text("rules_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- Content ----------
export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  nameKa: text("name_ka").notNull(),
  nameEn: text("name_en").notNull(),
  nameRu: text("name_ru"),
  instructionsKa: jsonb("instructions_ka").$type<string[]>(),
  ingredients: jsonb("ingredients").$type<
    { nameKa: string; qty: number; unit: string; groceryCategory: string }[]
  >().notNull(),
  kcal: integer("kcal").notNull(),
  proteinG: numeric("protein_g", { precision: 6, scale: 1 }).notNull(),
  carbsG: numeric("carbs_g", { precision: 6, scale: 1 }).notNull(),
  fatG: numeric("fat_g", { precision: 6, scale: 1 }).notNull(),
  prepMinutes: integer("prep_minutes").notNull(),
  servings: integer("servings").notNull().default(1),
  mealType: mealTypeEnum("meal_type").notNull(),
  tags: text("tags").array().notNull().default([]),
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").notNull().default(true),
  createdBy: uuid("created_by").references((): AnyPgColumn => users.id),
});

// ---------- Plans & tracking ----------
export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  weekStartDate: date("week_start_date").notNull(),
  status: mealPlanStatusEnum("status").notNull().default("draft"),
  generatedBy: generatedByEnum("generated_by").notNull().default("ai"),
  sourceQuizResultId: uuid("source_quiz_result_id").references(() => quizResults.id),
  generationProfile: jsonb("generation_profile"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const mealPlanEntries = pgTable("meal_plan_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  mealPlanId: uuid("meal_plan_id").notNull().references(() => mealPlans.id),
  dayOfWeek: smallint("day_of_week").notNull(),
  mealType: mealTypeEnum("meal_type").notNull(),
  recipeId: uuid("recipe_id").notNull().references(() => recipes.id),
  servings: numeric("servings", { precision: 4, scale: 2 }).notNull().default("1"),
  sortOrder: integer("sort_order").notNull().default(0),
  notesFromDietitian: text("notes_from_dietitian"),
});

export const mealPlanAdjustments = pgTable("meal_plan_adjustments", {
  id: uuid("id").defaultRandom().primaryKey(),
  mealPlanId: uuid("meal_plan_id").notNull().references(() => mealPlans.id),
  adjustedByUserId: uuid("adjusted_by_user_id").notNull().references(() => users.id),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const mealLogs = pgTable("meal_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  loggedAt: timestamp("logged_at", { withTimezone: true }).notNull().defaultNow(),
  loggedDate: date("logged_date").notNull(),
  mealPlanEntryId: uuid("meal_plan_entry_id").references(() => mealPlanEntries.id),
  recipeId: uuid("recipe_id").references(() => recipes.id),
  customFoodName: text("custom_food_name"),
  kcal: integer("kcal"),
  proteinG: numeric("protein_g", { precision: 6, scale: 1 }),
  carbsG: numeric("carbs_g", { precision: 6, scale: 1 }),
  fatG: numeric("fat_g", { precision: 6, scale: 1 }),
  source: logSourceEnum("source").notNull().default("manual"),
});

export const mealPlanGenerationJobs = pgTable("meal_plan_generation_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  trigger: generationJobTriggerEnum("trigger").notNull(),
  status: generationJobStatusEnum("status").notNull().default("pending"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  processedAt: timestamp("processed_at", { withTimezone: true }),
});

// ---------- Grocery ----------
export const groceryLists = pgTable("grocery_lists", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  mealPlanId: uuid("meal_plan_id").notNull().references(() => mealPlans.id),
  weekStartDate: date("week_start_date").notNull(),
  status: groceryListStatusEnum("status").notNull().default("active"),
});

export const groceryListItems = pgTable("grocery_list_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  groceryListId: uuid("grocery_list_id").notNull().references(() => groceryLists.id),
  ingredientNameKa: text("ingredient_name_ka").notNull(),
  category: groceryCategoryEnum("category").notNull().default("other"),
  quantity: numeric("quantity", { precision: 8, scale: 2 }),
  unit: text("unit"),
  isChecked: boolean("is_checked").notNull().default(false),
  sourceRecipeIds: uuid("source_recipe_ids").array(),
});

// ---------- Booking ----------
export const staffAvailability = pgTable("staff_availability", {
  id: uuid("id").defaultRandom().primaryKey(),
  staffId: uuid("staff_id").notNull().references(() => staffProfiles.id),
  weekday: smallint("weekday").notNull(),
  startTimeLocal: time("start_time_local").notNull(),
  endTimeLocal: time("end_time_local").notNull(),
  slotLengthMinutes: smallint("slot_length_minutes").notNull().default(30),
  effectiveFrom: date("effective_from").notNull(),
  effectiveTo: date("effective_to"),
});

export const bookingSlots = pgTable(
  "booking_slots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    staffId: uuid("staff_id").notNull().references(() => staffProfiles.id),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    status: text("status").notNull().default("open"),
  },
  (t) => [unique().on(t.staffId, t.startsAt)]
);

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingSlotId: uuid("booking_slot_id").notNull().references(() => bookingSlots.id).unique(),
  userId: uuid("user_id").notNull().references(() => users.id),
  staffId: uuid("staff_id").notNull().references(() => staffProfiles.id),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  type: bookingTypeEnum("type").notNull(),
  status: bookingStatusEnum("status").notNull().default("confirmed"),
  notes: text("notes"),
  cancelReason: text("cancel_reason"),
  canceledAt: timestamp("canceled_at", { withTimezone: true }),
  reminder24hSentAt: timestamp("reminder_24h_sent_at", { withTimezone: true }),
  reminder1hSentAt: timestamp("reminder_1h_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------- VIP extras ----------
export const fitpassRedemptions = pgTable("fitpass_redemptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  fitpassCode: text("fitpass_code"),
  status: fitpassStatusEnum("status").notNull().default("provisioned"),
});

export const labPartners = pgTable("lab_partners", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  discountDescriptionKa: text("discount_description_ka"),
  bookingUrl: text("booking_url"),
  isActive: boolean("is_active").notNull().default(true),
});

export const labDiscountRedemptions = pgTable("lab_discount_redemptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  labPartnerId: uuid("lab_partner_id").notNull().references(() => labPartners.id),
  code: text("code"),
  redeemedAt: timestamp("redeemed_at", { withTimezone: true }),
});

// ---------- Notifications ----------
export const notificationLog = pgTable("notification_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  channel: notificationChannelEnum("channel").notNull(),
  eventType: notificationEventTypeEnum("event_type").notNull(),
  status: notificationStatusEnum("status").notNull().default("queued"),
  providerMessageId: text("provider_message_id"),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
});

export const notificationPreferences = pgTable("notification_preferences", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id),
  whatsappEnabled: boolean("whatsapp_enabled").notNull().default(true),
  emailEnabled: boolean("email_enabled").notNull().default(true),
});
