import CreateHabitModal from "@/components/habits/CreateHabitModal";
import HabitCard from "@/components/habits/HabitCard";
import { Button } from "@/components/ui/button";
import { getQuotes } from "@/lib/api/quotes";
import Link from "next/link";

export const revalidate = 5;

export default async function Quotes() {
  const { quotes } = await getQuotes();

  return (
    <main>
      {/* <pre>{JSON.stringify(habits, null, 2)}</pre> */}
      <div className="flex justify-between mb-4">
        <h1>Quotes</h1>
        <Link href="/quotes/edit">
          <Button variant={"outline"} size="sm">
            Edit
          </Button>
        </Link>
      </div>
      <div>
        {quotes.length > 0 ? (
          <div className="grid gap-3">
            {quotes.map((quote) => {
              return (
                <div key={quote.id} className="p-4 bg-slate-50">
                  <p>{quote.quote}</p>
                  <p className="italic mt-2"> - {quote.author}</p>
                </div>
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
