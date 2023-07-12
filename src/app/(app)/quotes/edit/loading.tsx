import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <main>
      <h2>Edit Quotes</h2>
      <div className="animate-pulse opacity-50">
        <div className="py-4 flex justify-between items-center">
          <div>
            <Badge variant={"secondary"} className="mb-2">
              {"Active"}
            </Badge>
            <div className="px-1">
              <h3 className="">Habit</h3>
              <p className=""></p>
            </div>
          </div>
          <Button variant={"default"}>Edit</Button>
        </div>
        <Separator />
      </div>
    </main>
  );
}
