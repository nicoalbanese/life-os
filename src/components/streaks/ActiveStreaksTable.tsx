import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Habit, Streak } from "@/lib/db/schema";
import { differenceInDays } from "@/lib/utils";

interface Props {
  habitsWithStreaks: { habits: Habit; streaks: Streak | null }[];
}

export default function ActiveStreaksTable({ habitsWithStreaks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Habit</TableHead>
          <TableHead>First Day</TableHead>
          <TableHead className="text-right">Streak Length</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {habitsWithStreaks.map((streak) => (
          <TableRow key={streak.habits.id}>
            <TableCell className="font-medium">{streak.habits.name}</TableCell>
            <TableCell>
              {
                new Date(streak.streaks?.firstDay!)
                  .toLocaleString()
                  .split(",")[0]
              }
            </TableCell>
            <TableCell className="text-right">
              {differenceInDays(
                new Date(streak.streaks?.lastDay!),
                new Date(streak.streaks?.firstDay!)
              )}{" "}
              days
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
