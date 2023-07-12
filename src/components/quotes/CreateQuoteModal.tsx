"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState, useTransition } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { addHabit } from "@/actions/habit";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "../ui/textarea";
import { createQuote } from "@/actions/quote";

export default function CreateQuoteModal() {
  const quoteRef = useRef<HTMLTextAreaElement | null>(null);
  const authorRef = useRef<HTMLInputElement | null>(null);

  let [isPendingSave, startSaveTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Create Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={error ? "mb-4" : ""}>
            Create Quote
          </DialogTitle>
          {error ? (
            <DialogDescription className="bg-secondary p-3 text-destructive">
              {error}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Quote
            </Label>
            <Textarea
              ref={quoteRef}
              id="quote"
              name="quote"
              // defaultValue={habit.name ?? "Habit"}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input
              id="author"
              name="author"
              ref={authorRef}
              // defaultValue={
              //   habit.description ?? "your habit description here..."
              // }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose />
          <Button
            type="submit"
            onClick={() => {
              startSaveTransition(() => {
                if (
                  quoteRef.current?.value.length! > 2 &&
                  authorRef.current?.value.length! > 2
                ) {
                  createQuote({
                    author: authorRef.current?.value!,
                    quote: quoteRef.current?.value!,
                  });
                  setOpen(false);
                } else {
                  setError(
                    "You need a name and description to create a new habit"
                  );
                }
              });
            }}
          >
            {isPendingSave ? <LoadingSpinner size="sm" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
