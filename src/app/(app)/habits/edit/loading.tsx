import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <main>
      <h2>Edit Habits</h2>
      <div className="animate-pulse opacity-50">
        <div className="py-4 flex justify-between items-center">
          <div>
            <Badge variant={"secondary"} className="mb-2">
              {"Active"}
            </Badge>
            <div className="px-1">
              <h3 className="bg-slate-100 w-20 h-10">Habit</h3>
              <p className="bg-slate-100 w-full h-10"></p>
            </div>
          </div>
          <Button variant={"default"}>Edit</Button>
        </div>
        <Separator />
      </div>
    </main>
  );
}
