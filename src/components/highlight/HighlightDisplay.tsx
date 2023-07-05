import { Highlight } from "@/lib/db/schema";
import { Button } from "../ui/button";

export default function HighlightDisplay({
  highlight,
}: {
  highlight: Highlight;
}) {
  return (
    <div className="p-4 bg-slate-100 flex justify-between items-center my-4 rounded-lg">
      <p className="">{highlight.content}</p>
      <Button>Complete</Button>
    </div>
  );
}
