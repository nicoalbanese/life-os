import { DBDate } from "@/lib/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { daysSince, daysUntil } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default async function DateCard({ date }: { date: DBDate }) {
  return (
    <Card className="min-h-56 select-none">
      <CardHeader className="mb-0">
        <div className="flex justify-between">
          <CardTitle className="text-xl font-semibold">{date.title}</CardTitle>
          <Badge>{date.type == "days_until" ? "Until" : "Since"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-3xl">
        {date.type == "days_until"
          ? daysUntil(new Date(date.date))
          : daysSince(new Date(date.date))}{" "}
        days
      </CardContent>
    </Card>
  );
}
