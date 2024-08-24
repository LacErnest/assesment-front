import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MenuTreeView from "./components/MenuTreeView";
import Form from "./components/Form";
import Header from "./components/Header";
import "./App.css";
import { AppContextProvider } from "./context/AppContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [expandAll, setExpandAll] = useState(true);
  const [collapseAll, setCollapseAll] = useState(false);

  const handleExpandAll = () => {
    setExpandAll(true);
    setCollapseAll(false);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
    setCollapseAll(true);
  };

  return (
    <AppContextProvider>
      <div className="app-container">
        <Sidebar
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
        />
        <div className="main-content">
          <Header
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            expandAll={expandAll}
            collapseAll={collapseAll}
          />
          <div className="tree-container">
            <MenuTreeView
              setHoveredItem={setHoveredItem}
              selectedMenu={selectedMenu}
              expandAll={expandAll}
              collapseAll={collapseAll}
              hoveredItem={hoveredItem}
            />
            {hoveredItem && <Form item={hoveredItem} />}
          </div>
        </div>
      </div>
      <ToastContainer />
    </AppContextProvider>
  );
}

export default App;
