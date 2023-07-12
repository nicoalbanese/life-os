import EditHabitListItem from "@/components/habits/EditHabitListItem";
import CreateQuoteModal from "@/components/quotes/CreateQuoteModal";
import { getHabits } from "@/lib/api/habits";

export const revalidate = 5;
export default async function EditHabits() {
  const habits = await getHabits();
  return (
    <main>
      <div className="flex justify-between">
        <h2>Edit Quotes</h2>
        <CreateQuoteModal />
      </div>
      {habits.map((habit) => (
        <EditHabitListItem key={habit.id} habit={habit} />
      ))}
    </main>
  );
}
