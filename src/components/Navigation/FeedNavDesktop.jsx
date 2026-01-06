import { PAGE_TITLE, ROUTES } from "@/configs";
import NavigationWrapper from "./NavigationWrapper";

function FeedNavHomeDesktop() {
  const FEED_ROUTES = [
    { path: ROUTES.HOME, title: PAGE_TITLE.HOME },
    { path: ROUTES.FOLLOWING, title: PAGE_TITLE.FOLLOWING },
    { path: ROUTES.GHOST, title: PAGE_TITLE.GHOST },
  ];

  return (
    <div>
      {FEED_ROUTES.map((route) => {
        return <NavigationWrapper>{}</NavigationWrapper>;
      })}
    </div>
  );
}

export default FeedNavHomeDesktop();
