// NavDropdown.jsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const TABS = [
  { id: "for-you", label: "For you" },
  { id: "following", label: "Following" },
  { id: "ghost", label: "Ghost posts" },
];

export function NavDropdown({ active, onChange }) {
  const current = TABS.find((t) => t.id === active);

  return (
    <div className="hidden sm:flex lg:hidden justify-center py-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 font-semibold">
          {current.label}
          <span className="text-xs">▾</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          {TABS.map((tab) => (
            <DropdownMenuItem
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex justify-between"
            >
              {tab.label}
              {tab.id === active && "✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
