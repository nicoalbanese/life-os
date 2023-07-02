import { getHabits } from "@/lib/api/habits";

export default async function EditHabits() {
  const habits = await getHabits();
  return (
    <main>
      <h2>Edit Habits</h2>
      <pre>{JSON.stringify(habits, null, 2)}</pre>
    </main>
  );
}
