"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Deck {
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

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/decks");
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        } else {
          console.error("Failed to fetch decks");
        }
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute>
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
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </nav>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back
              {user
                ? `, ${
                    user.user_metadata?.name ||
                    user.email?.split("@")[0]
                  }!`
                : "!"}
            </h1>
            <p className="text-gray-300 text-lg">
              Here are your recent Anki decks
            </p>
          </div>

          {/* Decks Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-white text-xl">
                Loading decks...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <Card
                  key={deck.id}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div
                      className={`w-full h-32 bg-gradient-to-br ${deck.color} rounded-lg mb-4 flex items-center justify-center`}
                    >
                      <span className="text-4xl text-white">📚</span>
                    </div>
                    <CardTitle className="text-white text-xl">
                      {deck.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {deck.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {deck.category}
                      </span>
                      <span>
                        {new Date(
                          deck.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>{deck.cards} cards</span>
                      <span>
                        {deck.downloads.toLocaleString()} downloads
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/deck/${deck.id}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                          View Deck
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        ⋮
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Browse Categories
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Explore decks by subject and difficulty
                  </p>
                  <Button
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    Browse Categories
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Study Progress
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Track your learning progress and statistics
                  </p>
                  <Button
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
