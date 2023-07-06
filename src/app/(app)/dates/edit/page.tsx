import CreateDateButton from "@/components/dates/CreateDateButton";
import EditDate from "@/components/dates/EditDate";
import { Button } from "@/components/ui/button";
import { getDates } from "@/lib/api/dates";

export default async function Dates() {
  const { dates } = await getDates();

  return (
    <main>
      <h3>Edit Dates</h3>
      {dates.length > 0 ? (
        <div>
          <div>
            {dates.map((date) => (
              <EditDate key={date.id} date={date} />
            ))}
          </div>
          <CreateDateButton />
        </div>
      ) : (
        <div className="mt-4 bg-slate-100 p-4 rounded-md h-32 flex items-center flex-col justify-center">
          <p className="mb-2">No dates yet</p>
          <CreateDateButton />
        </div>
      )}
    </main>
  );
}
