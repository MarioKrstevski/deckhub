"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/stores/use-app-store";

export function Counter() {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Counter Example</CardTitle>
        <CardDescription>
          A simple counter using Zustand for state management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">{count}</div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={decrement} variant="outline">
            -
          </Button>
          <Button onClick={increment}>+</Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
