"use client";
import { type DBDate } from "@/lib/db/schema";
import { Input } from "../ui/input";
import { DatePicker } from "./DatePicker";
import { useEffect, useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { DateTypeSelect } from "./DateTypeSelect";
import { Button } from "../ui/button";
import { deleteDate, updateDate } from "@/actions/date";

export default function EditDate({ date }: { date: DBDate }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(date.date));
  const [type, setType] = useState<string>(date.type!);
  const [title, setTitle] = useState(date.title);
  let [isPendingSave, startSaveTransition] = useTransition();
  let [isPendingDelete, startDeleteTransition] = useTransition();

  return (
    <div className="flex my-2 gap-4">
      <div className="my-2">
        <Label className="mb-2">Title</Label>
        <Input
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-2">
        <Label className="mb-2">Date</Label>
        <div>
          <DatePicker date={currentDate} setDate={setCurrentDate} />
        </div>
      </div>
      <div className="my-2">
        <Label className="mb-2">Title</Label>
        <DateTypeSelect initType={type} setType={setType} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          disabled={isPendingSave}
          onClick={() =>
            startSaveTransition(
              () =>
                void updateDate({
                  date: {
                    date: currentDate.toString(),
                    id: date.id,
                    title,
                    type: type as "days_until" | "days_since",
                  },
                })
            )
          }
        >
          ✓
        </Button>
        <Button
          variant={"destructive"}
          disabled={isPendingDelete}
          onClick={() =>
            startDeleteTransition(() => deleteDate({ dateId: date.id }))
          }
        >
          X
        </Button>
      </div>
    </div>
  );
}
