import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

function MenuItem({ item, setActiveMenu, activeMenu }) {
  const [isOpen, setIsOpen] = useState(
    item.children?.find((menu) => menu.id === activeMenu)
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (item.depth > 1) setActiveMenu(item.id);
  };

  return (
    <li className={isOpen && item.depth < 2  ? "active open " : "" + (item.id === activeMenu ? "sub-active": "")}>
      <div onClick={handleToggle} className="menu-item">
        {item.children && item.depth === 1 ? <FaFolder /> : <IoGridOutline />}{" "}
        {item.name}
      </div>
      {isOpen && item.children && item.depth < 2 && (
        <ul className="submenu">
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuItem;
