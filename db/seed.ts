import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeonHttp } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import * as schema from "../lib/db/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

// Mirrors lib/db/client.ts's driver selection, duplicated here (rather than
// importing it) because that module does `import "server-only"`, which
// throws when loaded outside Next.js's own build pipeline — this script
// runs standalone via tsx.
const isLocalPostgres = /^(postgres(ql)?:\/\/)[^/]*\b(localhost|127\.0\.0\.1)\b/.test(
  connectionString
);

const db = isLocalPostgres
  ? drizzleNodePostgres(new Pool({ connectionString }), { schema })
  : drizzleNeonHttp(neon(connectionString), { schema });

const TIER_SEED: (typeof schema.subscriptionTiers.$inferInsert)[] = [
  {
    id: 1,
    code: "starter",
    nameKa: "სტარტერი",
    nameEn: "Starter (AI)",
    priceGel: 39,
    features: [
      "ხელოვნური ინტელექტის მიერ შედგენილი კვირეული კვების გეგმა",
      "ქართული რეცეპტების ბაზა",
      "ავტომატურად გენერირებული სავაჭრო სია",
    ],
  },
  {
    id: 2,
    code: "pro",
    nameKa: "პრო",
    nameEn: "Pro (Human + AI)",
    priceGel: 149,
    features: [
      "ყველაფერი „სტარტერიდან“",
      "თვეში 1 ვიდეო-კონსულტაცია სერტიფიცირებულ დიეტოლოგთან",
      "თქვენი გეგმის ინდივიდუალური კორექტირება და პროგრესის მონიტორინგი დიეტოლოგის მიერ",
    ],
  },
  {
    id: 3,
    code: "vip",
    nameKa: "ვიპ",
    nameEn: "VIP All-Inclusive",
    priceGel: 550,
    features: [
      "ყველაფერი „პროდან“",
      "Fitpass აბონემენტი სავარჯიშო დარბაზზე",
      "ფასდაკლება პარტნიორ ლაბორატორიებში",
      "პირადი მწვრთნელის ინდივიდუალური პროგრამა",
    ],
  },
];

type RecipeSeed = typeof schema.recipes.$inferInsert;

function ing(nameKa: string, qty: number, unit: string, groceryCategory: string) {
  return { nameKa, qty, unit, groceryCategory };
}

const RECIPES: RecipeSeed[] = [
  // Breakfast
  {
    slug: "vegetable-omelette",
    nameKa: "ომლეტი ბოსტნეულით",
    nameEn: "Vegetable Omelette",
    instructionsKa: ["კვერცხი აურიეთ.", "დაამატეთ დაჭრილი ბოსტნეული.", "შეწვით საშუალო ცეცხლზე 5 წუთი."],
    ingredients: [ing("კვერცხი", 3, "ც", "dairy"), ing("ბულგარული წიწაკა", 1, "ც", "produce"), ing("ზეითუნის ზეთი", 1, "ს.კ.", "pantry")],
    kcal: 320, proteinG: "22", carbsG: "10", fatG: "22", prepMinutes: 10, servings: 1,
    mealType: "breakfast", tags: ["vegetarian", "gluten_free"],
  },
  {
    slug: "cheese-herb-toast",
    nameKa: "სენდვიჩი ყველით და მწვანილით",
    nameEn: "Georgian Cheese & Herb Toast",
    instructionsKa: ["პური შეწვით.", "დაფარეთ ყველით და მწვანილით."],
    ingredients: [ing("ინტეგრალური პური", 2, "ნაჭერი", "pantry"), ing("სულგუნი", 60, "გ", "dairy"), ing("მწვანილი", 10, "გ", "produce")],
    kcal: 350, proteinG: "14", carbsG: "40", fatG: "14", prepMinutes: 8, servings: 1,
    mealType: "breakfast", tags: ["vegetarian"],
  },
  {
    slug: "matsoni-honey-walnuts",
    nameKa: "მაწონი თაფლით და კაკლით",
    nameEn: "Matsoni with Honey & Walnuts",
    instructionsKa: ["მაწონს დაამატეთ თაფლი და დაქუცმაცებული კაკალი."],
    ingredients: [ing("მაწონი", 200, "გ", "dairy"), ing("თაფლი", 1, "ს.კ.", "pantry"), ing("კაკალი", 20, "გ", "pantry")],
    kcal: 280, proteinG: "10", carbsG: "32", fatG: "12", prepMinutes: 3, servings: 1,
    mealType: "breakfast", tags: ["vegetarian", "gluten_free"],
  },
  {
    slug: "oatmeal-seasonal-fruit",
    nameKa: "შვრიის ფაფა სეზონური ხილით",
    nameEn: "Oatmeal with Seasonal Fruit",
    instructionsKa: ["შვრია მოხარშეთ წყალში ან მცენარეულ რძეში.", "დაამატეთ დაჭრილი ხილი."],
    ingredients: [ing("შვრია", 50, "გ", "pantry"), ing("ბანანი", 1, "ც", "produce"), ing("მცენარეული რძე", 200, "მლ", "dairy")],
    kcal: 300, proteinG: "9", carbsG: "52", fatG: "7", prepMinutes: 10, servings: 1,
    mealType: "breakfast", tags: ["vegan", "vegetarian"],
  },
  {
    slug: "light-shkmeruli",
    nameKa: "მსუბუქი შქმერული",
    nameEn: "Light Shkmeruli (Garlic Chicken)",
    instructionsKa: ["ქათმის მკერდი შეწვით.", "დაამატეთ ნივრის სოუსი."],
    ingredients: [ing("ქათმის მკერდი", 150, "გ", "meat"), ing("ნიორი", 3, "კბილი", "produce"), ing("მაწონი", 50, "გ", "dairy")],
    kcal: 400, proteinG: "35", carbsG: "6", fatG: "26", prepMinutes: 20, servings: 1,
    mealType: "breakfast", tags: ["gluten_free"],
  },
  {
    slug: "green-smoothie-bowl",
    nameKa: "მწვანე სმუზი-ბოული",
    nameEn: "Green Smoothie Bowl",
    instructionsKa: ["ყველა ინგრედიენტი ავურიოთ ბლენდერში.", "დავალაგოთ თასში."],
    ingredients: [ing("სპინატი", 30, "გ", "produce"), ing("ბანანი", 1, "ც", "produce"), ing("მცენარეული რძე", 150, "მლ", "dairy")],
    kcal: 260, proteinG: "8", carbsG: "40", fatG: "8", prepMinutes: 7, servings: 1,
    mealType: "breakfast", tags: ["vegan", "vegetarian", "gluten_free"],
  },

  // Lunch
  {
    slug: "lobio",
    nameKa: "ლობიო",
    nameEn: "Lobio (Georgian Bean Stew)",
    instructionsKa: ["ლობიო მოხარშეთ.", "დაამატეთ შემწვარი ხახვი და სანელებლები."],
    ingredients: [ing("ლობიო", 150, "გ", "pantry"), ing("ხახვი", 1, "ც", "produce"), ing("ქინძი", 10, "გ", "produce")],
    kcal: 420, proteinG: "18", carbsG: "55", fatG: "14", prepMinutes: 40, servings: 1,
    mealType: "lunch", tags: ["vegan", "vegetarian", "gluten_free"],
  },
  {
    slug: "chakapuli",
    nameKa: "ჩაქაფული",
    nameEn: "Chakapuli (Veal & Herb Stew)",
    instructionsKa: ["ხორცი ჩააშუშეთ მწვანილთან და ტყემალთან ერთად."],
    ingredients: [ing("ხბოს ხორცი", 150, "გ", "meat"), ing("ტარხუნა", 15, "გ", "produce"), ing("ტყემალი", 30, "გ", "produce")],
    kcal: 450, proteinG: "32", carbsG: "14", fatG: "28", prepMinutes: 45, servings: 1,
    mealType: "lunch", tags: ["gluten_free"],
  },
  {
    slug: "light-kharcho",
    nameKa: "მსუბუქი ხარჩო",
    nameEn: "Light Kharcho Soup",
    instructionsKa: ["ხორცის ბულიონში დაამატეთ ბრინჯი, ტყემალი და სანელებლები."],
    ingredients: [ing("საქონლის ხორცი", 120, "გ", "meat"), ing("ბრინჯი", 40, "გ", "pantry"), ing("ტყემლის საწებელი", 20, "გ", "pantry")],
    kcal: 380, proteinG: "24", carbsG: "34", fatG: "15", prepMinutes: 50, servings: 1,
    mealType: "lunch", tags: [],
  },
  {
    slug: "mtsvadi-vegetables",
    nameKa: "მწვადი ბოსტნეულით",
    nameEn: "Grilled Mtsvadi with Vegetables",
    instructionsKa: ["ხორცი დაამარინადეთ.", "შეწვით ნახშირზე ბოსტნეულთან ერთად."],
    ingredients: [ing("ღორის ან ქათმის ხორცი", 180, "გ", "meat"), ing("პამიდორი", 1, "ც", "produce"), ing("ბულგარული წიწაკა", 1, "ც", "produce")],
    kcal: 480, proteinG: "38", carbsG: "18", fatG: "28", prepMinutes: 30, servings: 1,
    mealType: "lunch", tags: ["gluten_free"],
  },
  {
    slug: "pkhali-salad",
    nameKa: "ფხალი და მწვანილის სალათი",
    nameEn: "Pkhali with Greens Salad",
    instructionsKa: ["ბოსტნეული მოხარშეთ და დაფშვნეთ.", "შეურიეთ კაკალს და სანელებლებს."],
    ingredients: [ing("ჭარხალი ან ისპანახი", 200, "გ", "produce"), ing("კაკალი", 30, "გ", "pantry"), ing("ხახვი", 0.5, "ც", "produce")],
    kcal: 340, proteinG: "12", carbsG: "30", fatG: "20", prepMinutes: 25, servings: 1,
    mealType: "lunch", tags: ["vegan", "vegetarian", "gluten_free"],
  },
  {
    slug: "grilled-chicken-salad",
    nameKa: "შემწვარი ქათმის სალათი",
    nameEn: "Grilled Chicken Salad",
    instructionsKa: ["ქათმის მკერდი შეწვით.", "დადეთ ბოსტნეულზე."],
    ingredients: [ing("ქათმის მკერდი", 150, "გ", "meat"), ing("სალათის ფოთოლი", 50, "გ", "produce"), ing("ზეითუნის ზეთი", 1, "ს.კ.", "pantry")],
    kcal: 410, proteinG: "36", carbsG: "20", fatG: "20", prepMinutes: 20, servings: 1,
    mealType: "lunch", tags: ["gluten_free"],
  },
  {
    slug: "ostri",
    nameKa: "ოსტრი",
    nameEn: "Ostri (Beef & Tomato Stew)",
    instructionsKa: ["ხორცი ჩააშუშეთ პამიდვრის სოუსში სანელებლებით."],
    ingredients: [ing("საქონლის ხორცი", 150, "გ", "meat"), ing("პამიდვრის პიურე", 100, "გ", "pantry"), ing("ცხარე წიწაკა", 1, "ც", "produce")],
    kcal: 460, proteinG: "30", carbsG: "22", fatG: "26", prepMinutes: 45, servings: 1,
    mealType: "lunch", tags: [],
  },
  {
    slug: "vegetarian-khinkali",
    nameKa: "ვეგეტარიანული ხინკალი",
    nameEn: "Vegetarian Khinkali (Herb-filled)",
    instructionsKa: ["ცომი მოზილეთ.", "შიგთავსი შეავსეთ მწვანილით და ყველით.", "მოხარშეთ."],
    ingredients: [ing("ფქვილი", 100, "გ", "pantry"), ing("მწვანილი", 40, "გ", "produce"), ing("ყველი", 40, "გ", "dairy")],
    kcal: 430, proteinG: "14", carbsG: "58", fatG: "14", prepMinutes: 50, servings: 1,
    mealType: "lunch", tags: ["vegetarian"],
  },

  // Dinner
  {
    slug: "baked-salmon-vegetables",
    nameKa: "გამომცხვარი ორაგული ბოსტნეულით",
    nameEn: "Baked Salmon with Vegetables",
    instructionsKa: ["ორაგული გამოაცხვეთ ღუმელში ბოსტნეულთან ერთად."],
    ingredients: [ing("ორაგული", 150, "გ", "meat"), ing("ასპარაგუსი", 100, "გ", "produce"), ing("ლიმონი", 0.5, "ც", "produce")],
    kcal: 420, proteinG: "38", carbsG: "14", fatG: "24", prepMinutes: 25, servings: 1,
    mealType: "dinner", tags: ["gluten_free"],
  },
  {
    slug: "grilled-chicken-rice",
    nameKa: "შემწვარი ქათმის მკერდი ბრინჯით",
    nameEn: "Grilled Chicken Breast with Rice",
    instructionsKa: ["ქათმის მკერდი შეწვით.", "მოამზადეთ ბრინჯი გვერდზე."],
    ingredients: [ing("ქათმის მკერდი", 150, "გ", "meat"), ing("ბრინჯი", 60, "გ", "pantry"), ing("ბროკოლი", 80, "გ", "produce")],
    kcal: 450, proteinG: "40", carbsG: "42", fatG: "12", prepMinutes: 25, servings: 1,
    mealType: "dinner", tags: ["gluten_free"],
  },
  {
    slug: "eggplant-walnut-rolls",
    nameKa: "ბადრიჯნის რულონები ნიგვზით",
    nameEn: "Eggplant Walnut Rolls",
    instructionsKa: ["ბადრიჯანი შეწვით.", "წაუსვით ნიგვზის პასტა და დაახვიეთ რულონად."],
    ingredients: [ing("ბადრიჯანი", 200, "გ", "produce"), ing("კაკალი", 50, "გ", "pantry"), ing("ნიორი", 2, "კბილი", "produce")],
    kcal: 360, proteinG: "12", carbsG: "24", fatG: "24", prepMinutes: 30, servings: 1,
    mealType: "dinner", tags: ["vegetarian", "vegan", "gluten_free"],
  },
  {
    slug: "light-chakhokhbili",
    nameKa: "მსუბუქი ჩახოხბილი",
    nameEn: "Light Chakhokhbili (Chicken Stew)",
    instructionsKa: ["ქათამი ჩააშუშეთ პამიდვრით და მწვანილით."],
    ingredients: [ing("ქათმის ხორცი", 180, "გ", "meat"), ing("პამიდორი", 2, "ც", "produce"), ing("მწვანილი", 15, "გ", "produce")],
    kcal: 410, proteinG: "34", carbsG: "20", fatG: "20", prepMinutes: 35, servings: 1,
    mealType: "dinner", tags: ["gluten_free"],
  },
  {
    slug: "lentil-vegetable-soup",
    nameKa: "ოსპის სუპი ბოსტნეულით",
    nameEn: "Lentil & Vegetable Soup",
    instructionsKa: ["ოსპი მოხარშეთ ბოსტნეულთან ერთად."],
    ingredients: [ing("ოსპი", 100, "გ", "pantry"), ing("სტაფილო", 1, "ც", "produce"), ing("ხახვი", 1, "ც", "produce")],
    kcal: 350, proteinG: "20", carbsG: "48", fatG: "8", prepMinutes: 35, servings: 1,
    mealType: "dinner", tags: ["vegan", "vegetarian", "gluten_free"],
  },
  {
    slug: "fresh-vegetable-salad-cheese",
    nameKa: "ახალი ბოსტნეულის სალათი ყველით",
    nameEn: "Fresh Vegetable Salad with Cheese",
    instructionsKa: ["ბოსტნეული დაჭერით და აურიეთ ყველთან ერთად."],
    ingredients: [ing("კიტრი", 1, "ც", "produce"), ing("პამიდორი", 1, "ც", "produce"), ing("სულგუნი", 60, "გ", "dairy")],
    kcal: 300, proteinG: "16", carbsG: "18", fatG: "18", prepMinutes: 10, servings: 1,
    mealType: "dinner", tags: ["vegetarian", "gluten_free"],
  },
  {
    slug: "grilled-trout-greens",
    nameKa: "შემწვარი კალმახი მწვანილით",
    nameEn: "Grilled Trout with Greens",
    instructionsKa: ["კალმახი შეწვით.", "მიირთვით ახალ მწვანილთან ერთად."],
    ingredients: [ing("კალმახი", 180, "გ", "meat"), ing("მწვანილი", 20, "გ", "produce"), ing("ზეითუნის ზეთი", 1, "ს.კ.", "pantry")],
    kcal: 400, proteinG: "36", carbsG: "10", fatG: "24", prepMinutes: 20, servings: 1,
    mealType: "dinner", tags: ["gluten_free"],
  },
  {
    slug: "light-lobiani",
    nameKa: "მსუბუქი ლობიანი",
    nameEn: "Light Lobiani (Bean Bread)",
    instructionsKa: ["ცომში შეავსეთ ლობიოს პიურე.", "გამოაცხვეთ ღუმელში."],
    ingredients: [ing("ფქვილი", 100, "გ", "pantry"), ing("ლობიო", 100, "გ", "pantry"), ing("ხახვი", 0.5, "ც", "produce")],
    kcal: 470, proteinG: "16", carbsG: "62", fatG: "18", prepMinutes: 45, servings: 1,
    mealType: "dinner", tags: ["vegetarian"],
  },

  // Snack
  {
    slug: "fruit-nuts-mix",
    nameKa: "ხილისა და კაკლის ნაზავი",
    nameEn: "Fruit & Nuts Mix",
    instructionsKa: ["ხილი და კაკალი აურიეთ."],
    ingredients: [ing("ვაშლი", 1, "ც", "produce"), ing("ნუშის კაკალი", 20, "გ", "pantry")],
    kcal: 180, proteinG: "5", carbsG: "22", fatG: "8", prepMinutes: 2, servings: 1,
    mealType: "snack", tags: ["vegan", "vegetarian", "gluten_free"],
  },
  {
    slug: "sulguni-cucumber",
    nameKa: "სულგუნი კიტრით",
    nameEn: "Sulguni with Cucumber",
    instructionsKa: ["დაჭერით ყველი და კიტრი ნაჭრებად."],
    ingredients: [ing("სულგუნი", 50, "გ", "dairy"), ing("კიტრი", 1, "ც", "produce")],
    kcal: 160, proteinG: "12", carbsG: "6", fatG: "10", prepMinutes: 3, servings: 1,
    mealType: "snack", tags: ["vegetarian", "gluten_free"],
  },
];

async function main() {
  await db.insert(schema.subscriptionTiers).values(TIER_SEED).onConflictDoNothing();
  await db.insert(schema.recipes).values(RECIPES).onConflictDoNothing();
  console.log(`Seeded ${TIER_SEED.length} tiers and ${RECIPES.length} recipes.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
