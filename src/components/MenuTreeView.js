import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { deleteMenu, getOneMenu } from "../Api";
import { useAppContext } from "../context/UseAppContext";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import swal from "sweetalert";
import { toast } from "react-toastify";

function MenuTreeView({
  setHoveredItem,
  hoveredItem,
  selectedMenu,
  expandAll,
  collapseAll,
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const { menus, refresh, setRefresh } = useAppContext();
  const [data, setData] = useState(menus?.hierarchy_tree || []);

  useEffect(() => {
    if (expandAll) {
      setExpandedItems((prevItems) => {
        const expanded = {};
        Object.keys(prevItems).forEach((key) => {
          expanded[key] = true;
        });
        return expanded;
      });
    }
  }, [expandAll]);

  useEffect(() => {
    if (collapseAll) {
      setExpandedItems((prevItems) => {
        const collapsed = {};
        Object.keys(prevItems).forEach((key) => {
          collapsed[key] = false;
        });
        return collapsed;
      });
    }
  }, [collapseAll]);

  useEffect(() => {
    if (selectedMenu) {
      getOneMenu(selectedMenu).then((res) => {
        if (res && res.status === 200) setData(res.data.hierarchy_tree);
      });
    }
  }, [selectedMenu, refresh]);

  const toggleExpand = (item) => {
    setExpandedItems((prevItems) => ({
      ...prevItems,
      [item]: !prevItems[item],
    }));
  };
  const handleDelete = (item) => {
    swal({
      title: "",
      text:
        "Do you really want to delete " +
        item.name +
        " menu ? It would delete all existing children recursively.",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMenu(item.id)
          .then((res) => {
            if (res && res.status === 204) {
              swal("", "Menu deleted !", "success");
              setRefresh(!refresh);
            } else toast.error("Error: " + res.data?.name);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    });
  };

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.id}>
        <summary
          onMouseEnter={() => setHoveredItem(item)}
          onClick={() => toggleExpand(item.id)}
          className={
            item.children && expandedItems[item.id] ? "summary-text" : ""
          }
        >
          {item.children?.length > 0 &&
          (expandedItems[item.id] || expandAll) ? (
            <FaChevronDown className="icon" />
          ) : (
            <FaChevronRight className="icon" />
          )}{" "}
          {item.name}{" "}
          {hoveredItem?.id === item.id && (
            <>
              <IoIosAddCircle
                className="add-icon"
                onClick={() => setHoveredItem({ ...item, isAdd: true })}
              />
              <IoIosCloseCircle
                className="close-icon"
                onClick={() => handleDelete(item)}
              />
            </>
          )}
        </summary>
        {item.children?.length > 0 && (expandedItems[item.id] || expandAll) && (
          <ul className="submenu">{renderMenuItems(item.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div className="menu-tree-view">
      <ul className="tree">{renderMenuItems(data)}</ul>
    </div>
  );
}

export default MenuTreeView;
