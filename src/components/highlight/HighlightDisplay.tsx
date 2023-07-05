import { Highlight } from "@/lib/db/schema";

export default function HighlightDisplay({
  highlight,
}: {
  highlight: Highlight;
}) {
  return (
    <div>
      <p className="p-4 bg-slate-100">{highlight.content}</p>
    </div>
  );
}
