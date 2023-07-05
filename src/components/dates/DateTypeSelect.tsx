"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DateTypeSelect({
  initType,
  setType,
}: {
  initType: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select defaultValue={initType} onValueChange={setType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="days_since">Days Since</SelectItem>
          <SelectItem value="days_until">Days Until</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
