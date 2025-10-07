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
import { PaymentModal } from "@/components/PaymentModal";

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

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

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
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const handlePaymentSuccess = async () => {
    // Refresh subscription data after successful payment
    if (user) {
      try {
        const response = await fetch(
          `/api/subscription?userId=${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error("Error refreshing subscription:", error);
      }
    }
    setShowPaymentModal(false);
  };

  const handleUnsubscribe = async () => {
    if (!user || !subscription) return;

    try {
      const response = await fetch(
        `/api/subscription?subscriptionId=${subscription.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSubscription(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to unsubscribe:", errorData);
        // Still set subscription to null since the deletion might have worked
        // even if the response was an error
        setSubscription(null);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={signOut}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </nav>

          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Profile
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your account and subscription
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Information */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Account Information
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">
                      Name
                    </label>
                    <p className="text-white text-lg">
                      {user?.user_metadata?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <p className="text-white text-lg">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">
                      Member Since
                    </label>
                    <p className="text-white text-lg">
                      {user?.created_at
                        ? new Date(
                            user.created_at
                          ).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Information */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Subscription
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your current plan and billing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-white">
                    Loading subscription...
                  </div>
                ) : subscription && subscription.isActive ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">
                        ✅ Active Subscription
                      </span>
                      <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">
                        {subscription.plan.toUpperCase()}
                      </span>
                    </div>

                    {subscription.endDate && (
                      <div>
                        <label className="text-sm font-medium text-gray-400">
                          Subscription Ends
                        </label>
                        <p className="text-white">
                          {new Date(
                            subscription.endDate
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">
                          {getDaysRemaining(subscription.endDate)}{" "}
                          days remaining
                        </p>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button
                        variant="outline"
                        onClick={handleUnsubscribe}
                        className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-gray-400 font-semibold">
                        Free Plan
                      </span>
                      <p className="text-gray-300 text-sm mt-2">
                        Limited access to decks
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">
                        Upgrade to Pro
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Get unlimited access to all decks and features
                      </p>
                      <div className="text-2xl font-bold text-white mb-4">
                        $10/month
                      </div>
                      <Button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Subscribe Now
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
            userId={user?.id || ""}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
