import { ROUTES } from "@/configs";
import { useLocation } from "react-router";

export function useFeedPath() {
  const { pathname } = useLocation();

  if (pathname === ROUTES.FOLLOWING) return "/following";
  if (pathname === ROUTES.GHOST) return "/ghost";

  return "for-you";
}
