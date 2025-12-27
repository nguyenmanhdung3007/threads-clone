import { Button } from "../ui/button";

function FooterAuth() {
  return (
    <div className="absolute bottom-0 w-full ">
      <footer className="h-17.5 w-full px-4 flex items-center absolute justify-center bottom-0 text-center">
        <ul className="flex items-center mx-auto">
          <li className="font-normal text-xs text-text-secondary">© 2025</li>
          <li>
            <Button
              variant="link"
              className="font-normal text-xs text-text-secondary cursor-pointer"
            >
              Threads Terms
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="font-normal text-xs text-text-secondary cursor-pointer"
            >
              Privacy Policy
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="font-normal text-xs text-text-secondary cursor-pointer"
            >
              Cookies Policy
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="font-normal text-xs text-text-secondary cursor-pointer"
            >
              Cookie Settings
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="font-normal text-xs text-text-secondary cursor-pointer"
            >
              Report a problem
            </Button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default FooterAuth;
