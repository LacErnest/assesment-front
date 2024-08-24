import React, { useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useAppContext } from "../context/UseAppContext";
import { getMenus } from "../Api";

function Header({
  onExpandAll,
  onCollapseAll,
  selectedMenu,
  setSelectedMenu,
  expandAll,
  collapseAll,
}) {
  const { menus, setMenus, refresh } = useAppContext();

  useEffect(() => {
    getMenus().then((res) => {
      if (res && res.status === 200) {
        setMenus(res.data);
        setSelectedMenu(res.data?.data.results[0].id);
      }
    });
  }, [refresh]);

  return (
    <div className="header">
      <h6 className="breakdump">
        <FaFolder /> / Menus
      </h6>
      <h2>
        <span className="header-icon">
          <IoGrid />
        </span>{" "}
        Menus
      </h2>
      <div className="form-group mt-20">
        <label>Menu</label>
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="menu-select"
        >
          {menus?.data?.results?.map((option) => (
            <option key={option.value} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="header-buttons">
        <button onClick={onExpandAll} className={expandAll ? "active" : ""}>
          Expand All
        </button>
        <button onClick={onCollapseAll} className={collapseAll ? "active" : ""}>
          Collapse All
        </button>
      </div>
    </div>
  );
}

export default Header;
