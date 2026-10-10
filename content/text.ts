// ============================================================================
// Kvapp — ALL user-facing website text, in one file.
//
// Every headline, body copy, button label, form label, FAQ question/answer,
// pricing card line, and quiz question/option on the site is a plain string
// (or array/object of strings) below. Edit the value on the right of any
// line and save — no other file needs to change for a pure text edit.
//
// Organized into sections matching where each piece of text appears on the
// site (COMMON, HOMEPAGE, PRICING, FAQ, CONTACT, CALCULATOR, QUIZ, RECIPES).
// Business/structural data that is NOT editable prose (prices, tier IDs,
// calorie-factor numbers, image file paths) stays out of this file, in the
// component/domain files that actually use it — see CONTENT_GUIDE.md and
// CLAUDE.md for the full convention.
// ============================================================================

import type { MealType } from "@/lib/domain/recipes/queries";

// ---------------------------------------------------------------------------
// COMMON — shared across every page (nav, footer, the site-wide primary CTA)
// ---------------------------------------------------------------------------

export const siteMeta = {
  title: "kvAPP",
  description:
    "დაიწყე სოწრი ჯანსაღი ცხოვრება პროფესიონალებისა და AI-ის დახმარებით მარტივად",
};

export const primaryCta = " იპოვნე შენი პაკეტი";

export const nav = {
  howItWorks: "როგორ მუშაობს",
  pricing: "ფასები",
  calculator: "კალკულატორი",
};

export const footer = {
  copyrightSuffix: "Kvapp. თბილისი, საქართველო.",
  pricing: "ფასები",
  calculator: "კალკულატორი",
  cta: primaryCta,
};

// ---------------------------------------------------------------------------
// HOMEPAGE — Hero, TrustStrip, HowItWorks, Team, pricing-section intro,
// closing CTA band. (Pricing card content itself is under PRICING below —
// it's shared with /pricing and the quiz result page.)
// ---------------------------------------------------------------------------

export const hero = {
  headline: " ჯანსაღი ცხოვრების წესი იწყება აქ.",
  body: "AI-ის დახამრებით მიიღე შენზე მორგებული პროფესიონალი ნუტრიციოლოგების მიერ შედგენილი კვების რაციონი",
  
  imageAlt: "შემწვარი ორაგული ბოსტნეულით და მარცვლეულით — ჯანსაღი კერძი",
  ringCalorieLabel: "კალორია",
  macroProtein: "ცილა",
  macroCarbs: "ნახშ.",
  macroFat: "ცხიმი",
};

export const trustStrip = [
  "სერტიფიცირებული დიეტოლოგები და მწვრთნელები",
  "თქვენი მონაცემები დაცულია და არასდროს გადაეცემა მესამე მხარეს",
  "გამჭვირვალე ფასი ლარში — დამალული გადასახადების გარეშე",
];

export const howItWorks = {
  heading: "როგორ მუშაობს",
  steps: [
    {
      image: "/images/how-it-works-1.jpg",
      alt: "ადამიანი ავსებს კითხვარს სმარტფონზე",
      title: "გაიარეთ 2-წუთიანი კითხვარი",
      body: "გვითხარით თქვენი მიზანი, გრაფიკი და რა სახის მხარდაჭერა გსურთ — მხოლოდ ხელოვნური ინტელექტი, თუ ნამდვილი ადამიანიც.",
    },
    {
      image: "/images/how-it-works-2.jpg",
      alt: "კვირეული კვების გეგმა ეკრანზე, გარშემო ახალი ბოსტნეული",
      title: "მიიღეთ თქვენი კვების გეგმა",
      body: "კვირეული კვების გეგმა, შედგენილი ხელოვნური ინტელექტის მიერ ნამდვილი ქართული რეცეპტების საფუძველზე, პლუს ავტომატური სავაჭრო სია.",
    },
    {
      image: "/images/how-it-works-3.jpg",
      alt: "ვიდეო-კონსულტაცია დიეტოლოგთან სმარტფონით",
      title: "დაამატეთ დიეტოლოგი ან მწვრთნელი ნებისმიერ დროს",
      body: "განაახლეთ პაკეტი სერტიფიცირებულ დიეტოლოგთან ყოველთვიურ კონსულტაციამდე, ან აირჩიეთ ყველაფერი ერთად — მწვრთნელთან და სავარჯიშო დარბაზთან ერთად.",
    },
  ],
};

export const team = {
  heading: "გაიცანით ჩვენი გუნდი",
  subheading: "სერტიფიცირებული დიეტოლოგები და მწვრთნელები — ხელმისაწვდომია „პრო“ პაკეტიდან.",
  members: [
    {
      name: "ნინო ბერიძე",
      role: "სერტიფიცირებული დიეტოლოგი",
      certification: "კლინიკური კვების დიპლომი, თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      specialties: ["წონის მართვა", "ქართული სამზარეულოს ადაპტაცია"],
    },
    {
      name: "გიორგი მაისურაძე",
      role: "სერტიფიცირებული პირადი მწვრთნელი",
      certification: "ISSA-ს სერტიფიცირებული პირადი მწვრთნელი",
      specialties: ["ძალოვანი ვარჯიში", "დამწყებთათვის"],
    },
    {
      name: "თამარ ხარაზიშვილი",
      role: "სერტიფიცირებული დიეტოლოგი",
      certification: "Precision Nutrition L1",
      specialties: ["ჩვევების დანერგვა", "ჰორმონალური ჯანმრთელობა"],
    },
  ],
};

export const pricingSection = {
  heading: "ერთი სერვისი. სამი გზა დასაწყებად.",
  subheading: "გამჭვირვალე ფასები ლარში — ყველაფერი წინასწარ ცხადია.",
};

export const finalCta = {
  heading: "მზად ხართ დაიწყოთ?",
};

// ---------------------------------------------------------------------------
// PRICING — /pricing page copy + the 3 tier cards. Shared by the homepage
// pricing section, /pricing, and the quiz result page (one <PricingTable/>
// component renders all three). priceGel, tier codes/ids and image file
// paths are NOT here — they're business/wiring data in
// lib/domain/subscriptions/tiers.ts and PricingTable.tsx.
// ---------------------------------------------------------------------------

export const pricingPage = {
  heading: "ფასები",
  subheading: "ერთი სერვისი. სამი გზა დასაწყებად. გაუქმება შესაძლებელია ნებისმიერ დროს.",
  metaTitle: "ფასები — Kvapp",
};

export const recommendedBadge = "რეკომენდირებული";

export const tiers = {
  starter: {
    nameKa: "სტარტერი",
    tagline: "დამოუკიდებელი დაწყება — თუ გსურთ, ჯერ თავად სცადოთ",
    includes: [
      "ხელოვნური ინტელექტის მიერ შედგენილი კვირეული კვების გეგმა",
      "ქართული რეცეპტების ბაზა",
      "ავტომატურად გენერირებული სავაჭრო სია",
    ],
    cta: "პაკეტის ყიდვა",
    imageAlt: "ხელოვნური ინტელექტის ასისტენტი სმარტფონზე, ჯანსაღი საუზმით",
  },
  pro: {
    nameKa: "პრო",
    tagline: "რეკომენდებული — თუ გსურთ ნამდვილი ადამიანის მხარდაჭერა",
    includes: [
      "ყველაფერი „სტარტერიდან“",
      "თვეში 1 ვიდეო-კონსულტაცია სერტიფიცირებულ დიეტოლოგთან",
      "თქვენი გეგმის ინდივიდუალური კორექტირება და პროგრესის მონიტორინგი დიეტოლოგის მიერ",
    ],
    cta: "პაკეტის ყიდვა",
    imageAlt: "ვიდეო-კონსულტაცია დიეტოლოგთან ლეპტოპით",
  },
  vip: {
    nameKa: "ვიპ",
    tagline: "ყველაფერი ჩართულია — თუ გსურთ, რომ ყველაფერზე ჩვენ ვიზრუნოთ",
    includes: [
      "ყველაფერი „პროდან“",
      "Fitpass აბონემენტი სავარჯიშო დარბაზზე",
      "ფასდაკლება პარტნიორ ლაბორატორიებში",
      "პირადი მწვრთნელის ინდივიდუალური პროგრამა",
    ],
    cta: "პაკეტის ყიდვა",
    imageAlt: "სავარჯიშო დარბაზი ჯანსაღი კვებით",
  },
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqHeading = "ხშირად დასმული კითხვები";

export const faqItems = [
  {
    q: "შემიძლია ნებისმიერ დროს გავაუქმო გამოწერა?",
    a: "დიახ. გამოწერის გაუქმება შეგიძლიათ ბილინგის პარამეტრებიდან — წვდომა შენარჩუნებული გექნებათ მიმდინარე ანგარიშსწორების პერიოდის ბოლომდე.",
  },
  {
    q: "რას მოიცავს დიეტოლოგთან კონსულტაცია?",
    a: "ყოველთვიურ ვიდეო-ზარს სერტიფიცირებულ დიეტოლოგთან, რომელსაც შეუძლია უშუალოდ შეცვალოს თქვენი ხელოვნური ინტელექტით შედგენილი გეგმა.",
  },
  {
    q: "არის ეს სამედიცინო მკურნალობის პროგრამა?",
    a: "არა. Kvapp არის ცხოვრების სტილისა და ჯანსაღი ჩვევების ფორმირების სერვისი და არ წარმოადგენს დიაგნოსტიკურ ან სამკურნალო მომსახურებას. სამედიცინო მდგომარეობის შემთხვევაში, გთხოვთ, მიმართოთ ექიმს.",
  },
  {
    q: "როგორ მუშაობს ანგარიშსწორება?",
    a: "ყოველთვიურად, გამოწერის თარიღის შესაბამისად, დაგერიცხებათ თანხა ლარში. ფასები ყოველთვის ცხადად არის მითითებული — დამალული გადასახადების გარეშე.",
  },
];

// ---------------------------------------------------------------------------
// CONTACT — lead-capture form (homepage, below the FAQ)
// ---------------------------------------------------------------------------

export const contact = {
  heading: "დაგვიტოვეთ თქვენი ინფორმაცია და დაგიკავშირდებით",
  // Left panel of the two-panel card (components/marketing/ContactForm.tsx).
  // benefits are placeholder trust bullets (we don't have a public
  // phone/email yet) — easy to swap for real contact details later.
  panel: {
    heading: "საკონტაქტო ინფორმაცია",
    body: "შეავსეთ ფორმა და ჩვენი გუნდი 24 საათში დაგიკავშირდებათ.",
    benefits: [
      "მომენტარული უკუკავშირი",
      "პერსონალური მონაცემები დაცვულია",
      "ინდივიდუალური საჭიროებებზე მორგებული მიდგომა",
    ],
  },
  fields: {
    fullName: "სახელი და გვარი",
    email: "ელფოსტა",
    phone: "ტელეფონი",
    message: "კომენტარი (არასავალდებულო)",
  },
  submit: "გაგზავნა",
  submitting: "იგზავნება...",
  success: {
    title: "მადლობა!",
    body: "თქვენი შეტყობინება მივიღეთ — მალე დაგიკავშირდებით.",
  },
};

// Server-side validation messages (lib/domain/contact/actions.ts) — kept
// here too since they're user-facing text, just not rendered from a
// component file.
export const contactErrors = {
  fullNameRequired: "გთხოვთ, შეიყვანოთ სახელი და გვარი.",
  emailRequired: "გთხოვთ, შეიყვანოთ ელფოსტა.",
  emailInvalid: "გთხოვთ, შეიყვანოთ სწორი ელფოსტის მისამართი.",
  phoneRequired: "გთხოვთ, შეიყვანოთ ტელეფონის ნომერი.",
  submitFailed: "დაფიქსირდა შეცდომა გაგზავნისას. გთხოვთ, სცადოთ ხელახლა.",
};

// ---------------------------------------------------------------------------
// CALCULATOR — BMR/TDEE calculator page + form
// ---------------------------------------------------------------------------

export const calculatorPage = {
  metaTitle: "კალორიების კალკულატორი — Kvapp",
  metaDescription:
    "უფასო კალკულატორი — გაიგეთ თქვენი ბაზალური ცვლის ტემპი და დღიური კალორიული საჭიროება.",
  heading: "კალორიების კალკულატორი",
  subheading:
    "გაიგეთ თქვენი ბაზალური ცვლის ტემპი და რამდენი კალორია გჭირდებათ დღეში, რომ თქვენი ამჟამინდელი წონა შეინარჩუნოთ.",
};

export const calculatorForm = {
  sexLabel: "სქესი",
  sexFemale: "მდედრობითი",
  sexMale: "მამრობითი",
  ageLabel: "ასაკი",
  heightLabel: "სიმაღლე (სმ)",
  weightLabel: "წონა (კგ)",
  activityLabel: "აქტივობის დონე",
  // Keyed by the same `value`s used in BmrCalculator.tsx's ACTIVITY_FACTORS
  // (which keeps the non-editable calorie-factor numbers).
  activityLabels: {
    sedentary: "მჯდომარე ცხოვრების წესი (მინიმალური აქტივობა)",
    light: "მსუბუქი აქტივობა (კვირაში 1-3 დღე)",
    moderate: "საშუალო აქტივობა (კვირაში 3-5 დღე)",
    active: "აქტიური ცხოვრების წესი (კვირაში 6-7 დღე)",
  },
  bmrLabel: "ბაზალური ცვლის ტემპი",
  tdeeLabel: "დღიური კალორიული საჭიროება წონის შესანარჩუნებლად",
  calorieUnit: "კალორია",
  disclaimer:
    "მიახლოებითი მაჩვენებელია, გამოთვლილია Mifflin-St Jeor-ის ფორმულით. არ წარმოადგენს სამედიცინო რეკომენდაციას.",
  cta: "მიიღეთ ამაზე მორგებული გეგმა — იპოვეთ თქვენი პაკეტი",
};

// ---------------------------------------------------------------------------
// QUIZ — intro screen, the 6 step questions/options (structural fields like
// `value`, `multi`, `key` stay in lib/domain/quiz/config.ts, which imports
// the question/option text below), the generic option-form chrome, and the
// result page.
// ---------------------------------------------------------------------------

export const quizIntro = {
  heading: "იპოვეთ თქვენი პაკეტი",
  body: "უპასუხეთ 6 მოკლე კითხვას — შევარჩევთ თქვენთვის შესაფერის პაკეტს და მაგალითის სახით გაჩვენებთ ერთი დღის მენიუს, შედგენილს ნამდვილი ქართული რეცეპტებით.",
  startButton: "კითხვარის დაწყება",
};

// "ნაბიჯი {current} / {total}" — QuizProgress.tsx replaces the placeholders.
export const stepLabelTemplate = "ნაბიჯი {current} / {total}";

export const optionForm = {
  requiredError: "გთხოვთ, გააკეთოთ არჩევანი გასაგრძელებლად.",
  continueButton: "გაგრძელება",
};

export const steps = {
  goal: {
    question: "რა არის თქვენი მთავარი მიზანი?",
    options: {
      lose_weight: "წონის დაკლება",
      maintain_habits: "ჯანსაღი ჩვევების შენარჩუნება",
      build_muscle: "კუნთოვანი მასის მომატება",
    },
  },
  activity_level: {
    question: "რამდენად აქტიური ხართ ამჟამად?",
    options: {
      sedentary: "მჯდომარე ცხოვრების წესი",
      light: "მსუბუქი აქტივობა (კვირაში 1-3 დღე)",
      moderate: "საშუალო აქტივობა (კვირაში 3-5 დღე)",
      active: "აქტიური ცხოვრების წესი (კვირაში 6-7 დღე)",
    },
  },
  diet_restrictions: {
    question: "გაქვთ კვებითი პრეფერენციები ან შეზღუდვები?",
    options: {
      none: "არცერთი",
      vegetarian: "ვეგეტარიანული",
      vegan: "ვეგანური",
      gluten_free: "გლუტენის გარეშე",
    },
  },
  support_preference: {
    question: "რა სახის მხარდაჭერა გსურთ?",
    options: {
      ai_only: "მხოლოდ ხელოვნური ინტელექტის რჩევები",
      occasional_checkins: "დროდადრო კონსულტაცია ნამდვილ ადამიანთან",
      regular_human_support: "რეგულარული მხარდაჭერა ნამდვილი ადამიანისგან",
    },
  },
  gym_interest: {
    question: "სავარჯიშო დარბაზი უკვე გაქვთ, თუ გსურთ მისი დამატება პაკეტში?",
    options: {
      have_gym: "დიახ, მაქვს სავარჯიშო დარბაზი",
      want_gym_included: "მსურს, რომ დარბაზი ჩართული იყოს პაკეტში",
      not_interested: "სავარჯიშო დარბაზი არ მაინტერესებს",
    },
  },
  lab_interest: {
    question: "გაინტერესებთ ლაბორატორიული ანალიზები ფასდაკლებით ჩვენს პარტნიორ ლაბორატორიებში?",
    options: {
      yes: "დიახ",
      no: "არა",
    },
  },
};

export const result = {
  recommendedEyebrow: "თქვენთვის რეკომენდებული პაკეტი",
  sampleDayHeading: "მაგალითი დღის მენიუ",
  calorieUnit: "კალორია",
  macroProteinSuffix: "გ ცილა",
  macroCarbsSuffix: "გ ნახშირწყალი",
  macroFatSuffix: "გ ცხიმი",
  disclaimer:
    "შედეგები შეიძლება განსხვავდებოდეს თითოეული ადამიანისთვის. ეს არის მხოლოდ მაგალითი დღის მენიუ და არ წარმოადგენს კლინიკურ კვების გეგმას.",
  choosePackageHeading: "აირჩიეთ თქვენი პაკეტი",
};

// ---------------------------------------------------------------------------
// RECIPES — meal-type labels shown on the quiz result page
// ---------------------------------------------------------------------------

export const mealTypeLabels: Record<MealType, string> = {
  breakfast: "საუზმე",
  lunch: "სადილი",
  dinner: "ვახშამი",
  snack: "სნექი",
};

// ---------------------------------------------------------------------------
// ADMIN — internal-only dashboard (not public-facing, but still Georgian
// per CONTENT_GUIDE.md; the one real admin user still reads this UI).
// ---------------------------------------------------------------------------

export const adminLogin = {
  metaTitle: "ადმინისტრატორის შესვლა — Kvapp",
  heading: "ადმინისტრატორის პანელი",
  subheading: "შედით თქვენი ელფოსტითა და პაროლით.",
  emailLabel: "ელფოსტა",
  emailRequired: "გთხოვთ, შეიყვანოთ ელფოსტა.",
  emailInvalid: "გთხოვთ, შეიყვანოთ სწორი ელფოსტის მისამართი.",
  submit: "შესვლის ბმულის გაგზავნა",
  submitting: "იგზავნება...",
  confirmation: {
    title: "შეამოწმეთ თქვენი ელფოსტა",
    body: "თუ ეს მისამართი ადმინისტრატორის სიაშია, შესვლის ბმული გამოგზავნილია — გადადით მასზე, რომ გააგრძელოთ.",
  },
  // Temporary password login (lib/auth.ts's "dev-password" provider) —
  // remove this block when that provider is removed.
  passwordDivider: "ან",
  passwordLabel: "პაროლი (დროებითი)",
  passwordRequired: "გთხოვთ, შეიყვანოთ პაროლი.",
  passwordInvalid: "ელფოსტა ან პაროლი არასწორია.",
  passwordSubmit: "შესვლა პაროლით",
};

export const adminAuthEmail = {
  subject: "შესვლა Kvapp ადმინისტრატორის პანელში",
  body: (url: string) =>
    `გამარჯობა,\n\nKvapp ადმინისტრატორის პანელში შესასვლელად გადადით ბმულზე (ვადა: 15 წუთი):\n${url}\n\nთუ ეს მოთხოვნა თქვენ არ გაგზავნიათ, უბრალოდ იგნორირება გაუკეთეთ ამ წერილს.`,
};

export const adminDashboard = {
  title: "ადმინისტრატორის პანელი",
  signOut: "გასვლა",
  nav: {
    leads: "მოთხოვნები",
    bookings: "ჯავშნები",
    inquiries: "შეკითხვები",
    newsletter: "საინფორმაციო გამოწერა",
  },
  comingSoon: "მალე დაემატება",
  leads: {
    heading: "საკონტაქტო ფორმის მოთხოვნები",
    empty: "მოთხოვნები ჯერ არ არის.",
    columns: {
      name: "სახელი და გვარი",
      contact: "კონტაქტი",
      message: "კომენტარი",
      submittedAt: "მოთხოვნის თარიღი",
    },
  },
};
