"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import LoadingSpinner from "../LoadingSpinner";
import { refreshQuote } from "@/lib/api/server-utils";

export default function RefreshQuoteButton() {
  let [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      disabled={isPending}
      onClick={() => startTransition(() => refreshQuote())}
    >
      {isPending ? <LoadingSpinner size="sm" /> : "Refresh"}
    </Button>
  );
}
