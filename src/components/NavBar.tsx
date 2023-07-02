import Link from "next/link";
import { Button } from "./ui/button";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-5 mb-2 pb-2 border-b border-secondary">
        <li>
          <Link href={`/`}>
            <Button variant={"link"} size="navLink">
              Home
            </Button>
          </Link>
        </li>
        <NavLink title="Habits" />
        <NavLink title="Goals" />
        <NavLink title="Stats" />
      </ul>
    </nav>
  );
}
