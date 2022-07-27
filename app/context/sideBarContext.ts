import React from "react";

export const SideBarContext = React.createContext({
  sideBarIndex: 0,
  setSideBarIndex: (value: number) => {},
});
