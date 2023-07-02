"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const NavLink = ({ title }: { title: String }) => {
  const pathname = usePathname();
  return (
    <li>
      <Link href={`/${title.toLowerCase()}`}>
        <Button
          variant={
            pathname.slice(1) === title.toLowerCase() ? "activeNavLink" : "link"
          }
          size="navLink"
        >
          {title}
        </Button>
      </Link>
    </li>
  );
};

export default NavLink;
