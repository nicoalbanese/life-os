import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/auth/utils";
import Link from "next/link";

export default async function UserSettingsDropdown() {
  const { session } = await getSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {session?.user.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem> */}
          {/*   <User className="mr-2 h-4 w-4" /> */}
          {/*   <span>Profile</span> */}
          {/*   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          {/* </DropdownMenuItem> */}
          {/* <DropdownMenuItem> */}
          {/*   <CreditCard className="mr-2 h-4 w-4" /> */}
          {/*   <span>Billing</span> */}
          {/*   <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          {/* </DropdownMenuItem> */}
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem> */}
          {/*   <PlusCircle className="mr-2 h-4 w-4" /> */}
          {/*   <span>New Team</span> */}
          {/* </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/api/auth/signout" className="cursor-pointer">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
