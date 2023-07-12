import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/utils";
import Link from "next/link";

export default async function Home() {
  const { session } = await getSession();
  return (
    <main>
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
