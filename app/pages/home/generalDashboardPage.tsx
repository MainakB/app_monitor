import React from "react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import {
  GeneralDashboardWidgetsLayout,
  GeneralDashboardChartsLayout,
} from "~/layout/DashboardLayouts";
import { TeamsSatusTable } from "~/components/HomeDashboardWidgets";

const data = {
  miniwidgets: [
    {
      name: "Teams",
      count: "54",
      footerText: "Show all teams",
      change: 2,
      changeType: "number",
      // footerIcon: GroupsOutlinedIcon,
    },
    {
      name: "All Jobs",
      count: "54",
      footerText: "Show all pipelines",
      change: 20,
      changeType: "number",
      // footerIcon: InsightsOutlinedIcon,
    },
    {
      name: "Code Coverage",
      count: "80%",
      footerText: "Show all jobs",
      change: 25,
      changeType: "percent",
      // footerIcon: CodeOffOutlinedIcon,
    },
    {
      name: "Test Status",
      count: "70%",
      footerText: "View details",
      change: -25,
      changeType: "percent",
      // footerIcon: EngineeringOutlinedIcon,
    },
  ],
  chartWidgets: [
    {
      name: "Teams",
      count: 54,
      footerText: "Show all teams",

      // footerIcon: GroupsOutlinedIcon,
    },
    {
      name: "Jobs Trends",
      count: 54,
      footerText: "Show all pipelines",

      // footerIcon: InsightsOutlinedIcon,
    },
  ],
};
export const GeneralDashboardPage = () => {
  return (
    <StyledDashboardWrapper>
      <GeneralDashboardWidgetsLayout data={data.miniwidgets} />
      <GeneralDashboardChartsLayout data={data.chartWidgets} />
      <TeamsSatusTable />
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
