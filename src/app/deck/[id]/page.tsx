"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DeckData {
  id: string;
  title: string;
  description: string;
  cards: number;
  downloads: number;
  category: string;
  author: string;
  rating: number;
  tags: string[];
  color: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SampleCard {
  front: string;
  back: string;
}

interface Subscription {
  id: string;
  userId: string;
  isActive: boolean;
  plan: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// Sample cards data for different deck types
const sampleCardsData: Record<string, SampleCard[]> = {
  medical: [
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
  spanish: [
    {
      front: "How do you say &apos;hello&apos; in Spanish?",
      back: "Hola",
    },
    {
      front: "What does &apos;gracias&apos; mean?",
      back: "Thank you",
    },
    {
      front: "How do you say &apos;goodbye&apos; in Spanish?",
      back: "Adiós",
    },
  ],
  default: [
    {
      front: "Sample question?",
      back: "Sample answer",
    },
    {
      front: "Another question?",
      back: "Another answer",
    },
  ],
};

export default function DeckDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [deck, setDeck] = useState<DeckData | null>(null);
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] =
    useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(`/api/decks/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setDeck(data);
        } else if (response.status === 404) {
          setError("Deck not found");
        } else {
          setError("Failed to fetch deck");
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
        setError("Failed to fetch deck");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscription = async () => {
      if (!user) {
        setSubscriptionLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/subscription?userId=${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    if (params.id) {
      fetchDeck();
    }
    fetchSubscription();
  }, [params.id, user]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg1)" }}
      >
        <div className="text-white text-xl">Loading deck...</div>
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg1)" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Deck Not Found
          </h1>
          <p className="text-gray-300 mb-8">
            The deck you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get sample cards based on deck category or use default
  const getSampleCards = (category: string): SampleCard[] => {
    const categoryKey = category.toLowerCase();
    return sampleCardsData[categoryKey] || sampleCardsData.default;
  };

  const sampleCards = getSampleCards(deck.category);

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
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              ← Back to Dashboard
            </Button>
          </Link>
        </nav>

        {/* Deck Header */}
        <div className="mb-8">
          <div
            className={`w-full h-48 bg-gradient-to-br ${deck.color} rounded-lg mb-6 flex items-center justify-center`}
          >
            <span className="text-6xl text-white">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {deck.title}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {deck.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
              {deck.category}
            </span>
            <span>By {deck.author}</span>
            <span>⭐ {deck.rating}/5.0</span>
            <span>{deck.cards} cards</span>
            <span>{deck.downloads.toLocaleString()} downloads</span>
            <span>
              Updated {new Date(deck.updatedAt).toLocaleDateString()}
            </span>
            {!subscriptionLoading && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  subscription && subscription.isActive
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {subscription && subscription.isActive
                  ? "🔓 Pro Access"
                  : "🔒 Premium Required"}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {deck.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 text-white px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          {subscriptionLoading ? (
            <div className="text-white">Loading subscription...</div>
          ) : subscription && subscription.isActive ? (
            <>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() =>
                  (window.location.href = "/decks/testdeck.apkg")
                }
              >
                Download Deck
              </Button>
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Preview Cards
              </Button>
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Share
              </Button>
            </>
          ) : (
            <>
              <Link href="/profile">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Upgrade to Download
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Preview Cards
              </Button>
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Share
              </Button>
            </>
          )}
        </div>

        {/* Sample Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Sample Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleCards.map((card, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    Card {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-blue-300 font-semibold mb-2">
                      Front:
                    </h4>
                    <p className="text-white">{card.front}</p>
                  </div>
                  <div>
                    <h4 className="text-green-300 font-semibold mb-2">
                      Back:
                    </h4>
                    <p className="text-white">{card.back}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Deck Stats */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              Deck Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">
                  {deck.cards}
                </div>
                <div className="text-gray-400 text-sm">
                  Total Cards
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {deck.downloads.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {deck.rating}
                </div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {new Date(deck.createdAt).toLocaleDateString()}
                </div>
                <div className="text-gray-400 text-sm">Created</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
