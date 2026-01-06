import { ROUTES } from "@/configs";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

const TABS = [
  { to: ROUTES.HOME, label: "For you", key: "for-you" },
  { to: ROUTES.FOLLOWING, label: "Following", key: "following" },
  { to: ROUTES.GHOST, label: "Ghost posts", key: "ghost" },
];

function FeedNavTabs() {
  return (
    <div className="right-0 fixed top-0 flex justify-center items-center w-full gap-12 h-15 font-semibold">
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            cn("", isActive ? "font-semibold text-black" : "text-gray-400")
          }>
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default FeedNavTabs;
