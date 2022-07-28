import * as React from "react";
import type { TeamsOverview } from "~/services/teams";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import {
  GeneralDashboardWidgetsLayout,
  GeneralDashboardChartsLayout,
} from "~/layout/DashboardLayouts";
import { TeamsSatusTable } from "~/components/HomeDashboardWidgets";
import { useFetchLandingTeamOverviewTable } from "~/hooks";
import { Spinner } from "../spinner";

const configdata = {
  miniwidgets: [
    {
      name: "Teams",
      count: "54",
      footerText: "Show all teams",
      change: 2,
      changeType: "number",
      pathName: "/teams",
      // footerIcon: GroupsOutlinedIcon,
    },
    {
      name: "All Jobs",
      count: "54",
      footerText: "Show all pipelines",
      change: 20,
      changeType: "number",
      pathName: "/jobs",
      // footerIcon: InsightsOutlinedIcon,
    },
    {
      name: "Code Coverage",
      count: "80%",
      footerText: "Show all jobs",
      change: 25,
      changeType: "percent",
      pathName: "/jobs",
      // footerIcon: CodeOffOutlinedIcon,
    },
    {
      name: "Test Status",
      count: "70%",
      footerText: "View details",
      change: -25,
      changeType: "percent",
      pathName: "/jobs",
      // footerIcon: EngineeringOutlinedIcon,
    },
  ],
  chartWidgets: [
    {
      name: "Teams",
      count: 54,
      footerText: "Show all teams",
      pathName: "/teams",

      // footerIcon: GroupsOutlinedIcon,
    },
    {
      name: "Jobs Trends",
      count: 54,
      footerText: "Show all pipelines",
      pathName: "/jobs",

      // footerIcon: InsightsOutlinedIcon,
    },
  ],
};

// getTeamsOverview

export const GeneralDashboardPage = () => {
  const [teamOverviewData, setTeamOverviewData] = React.useState<
    TeamsOverview[] | null
  >(null);

  const { isLoading, isError, error } = useFetchLandingTeamOverviewTable({
    setData: setTeamOverviewData,
  });

  return isLoading ? (
    <Spinner show={isLoading} />
  ) : (
    <StyledDashboardWrapper>
      <GeneralDashboardWidgetsLayout data={configdata.miniwidgets} />
      <GeneralDashboardChartsLayout data={configdata.chartWidgets} />
      <TeamsSatusTable data={teamOverviewData} />
    </StyledDashboardWrapper>
  );
};

const StyledDashboardWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "20px",
  width: "1vw",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    flex: 6,
    flexDirection: "column",
  },
}));
