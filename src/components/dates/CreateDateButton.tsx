"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { createDate } from "@/actions/date";
import LoadingSpinner from "../LoadingSpinner";

export default function CreateDateButton() {
  let [isPending, startTransition] = useTransition();
  return (
    <Button
      variant={"default"}
      onClick={() => startTransition(() => void createDate())}
    >
      {isPending ? <LoadingSpinner size="sm" /> : "Create"}
    </Button>
  );
}
