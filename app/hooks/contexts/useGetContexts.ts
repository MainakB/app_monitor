import * as React from "react";
import { TeamContext } from "~/context/index.delete";
import { TEAMS_LANDING_CONTEXT_KEY } from "~/data/constants";

const getContextValue = (stateContext: string) => {
  switch (stateContext) {
    case TEAMS_LANDING_CONTEXT_KEY:
      return TeamContext;
    default:
      return TeamContext;
  }
};

export const useGetContext = (stateContext: string) => {
  return React.useContext(getContextValue(stateContext));
};
