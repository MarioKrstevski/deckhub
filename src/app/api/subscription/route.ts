import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Create subscription
export async function POST(request: Request) {
  try {
    const { userId, plan, isActive } = await request.json();

    // First, ensure the user exists in our database
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      // Create user if they don't exist (this happens when they sign up via Supabase Auth)
      await prisma.user.create({
        data: {
          id: userId,
          email: "user@example.com", // We'll get this from Supabase later
          name: "User",
        },
      });
    }

    // Calculate end date (end of current month)
    const now = new Date();
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        isActive,
        startDate: now,
        endDate: endOfMonth,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      {
        error: `Failed to create subscription: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

// GET - Get subscription by userId (from query params)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const subscriptionId = searchParams.get("subscriptionId");

    if (userId) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          userId: userId,
        },
      });
      return NextResponse.json(subscription);
    }

    if (subscriptionId) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: subscriptionId,
        },
      });
      return NextResponse.json(subscription);
    }

    return NextResponse.json(
      { error: "userId or subscriptionId parameter required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

// DELETE - Delete subscription by subscriptionId (from query params)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get("subscriptionId");

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "subscriptionId parameter required" },
        { status: 400 }
      );
    }

    await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json(
      { error: "Failed to delete subscription" },
      { status: 500 }
    );
  }
}
