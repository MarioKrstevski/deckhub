import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing decks
  await prisma.deck.deleteMany({});
  console.log("🗑️  Cleared existing decks");

  // Create sample decks
  const decks = [
    {
      title: "Anatomy & Physiology - Cardiovascular System",
      description:
        "Comprehensive flashcards covering heart anatomy, blood vessels, and cardiovascular physiology for medical students",
      cards: 247,
      downloads: 1250,
      category: "Medical",
      author: "Dr. Emily White",
      rating: 4.8,
      tags: ["anatomy", "physiology", "cardiovascular", "medical"],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Spanish Vocabulary - Intermediate Level",
      description:
        "Essential Spanish vocabulary with audio pronunciation and example sentences for intermediate learners",
      cards: 180,
      downloads: 890,
      category: "Spanish",
      author: "María González",
      rating: 4.6,
      tags: ["spanish", "vocabulary", "intermediate", "language"],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pathology - Infectious Diseases",
      description:
        "Detailed flashcards on bacterial, viral, and fungal infections with treatment protocols and diagnostic criteria",
      cards: 156,
      downloads: 2100,
      category: "Medical",
      author: "Dr. James Chen",
      rating: 4.9,
      tags: ["pathology", "infectious", "diseases", "medical"],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Spanish Grammar - Subjunctive Mood",
      description:
        "Complete guide to Spanish subjunctive with examples, conjugations, and practice exercises",
      cards: 95,
      downloads: 650,
      category: "Spanish",
      author: "Carlos Rodríguez",
      rating: 4.4,
      tags: ["spanish", "grammar", "subjunctive", "advanced"],
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Pharmacology - Cardiovascular Drugs",
      description:
        "Essential cardiovascular medications with mechanisms of action, side effects, and clinical applications",
      cards: 78,
      downloads: 1800,
      category: "Medical",
      author: "Dr. Sarah Johnson",
      rating: 4.7,
      tags: ["pharmacology", "cardiovascular", "drugs", "medical"],
      color: "from-red-500 to-red-600",
    },
    {
      title: "Spanish Conversation - Daily Situations",
      description:
        "Practical Spanish phrases and vocabulary for everyday conversations and travel situations",
      cards: 120,
      downloads: 1100,
      category: "Spanish",
      author: "Ana Martínez",
      rating: 4.5,
      tags: ["spanish", "conversation", "travel", "practical"],
      color: "from-teal-500 to-teal-600",
    },
  ];

  // Insert decks
  for (const deck of decks) {
    await prisma.deck.create({
      data: deck,
    });
  }

  console.log(`✅ Created ${decks.length} decks`);
  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
