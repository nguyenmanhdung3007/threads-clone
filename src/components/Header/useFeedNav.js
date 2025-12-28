import { useState } from "react";

export function useFeedNav() {
  const [active, setActive] = useState("for-you");

  return {
    active,
    setActive,
  };
}
