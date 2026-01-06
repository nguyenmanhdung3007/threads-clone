import { Button } from "@/components/ui/button";
import { ROUTES } from "@/configs";
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background-tertiary">
      <div className="max-w-90 flex flex-col items-center">
        <h3 className="text-base text-center font-bold ">
          Not all who wander are lost, but this page is
        </h3>
        <span className="px-10 mt-3 font-normal text-text-secondary text-center">
          The link's not working or the page is gone. Go back to keep exploring.
        </span>
        <div className="mt-4">
          <Link to={ROUTES.HOME}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
