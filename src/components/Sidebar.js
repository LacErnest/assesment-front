import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GoSidebarCollapse } from "react-icons/go";
import { useAppContext } from "../context/UseAppContext";

function Sidebar({selectedMenu, setSelectedMenu}) {
  const [hideSidebar, setHideSidebar] = useState(false);
  const {menus} = useAppContext()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setHideSidebar(false);
      } else {
        setHideSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <GoSidebarCollapse
        className={"open-sidebar " + (!hideSidebar ? "d-none" : "d-block")}
        onClick={() => setHideSidebar(false)}
      />

      <div
        className={"sidebar " + (hideSidebar ? "d-none" : "d-block")}
      >
        <div className="logo-content">
          <h2>CLOIT</h2>
          <TbLayoutSidebarLeftCollapse
            className="icon"
            onClick={() => setHideSidebar(true)}
          />
        </div>
        <ul>
          {menus?.hierarchy_tree[0].children?.filter((item)=>item.depth===1).map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              setActiveMenu={setSelectedMenu}
              activeMenu={selectedMenu}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
