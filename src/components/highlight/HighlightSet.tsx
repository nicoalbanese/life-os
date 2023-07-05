"use client";
import { useRef, useTransition } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createHighlight } from "@/actions/highlight";

export default function HighlightSet() {
  const highlightRef = useRef<HTMLTextAreaElement | null>(null);
  let [isPending, startTransition] = useTransition();
  return (
    <div>
      <Textarea
        placeholder="What is the one thing you want to get done today?"
        className="my-4"
        ref={highlightRef}
      />
      <div className="w-full flex justify-end">
        <Button
          variant={"default"}
          onClick={() =>
            startTransition(
              () =>
                void createHighlight({
                  content: highlightRef.current?.value as string,
                })
            )
          }
        >
          Create
        </Button>
      </div>
    </div>
  );
}
