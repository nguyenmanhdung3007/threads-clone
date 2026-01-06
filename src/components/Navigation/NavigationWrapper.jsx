import { href, Link } from "react-router";

const NavigationWrapper = ({
  href,
  children,
  onColumnNavigate,
  numberOfColumn = 1,
  className,
}) => {
  if (numberOfColumn === 1) {
    return (
      <Link to={href} className="">
        {children}
      </Link>
    );
  }

  const handleClick = () => {
    e.preventDefault();
    if (typeof onColumnNavigate === "function") {
      onColumnNavigate(href);
    }
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default NavigationWrapper;
