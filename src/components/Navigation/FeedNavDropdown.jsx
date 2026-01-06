import { NavLink } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const ITEMS = [
  { to: "/", label: "For you" },
  { to: "/following", label: "Following" },
  { to: "/ghost", label: "Ghost posts" },
];

export default function FeedNavDropdown() {
  return (
    <div className="fixed top-0 flex justify-center items-center w-full gap-12 h-15 font-semibold">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 font-semibold">
          Following <span className="text-xs">▾</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          {ITEMS.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full justify-between",
                    isActive && "font-semibold"
                  )
                }>
                {item.label}
                {item.to === "/following" && "✓"}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
