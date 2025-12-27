import { Heart, House, Plus, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { ROUTES } from "@/configs";

const items = [
  {
    path: ROUTES.HOME,
    title: House,
  },
  {
    path: ROUTES.SEARCH,
    title: Search,
  },
  {
    path: ROUTES.ACTIVITY,
    title: Plus,
  },
  {
    path: ROUTES.FOLLOWING,
    title: Heart,
  },
  {
    path: ROUTES.PROFILE,
    title: UserRound,
  },
];

function NavMobileFooter() {
  return (
    <nav className="fixed bottom-0 h-12.5 w-full items-center bg-white/85 min-[700px]:hidden">
      <ul className="flex h-12.5 items-center justify-around">
        {items.map((item, index) => {
          const Component = item.title;
          return (
            <li
              key={index}
              className="m-1 flex h-10 w-full items-center justify-center rounded-lg text-gray-400"
            >
              {Component === Plus ? (
                <Button className="m-1 h-10 w-full cursor-pointer rounded-lg bg-navigation-hover-background hover:text-primary hover:bg-navigation-hover-background text-gray-400">
                  <Component className="size-8" />
                </Button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-center h-full w-full text-black transition-all duration-500 ease-out hover:bg-navigation-hover-background rounded-lg"
                      : "flex items-center justify-center h-full w-full transition-all duration-500 ease-out hover:bg-navigation-hover-background rounded-lg"
                  }
                >
                  <Component />
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMobileFooter;
