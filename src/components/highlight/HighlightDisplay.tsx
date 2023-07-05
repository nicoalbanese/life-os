"use client";
import { Highlight, highlights } from "@/lib/db/schema";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { completeHighlight } from "@/actions/highlight";

export default function HighlightDisplay({
  highlight,
}: {
  highlight: Highlight;
}) {
  let [isPending, startTransition] = useTransition();
  return (
    <div className="p-4 bg-slate-100 flex sm:flex-row flex-col justify-between items-center my-4 rounded-lg">
      <p
        className={`sm:mb-0 mb-4 ${
          highlight.completed ? "line-through opacity-70" : ""
        }`}
      >
        {highlight.content}
      </p>
      <Button
        onClick={() => {
          startTransition(
            () => void completeHighlight({ highlightId: highlight.id })
          );
        }}
        disabled={highlight.completed || isPending}
      >
        Complete
      </Button>
    </div>
  );
}
