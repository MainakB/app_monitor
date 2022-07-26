import React from "react";

export const TeamContext = React.createContext({
  expanded: {} as any,
  setExpandedForTeam: (team: string) => {},
});
