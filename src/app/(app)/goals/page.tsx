import { getHighlight } from "@/lib/api/highlights";
import Highlight from "@/components/highlight/Highlight";

export default async function Goals() {
  const { highlight } = await getHighlight();
  return (
    <section>
      <h1>Goals</h1>
      <Highlight highlight={highlight} />
    </section>
  );
}
