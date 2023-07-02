import Link from "next/link";
import { Button } from "./ui/button";
import NavLink from "./NavLink";
import UserSettingsDropdown from "./UserSettingsDropdown";

export default function NavBar() {
  return (
    <nav className="flex justify-between mb-6 pb-2 border-b border-secondary">
      <ul className="flex gap-5">
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
      <UserSettingsDropdown />
    </nav>
  );
}
