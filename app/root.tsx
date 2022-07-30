import React from "react";
import type { MetaFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { FONT_COLORS } from "~/data/constants/colors";
import { TeamContext } from "~/context";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Varis | Papyrus",
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
  typography: {
    fontWeightMedium: 550,
  },
  palette: {
    text: {
      primary: FONT_COLORS.PRIMARY_TEXT,
      secondary: FONT_COLORS.SECONDARY_TEXT,
      disabled: FONT_COLORS.INACTIVES_DISABLED_PRIMARY,
    },
    divider: FONT_COLORS.BORDERS_SEPERATORS,
    // headers: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
    // labels: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
    // placeholders: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
    // borders: FONT_COLORS.BORDERS_SEPERATORS,
    // seperators: FONT_COLORS.BORDERS_SEPERATORS,
    // background: {
    //   paper: FONT_COLORS.DOCUMENT_BODY,
    //   default: FONT_COLORS.DOCUMENT_BODY,
    // },
  },
});

const queryClient = new QueryClient();

export default function App() {
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

  const initTeamsState = {
    expanded: {} as any,
    setExpandedForTeam: setExpandedForTeam,
  };

  const [isExpandedState, setIsExpandedState] = React.useState(initTeamsState);

  React.useEffect(() => {}, [isExpandedState]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <DocumentLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TeamContext.Provider value={isExpandedState}>
              <NavMenuLayout>
                <Outlet />
              </NavMenuLayout>
            </TeamContext.Provider>
          </LocalizationProvider>
        </DocumentLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
