/**
 * TabsContent
 * - preserve = true → giữ component mount (giữ state input)
 * - preserve = false → unmount khi inactive (tiết kiệm performance)
 */

import PropTypes from "prop-types";
import { useTabs } from "./Tabs";

export function TabsContent({
  value,
  preserve = true, // MẶC ĐỊNH giữ state
  className,
  children,
  ...props
}) {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  // Nếu không preserve và tab không active -> unmount hoàn toàn
  if (!preserve && !isActive) return null;

  return (
    <div hidden={!isActive} className={className} {...props}>
      {children}
    </div>
  );
}

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  preserve: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
