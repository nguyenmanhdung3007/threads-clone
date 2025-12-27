/**
 * TabsTrigger
 * - Khi click → đổi tab
 * - Biết được mình có active hay không
 */

import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { useTabs } from "./Tabs";
import { cn } from "@/lib/utils";

export function TabsTrigger({
  value,
  disabled = false,
  className,
  children,
  ...props
}) {
  const { activeTab, setTab } = useTabs();
  console.log(activeTab, setTab);

  console.log(value);

  // Kiểm tra active Tab
  const isActive = activeTab === value;

  return (
    <Button
      onClick={() => setTab(value)}
      className={cn(
        // style cơ bản
        "px-4 py-2 rounded-md text-sm transition-all duration-150",
        "focus:outline-none",

        // style theo trạng thái active
        isActive ? "bg-black text-white" : "text-gray-500 hover:bg-black/5",

        // nếu disabled
        disabled && "opacity-50 pointer-events-none",

        // cho phép custom từ ngoài
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
