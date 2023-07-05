"use client";
import { type DBDate } from "@/lib/db/schema";
import { Input } from "../ui/input";
import { DatePicker } from "./DatePicker";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { DateTypeSelect } from "./DateTypeSelect";
import { Button } from "../ui/button";

export default function EditDate({ date }: { date: DBDate }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(date.date));
  const [type, setType] = useState<string>(date.type!);
  const [title, setTitle] = useState(date.title);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    // need to fix
    if (
      title !== date.title ||
      type !== date.type ||
      currentDate.toString() !== new Date(date.date).toString()
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [currentDate, type, title, date]);
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
        <Button disabled={changed ? false : true}>✓</Button>
        <Button variant={"destructive"}>X</Button>
      </div>
    </div>
  );
}
