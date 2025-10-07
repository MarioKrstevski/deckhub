"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample deck data (in a real app, this would come from an API)
const deckData: Record<number, any> = {
  1: {
    id: 1,
    title: "Anatomy & Physiology - Cardiovascular System",
    description:
      "Comprehensive flashcards covering heart anatomy, blood vessels, and cardiovascular physiology for medical students",
    cards: 247,
    downloads: 1250,
    lastModified: "2 hours ago",
    color: "from-blue-500 to-blue-600",
    category: "Medical",
    author: "Dr. Sarah Johnson",
    rating: 4.8,
    tags: ["anatomy", "physiology", "cardiovascular", "medical"],
    sampleCards: [
      {
        front: "What is the normal heart rate range for adults?",
        back: "60-100 beats per minute (bpm)",
      },
      {
        front: "Which chamber of the heart pumps blood to the lungs?",
        back: "Right ventricle",
      },
      {
        front: "What is the function of the SA node?",
        back: "Acts as the natural pacemaker of the heart, initiating electrical impulses",
      },
    ],
  },
  2: {
    id: 2,
    title: "Spanish Vocabulary - Intermediate Level",
    description:
      "Essential Spanish vocabulary with audio pronunciation and example sentences for intermediate learners",
    cards: 180,
    downloads: 890,
    lastModified: "1 day ago",
    color: "from-purple-500 to-purple-600",
    category: "Spanish",
    author: "María González",
    rating: 4.6,
    tags: ["spanish", "vocabulary", "intermediate", "language"],
    sampleCards: [
      {
        front: "How do you say 'thank you' in Spanish?",
        back: "Gracias",
      },
      {
        front: "What does '¿Cómo estás?' mean?",
        back: "How are you?",
      },
      {
        front: "Translate: 'I am hungry'",
        back: "Tengo hambre",
      },
    ],
  },
  3: {
    id: 3,
    title: "Pathology - Infectious Diseases",
    description:
      "Detailed flashcards on bacterial, viral, and fungal infections with treatment protocols and diagnostic criteria",
    cards: 156,
    downloads: 2100,
    lastModified: "3 days ago",
    color: "from-green-500 to-green-600",
    category: "Medical",
    author: "Dr. Michael Chen",
    rating: 4.9,
    tags: [
      "pathology",
      "infectious diseases",
      "medical",
      "diagnosis",
    ],
    sampleCards: [
      {
        front:
          "What is the most common cause of bacterial pneumonia?",
        back: "Streptococcus pneumoniae",
      },
      {
        front: "Which virus causes chickenpox?",
        back: "Varicella-zoster virus (VZV)",
      },
      {
        front: "What is the treatment for MRSA?",
        back: "Vancomycin or daptomycin",
      },
    ],
  },
};

export default function DeckDetailPage() {
  const params = useParams();
  const deckId = parseInt(params.id as string);
  const deck = deckData[deckId];

  if (!deck) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg1)" }}
      >
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Deck Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The deck you're looking for doesn't exist.
            </p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg1)" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DeckHub
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </nav>

        {/* Deck Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div
              className={`w-32 h-32 bg-gradient-to-br ${deck.color} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-6xl text-white">📚</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {deck.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-medium">
                    {deck.rating}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                {deck.title}
              </h1>
              <p className="text-gray-300 text-lg mb-4">
                {deck.description}
              </p>
              <div className="flex items-center gap-6 text-gray-400">
                <span>By {deck.author}</span>
                <span>{deck.cards} cards</span>
                <span>
                  {deck.downloads.toLocaleString()} downloads
                </span>
                <span>Updated {deck.lastModified}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Download Deck
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            Preview Cards
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            Share
          </Button>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {deck.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sample Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Sample Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deck.sampleCards.map((card: any, index: number) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    Card {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Front
                    </h4>
                    <p className="text-white">{card.front}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Back
                    </h4>
                    <p className="text-gray-300">{card.back}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Reviews
          </h3>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="text-center text-gray-400">
                <p>
                  No reviews yet. Be the first to review this deck!
                </p>
                <Button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Write a Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
