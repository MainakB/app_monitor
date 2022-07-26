import * as React from "react";

import { SideBarContext } from "~/context";
import { GeneralDashboardPage } from "~/pages/home";
import { TeamsDashboard } from "~/pages/teams";
import { JobsDashboard } from "~/pages/jobs";

const getView = (value: number) => {
  switch (value) {
    case 0:
      return <GeneralDashboardPage />;
    case 1:
      return <TeamsDashboard />;
    case 2:
      return <JobsDashboard />;
    default:
      return <div>Hello</div>;
  }
};
export const LandingPage = () => {
  const state = React.useContext(SideBarContext);
  return getView(state.sideBarIndex);
};
