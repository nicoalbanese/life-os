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
          {dates.map((date) => (
            <EditDate key={date.id} date={date} />
          ))}
        </div>
      ) : (
        <div>
          <p>No dates</p>
          <Button>Create</Button>
        </div>
      )}
    </main>
  );
}
