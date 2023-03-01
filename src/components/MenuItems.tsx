import Dropdown from './Dropdown';

import { useState, useEffect, useRef } from "react";
// ...
const MenuItems = ({ items, setLink }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
     if (dropdown && ref.current) {
      setDropdown(false);
     }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     // Cleanup the event listener
     document.removeEventListener("mousedown", handler);
     document.removeEventListener("touchstart", handler);
    };
   }, [dropdown]);

  return (
   <li className="menu-items" ref={ref}>
      <button
       // ...
       aria-expanded={dropdown ? "true" : "false"}
       onClick={() => setDropdown((prev) => !prev)}
      >
       {items.title}{" "}
      </button>
      <Dropdown 
       submenus={items.submenu}
       dropdown={dropdown} 
       setLink={setLink}
      ></Dropdown>        
   </li>
  );
 };

export default MenuItems;