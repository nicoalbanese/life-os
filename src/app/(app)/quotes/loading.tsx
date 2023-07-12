import HabitCardSkeleton from "@/components/habits/HabitCardSkeleton";

export default function Loading() {
  return (
    <main>
      <h2>Habits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HabitCardSkeleton />
        <HabitCardSkeleton />
        <HabitCardSkeleton />
        <HabitCardSkeleton />
      </div>
    </main>
  );
}
