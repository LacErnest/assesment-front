import React, { useState } from 'react';

function MenuTree({ item, setHoveredItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleToggle} className="menu-item">
      {item.children && item.children.length > 0 && (
          <span>{isOpen ? '▼' : '▶︎'}</span>
        )} {item.name}
       
      </div>
      {isOpen && item.children && (
        <ul className="submenu-tree">
          {item.children.map((child, index) => (
            <MenuTree key={index} item={child} setHoveredItem={setHoveredItem} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuTree;
