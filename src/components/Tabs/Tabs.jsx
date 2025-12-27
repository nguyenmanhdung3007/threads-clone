import { Children, createContext, useContext, useState } from "react";
// import { Tab } from ".";
import PropTypes from "prop-types";

/**
 * Context dùng để chia sẻ state giữa các Tab con
 * Giá trị mặc định là null để dễ detect dùng sai
 */
const TabsContext = createContext(null);

export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  ...props
}) {
  //State nội bộ cho uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue);

  // kiểm tra controlled mode
  const isControlled = value !== undefined;

  console.log(isControlled);

  // lấy giá trị tab hiện tại
  // - Controlled -> lấy từ props
  // - Uncontrolled -> lấy từ state nội bộ
  const activeTab = isControlled ? value : internalValue;

  console.log(defaultValue);
  console.log(internalValue);
  console.log(activeTab);

  const setTab = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setTab, ...props }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  children: PropTypes.node.isRequired,
};

// Custom hook: Nếu dùng TabsTrigger/ TabsContent bên ngoài <Tabs/> -> throw error rõ ràng

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used inside <Tab>");
  }

  return context;
}

// function Tabs({ children, defaultTabIndex = 0 }) {
//   const [tabIndex, setTabIndex] = useState(defaultTabIndex);

//   const tabs = Children.map(children, (child) => child);

//   const currentTab = tabs[tabIndex];
//   console.log(tabs);

//   return (
//     <div>
//       <div className="flex">
//         {tabs.map((child, index) => (
//           <Tab
//             key={index}
//             isActive={tabIndex === index}
//             title={child.props.title}
//             onClick={() => setTabIndex(index)}
//             className="px-3 py-2"
//           />
//         ))}
//       </div>
//       <div>{currentTab.props.children}</div>
//     </div>
//   );
// }

// export default Tabs;
