import ActiveStreaksTable from "@/components/streaks/ActiveStreaksTable";
import { getTopStreaks } from "@/lib/api/streaks";

export default async function Stats() {
  const habitsWithStreaks = await getTopStreaks();
  return (
    <main>
      <h1>Stats</h1>
      <section className="border-t border-b border-secondary my-4 py-4"></section>
      <section className="border-t border-b border-secondary my-4 py-4">
        {/* Consider changing this to longest streaks */}
        <h3 className="mb-2">🔥 Top Streaks 🔥</h3>
        {habitsWithStreaks != null ? (
          <ActiveStreaksTable habitsWithStreaks={habitsWithStreaks} />
        ) : (
          <div>No active streaks!</div>
        )}
      </section>
    </main>
  );
}
