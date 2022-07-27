import React from "react";
import type { MetaFunction } from "@remix-run/node";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { Outlet } from "@remix-run/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// or for Day.js
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// or for Luxon
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
// or for Moment.js
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DocumentLayout } from "~/layout/DocumentLayout";
import { NavMenuLayout } from "~/layout/NavMenuLayout";

import { SideBarContext, TeamContext } from "~/context";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const theme = createTheme({
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
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
    <ThemeProvider theme={theme}>
      <DocumentLayout>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SideBarContext.Provider value={state}>
            <TeamContext.Provider value={isExpandedState}>
              <NavMenuLayout>
                <Outlet />
              </NavMenuLayout>
            </TeamContext.Provider>
          </SideBarContext.Provider>
        </LocalizationProvider>
      </DocumentLayout>
    </ThemeProvider>
  );
}
