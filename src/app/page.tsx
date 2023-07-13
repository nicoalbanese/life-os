import RefreshQuoteButton from "@/components/quotes/RefreshQuoteButton";
import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/lib/api/quotes";
import { getSession } from "@/lib/auth/utils";
import Link from "next/link";

export default async function Home() {
  const { session } = await getSession();
  const { quote } = await getRandomQuote();
  return (
    <main>
      {session?.user && quote ? (
        <div className="my-3 p-4 bg-secondary text-primary">
          <p>{quote.quote}</p>
          <p className="font-light italic"> - {quote.author}</p>
          <RefreshQuoteButton />
        </div>
      ) : null}
      <Link href="/habits">
        <Button variant="outline">Go to habits</Button>
      </Link>

      <div className="mt-4 ">
        {session?.user ? (
          <Link href="api/auth/signout">
            <Button variant="destructive">Sign out</Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant={"default"}>Sign in</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
