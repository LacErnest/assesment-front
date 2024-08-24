import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const [menus, setMenus] = useState();
  const [refresh, setRefresh] = useState(false);


  return (
    <AppContext.Provider
      value={{
        menus,
        setMenus,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
