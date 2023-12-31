import CreateHabitModal from "@/components/habits/CreateHabitModal";
import EditHabitListItem from "@/components/habits/EditHabitListItem";
import { getHabits } from "@/lib/api/habits";

export const revalidate = 5;
export default async function EditHabits() {
  const habits = await getHabits();
  return (
    <main>
      <div className="flex justify-between">
        <h2>Edit Habits</h2>
        <CreateHabitModal />
      </div>
      {habits.map((habit) => (
        <EditHabitListItem key={habit.id} habit={habit} />
      ))}
    </main>
  );
}
