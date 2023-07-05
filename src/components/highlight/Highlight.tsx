import { Highlight } from "@/lib/db/schema";
import HighlightDisplay from "./HighlightDisplay";
import HighlightSet from "./HighlightSet";

export default function Highlight({
  highlight,
}: {
  highlight: Highlight | null;
}) {
  return (
    <main className="border-b border-t my-4 py-4 border-secondary select-none">
      <h3>Today&apos;s Highlight</h3>
      {highlight !== null ? (
        <HighlightDisplay highlight={highlight} />
      ) : (
        <HighlightSet />
      )}
    </main>
  );
}
