import React from "react";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { DocumentLayout } from "~/layout/DocumentLayout";
import { NavMenuLayout } from "~/layout/NavMenuLayout";

import { SideBarContext, TeamContext } from "~/context";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const setSideBarIndex = (value: number) => {
    console.log("testststst", state);
    setState({ ...state, sideBarIndex: value });
  };

  const setExpandedForTeam = (team?: string, value?: boolean) => {
    let updatedState = null;
    if (!team) {
      updatedState = {
        expanded: {},
      };
    } else {
      updatedState = {
        expanded: {
          ...isExpandedState.expanded,
          [team as string]: value,
        },
      };
    }
    setIsExpandedState({ ...isExpandedState, ...updatedState });
  };

  const initState = {
    sideBarIndex: 0,
    setSideBarIndex: setSideBarIndex,
  };

  const initTeamsState = {
    expanded: {} as any,
    setExpandedForTeam: setExpandedForTeam,
  };

  const [state, setState] = React.useState(initState);
  const [isExpandedState, setIsExpandedState] = React.useState(initTeamsState);

  React.useEffect(() => {
    console.log("effect", isExpandedState);
  }, [state, isExpandedState]);

  return (
    <DocumentLayout>
      <SideBarContext.Provider value={state}>
        <TeamContext.Provider value={isExpandedState}>
          <NavMenuLayout>
            <Outlet />
          </NavMenuLayout>
        </TeamContext.Provider>
      </SideBarContext.Provider>
    </DocumentLayout>
  );
}
