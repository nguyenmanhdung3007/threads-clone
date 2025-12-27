import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

// Layout cho các TabsTrigger
export function TabsList({ className, children, ...props }) {
  return (
    <div className={cn("flex gap-1", className)} {...props}>
      {children}
    </div>
  );
}

TabsList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
