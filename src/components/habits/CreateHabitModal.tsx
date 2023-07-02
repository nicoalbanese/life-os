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

export default function CreateHabitModal() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);

  let [isPendingSave, startSaveTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Create Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={error ? "mb-4" : ""}>
            Create Habit
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
              Name
            </Label>
            <Input
              ref={nameRef}
              id="name"
              name="name"
              // defaultValue={habit.name ?? "Habit"}
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
                  nameRef.current?.value.length! > 2 &&
                  descRef.current?.value.length! > 2
                ) {
                  addHabit({
                    desc: descRef.current?.value!,
                    name: nameRef.current?.value!,
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
