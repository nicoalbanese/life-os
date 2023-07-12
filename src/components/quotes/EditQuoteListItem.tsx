import { Habit, Quote } from "@/lib/db/schema";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function EditQuoteListItem({ quote }: { quote: Quote }) {
  return (
    <>
      <div className="py-4 flex justify-between items-center">
        <div>
          <div className="px-1">
            <p>{quote.quote}</p>
            <p>- {quote.author}</p>
          </div>
        </div>
        {/* <EditHabitModal habit={habit} /> */}
      </div>
      <Separator />
    </>
  );
}
