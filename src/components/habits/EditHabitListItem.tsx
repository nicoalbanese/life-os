import { Habit } from "@/lib/db/schema";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import EditHabitModal from "./EditHabitModal";

export default function EditHabitListItem({ habit }: { habit: Habit }) {
  return (
    <>
      <div className="py-4 flex justify-between items-center">
        <div>
          <Badge
            variant={habit.active ? "secondary" : "destructive"}
            className="mb-2"
          >
            {habit.active ? "Active" : "Inactive"}
          </Badge>
          <div className="px-1">
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
          </div>
        </div>
        <EditHabitModal habit={habit} />
      </div>
      <Separator />
    </>
  );
}
