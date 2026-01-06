import { ROUTES } from "@/configs";
import { useFeedPath } from "@/hooks/useFeedPath";
import { FeedNavDropdown, FeedNavTabs } from ".";

function FeedNav() {
  const feed = useFeedPath();

  if (feed === ROUTES.FOLLOWING) {
    return <FeedNavDropdown />;
  }

  return <FeedNavTabs />;
}

export default FeedNav;
