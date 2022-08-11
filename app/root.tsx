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
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { reportDwldCartCookie } from "~/services/cookies";
import { DocumentLayout } from "~/layout/DocumentLayout";
import { NavMenuLayout } from "~/layout/NavMenuLayout";
import { FONT_COLORS } from "~/data/constants/colors";

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
  },
});

const queryClient = new QueryClient();

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await reportDwldCartCookie.parse(cookieHeader);

  if (cookie) {
    return json(
      { pdfDwldCart: cookie.pdfDwldCart },
      {
        headers: {
          "Set-Cookie": await reportDwldCartCookie.serialize({
            pdfDwldCart: cookie.pdfDwldCart,
          }),
        },
      }
    );
  }
  const pdfDwldCart: any = {};

  return json(
    { pdfDwldCart },
    {
      headers: {
        "Set-Cookie": await reportDwldCartCookie.serialize({
          pdfDwldCart,
        }),
      },
    }
  );
};

export default function App() {
  // const setExpandedForTeam = (team?: string, value?: boolean) => {
  //   let updatedState = null;
  //   if (!team) {
  //     updatedState = {
  //       expanded: {},
  //     };
  //   } else {
  //     updatedState = {
  //       expanded: {
  //         ...isExpandedState.expanded,
  //         [team as string]: value,
  //       },
  //     };
  //   }
  //   setIsExpandedState({ ...isExpandedState, ...updatedState });
  // };

  // const initTeamsState = {
  //   expanded: {} as any,
  //   setExpandedForTeam: setExpandedForTeam,
  // };

  // const [isExpandedState, setIsExpandedState] = React.useState(initTeamsState);

  // React.useEffect(() => {}, [isExpandedState]);
  const loaderData = useLoaderData<typeof loader>();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <DocumentLayout>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NavMenuLayout pdfDwldCart={loaderData.pdfDwldCart}>
              <Outlet context={{ pdfDwldCart: loaderData.pdfDwldCart }} />
            </NavMenuLayout>
          </LocalizationProvider>
        </DocumentLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
