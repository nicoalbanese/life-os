"use client";
import { Completion, Habit } from "@/lib/db/schema";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTransition } from "react";
import { addCompletion } from "@/actions/completion";
import LoadingSpinner from "../LoadingSpinner";

export default function HabitCard({
  habit,
  completion,
}: {
  habit: Habit;
  completion: Completion | null;
}) {
  let [isPending, startTransition] = useTransition();
  return (
    <Card className="min-h-56 select-none">
      <CardHeader className="mb-0">
        <CardTitle>{habit.name}</CardTitle>
        {habit.description ? (
          <CardDescription>{habit.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center justify-between ">
          {completion == null ? (
            <div className="bg-slate-100 w-full p-6 flex items-center justify-center flex-col rounded-md">
              <p className="mb-4 text-sm font-light">
                Not completed yet today.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  startTransition(
                    () => void addCompletion({ habitId: habit.id })
                  )
                }
              >
                {isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `Complete ${habit.name}`
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center w-full justify-center h-full min-h-32 p-3 flex-col">
              <GreenCheck />
              <p className="text-xs text-slate-400 pt-4">
                completed at{" "}
                {new Date(completion?.time!).toTimeString().split(" ")[0]}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const GreenCheck = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      className="fill-green-600 h-16 w-16"
    >
      <path
        className="fill-green-500"
        d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50  l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
      />
    </svg>
  );
};
