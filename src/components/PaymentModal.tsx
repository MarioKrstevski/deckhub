"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export function PaymentModal({
  onClose,
  onSuccess,
  userId,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const cardInfo = {
    number: "4242 4242 4242 4242",
    expiry: "12/25",
    cvv: "123",
    name: "John Doe",
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create subscription in database
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          plan: "pro",
          isActive: true,
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        console.error("Failed to create subscription");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            Complete Payment
          </CardTitle>
          <CardDescription className="text-gray-300">
            Upgrade to Pro for $10/month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Fake Card Info Display */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3">
                Payment Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Card Number:</span>
                  <span className="text-white font-mono">
                    {cardInfo.number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expiry:</span>
                  <span className="text-white font-mono">
                    {cardInfo.expiry}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CVV:</span>
                  <span className="text-white font-mono">
                    {cardInfo.cvv}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-mono">
                    {cardInfo.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
              <p className="text-yellow-300 text-sm">
                ⚠️ This is a demo payment. No real charges will be
                made.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 text-white border-white/20 hover:bg-white/10"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
