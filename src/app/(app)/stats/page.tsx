import DateCard from "@/components/dates/DateCard";
import ActiveStreaksTable from "@/components/streaks/ActiveStreaksTable";
import { Button } from "@/components/ui/button";
import { getDates } from "@/lib/api/dates";
import { getTopStreaks } from "@/lib/api/streaks";
import Link from "next/link";

export default async function Stats() {
  const habitsWithStreaks = await getTopStreaks();
  const { dates } = await getDates();
  return (
    <main>
      <h1>Stats</h1>
      <section className="border-t border-b border-secondary my-4 py-4">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="">Dates</h3>
          <Link href="/dates/edit">
            <Button variant={"outline"}>Edit</Button>
          </Link>
        </div>
        {dates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {" "}
            {dates.map((date) => (
              <DateCard date={date} key={date.id} />
            ))}
          </div>
        ) : (
          <div>No dates</div>
        )}
      </section>
      <section className="border-t border-b border-secondary my-4 py-4">
        {/* Consider changing this to longest streaks */}
        <h3 className="mb-2">🔥 Active Streaks 🔥</h3>
        {habitsWithStreaks.length > 0 ? (
          <ActiveStreaksTable habitsWithStreaks={habitsWithStreaks} />
        ) : (
          <div>No active streaks!</div>
        )}
      </section>
    </main>
  );
}
