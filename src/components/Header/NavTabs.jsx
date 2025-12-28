// desktop + mobile

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const TABS = [
  { id: "for-you", label: "For you" },
  { id: "following", label: "Following" },
  { id: "ghost", label: "Ghost posts" },
];

export function NavTabs({ active, onChange }) {
  return (
    <div>
      {TABS.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative py-4",
            active === tab.id
              ? "font-medium text-text-primary"
              : "text-text-secondary"
          )}
        >{tab.label}</Button>
      ))}
    </div>
  );
}
