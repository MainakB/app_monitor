import * as React from "react";

import { SideBarContext } from "~/context";
import { GeneralDashboardPage } from "~/pages/home";
import { TeamsDashboard } from "~/pages/teams";
import { JobsDashboard } from "~/pages/jobs";
import {
  LANDING_PAGE_JOBS_TABLE_TITLE,
  LANDING_PAGE_TEAMS_TABLE_TITLE,
} from "~/data";

const getView = (value: number) => {
  switch (value) {
    case 0:
      return <GeneralDashboardPage />;
    case 1:
      return <TeamsDashboard title={LANDING_PAGE_TEAMS_TABLE_TITLE} />;
    case 2:
      return <JobsDashboard title={LANDING_PAGE_JOBS_TABLE_TITLE} />;
    default:
      return <div>Hello</div>;
  }
};
export const LandingPage = () => {
  const state = React.useContext(SideBarContext);
  return getView(state.sideBarIndex);
};
