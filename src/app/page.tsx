"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg1)" }}
      >
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg1)" }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DeckHub
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/signin">
              <Button
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Find the Best{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Anki Decks
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover high-quality Anki decks for medical studies and
            Spanish language learning. Study smarter with proven
            flashcards.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Find Decks
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Medical Decks
            </h3>
            <p className="text-gray-300">
              Comprehensive Anki decks for medical students covering
              anatomy, physiology, pathology, and more.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🇪🇸</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Spanish Learning
            </h3>
            <p className="text-gray-300">
              Curated Spanish vocabulary, grammar, and conversation
              decks for all skill levels.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Quality Rated
            </h3>
            <p className="text-gray-300">
              All decks are reviewed and rated by the community to
              ensure high-quality study materials.
            </p>
          </div>
        </div>

        {/* Study Stats */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Thousands of Students
            </h2>
            <p className="text-gray-300">
              Already helping students achieve their learning goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">
                500+
              </div>
              <div className="text-gray-300">Medical Decks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                300+
              </div>
              <div className="text-gray-300">Spanish Decks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                10K+
              </div>
              <div className="text-gray-300">Active Students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
