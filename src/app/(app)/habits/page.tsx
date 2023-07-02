import HabitCard from "@/components/habits/HabitCard";
import { Button } from "@/components/ui/button";
import { getHabitsWithCompletions } from "@/lib/api/habits";
import Link from "next/link";

export default async function Habits() {
  const habits = await getHabitsWithCompletions();

  return (
    <main>
      <div className="flex justify-between mb-4">
        <h1>Habits</h1>
        <Link href="/habits/edit">
          <Button variant={"default"} size="sm">
            Edit
          </Button>
        </Link>
      </div>
      <div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
          {habits.map((habitRecord) => {
            const { habits: habit, completions: completion } = habitRecord;
            return (
              <HabitCard
                key={habit.id.toString()}
                habit={habit}
                completion={completion}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
