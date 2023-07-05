import CreateHabitModal from "@/components/habits/CreateHabitModal";
import HabitCard from "@/components/habits/HabitCard";
import { Button } from "@/components/ui/button";
import { getHabitsWithCompletions, getStreaks } from "@/lib/api/habits";
import Link from "next/link";

export const revalidate = 5;

export default async function Habits() {
  const habits = await getHabitsWithCompletions();

  return (
    <main>
      {/* <pre>{JSON.stringify(habits, null, 2)}</pre> */}
      <div className="flex justify-between mb-4">
        <h1>Habits</h1>
        <Link href="/habits/edit">
          <Button variant={"default"} size="sm">
            Edit
          </Button>
        </Link>
      </div>
      <div>
        {habits.length > 0 ? (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
            {habits.map((habitRecord) => {
              const {
                habits: habit,
                completions: completion,
                streaks: streak,
              } = habitRecord;
              return (
                <HabitCard
                  key={habit.id.toString()}
                  habit={habit}
                  completion={completion}
                  streak={streak}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full bg-slate-100 h-72 shadow-sm rounded-sm">
            <p>No habits set up yet...</p>
            <div className="mt-6">
              <CreateHabitModal />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
