import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TopStreak } from "@/lib/api/streaks";
import { isActiveStreak } from "@/lib/utils";

interface Props {
  topStreaks: TopStreak[];
}

export default function ActiveStreaksTable({ topStreaks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Habit</TableHead>
          <TableHead className="">Active?</TableHead>
          <TableHead>First Day</TableHead>
          <TableHead>Most Recent Day</TableHead>
          <TableHead className="text-right">Streak Length</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topStreaks.map((streak) => (
          <TableRow key={streak.name}>
            <TableCell className="font-medium">{streak.name}</TableCell>
            <TableCell>{isActiveStreak(new Date(streak.last_day))}</TableCell>

            <TableCell>
              {new Date(streak.first_day).toLocaleString().split(",")[0]}
            </TableCell>
            <TableCell>
              {new Date(streak.last_day!).toLocaleString().split(",")[0]}
            </TableCell>
            <TableCell className="text-right">
              {streak.streak_length} days
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
