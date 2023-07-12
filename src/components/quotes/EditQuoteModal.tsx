"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Quote } from "@/lib/db/schema";
import { Switch } from "../ui/switch";
import { useRef, useState, useTransition } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { deleteHabit, editHabit } from "@/actions/habit";
import { DialogClose } from "@radix-ui/react-dialog";

export default function EditQuoteModal({ quote }: { quote: Quote }) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  let [isPendingSave, startSaveTransition] = useTransition();
  let [isPendingDelete, startDeleteTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              ref={nameRef}
              id="name"
              defaultValue={quote.quote ?? "Quote"}
              name="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              ref={descRef}
              defaultValue={quote.author ?? "your habit description here..."}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Switch defaultChecked={quote.active!} ref={activeRef} />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() =>
              startDeleteTransition(() => {
                deleteHabit({ id: quote.id });
                setOpen(false);
              })
            }
          >
            {isPendingDelete ? <LoadingSpinner size="sm" /> : "Delete"}
          </Button>
          <DialogClose />
          <Button
            type="submit"
            onClick={() => {
              startSaveTransition(() => {
                editHabit({
                  updatedHabit: {
                    active:
                      activeRef.current?.ariaChecked === "true" ? true : false,
                    description: descRef.current?.value!,
                    name: nameRef.current?.value!,
                    id: quote.id!,
                  },
                });
                setOpen(false);
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
