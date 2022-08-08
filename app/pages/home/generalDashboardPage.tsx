import * as React from "react";
import type { TeamsOverview } from "~/services/teams";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { TabsPanel } from "./tabsPanel";
import { FONT_COLORS } from "~/data/constants/colors";
import {
  GeneralDashboardWidgetsLayout,
  GeneralDashboardChartsLayout,
} from "~/layout/DashboardLayouts";
import { TeamsStatusTable } from "~/components/HomeDashboardWidgets";
import { LANDING_PAGE_TEAMS_TABLE_TITLE } from "~/data";

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

interface IGeneralDashboardPageProps {
  tableData: TeamsOverview[];
  aggReportData: any;
}

export const GeneralDashboardPage = ({
  tableData,
  aggReportData,
}: IGeneralDashboardPageProps) => {
  return tableData === undefined ? (
    <Spinner show={tableData === undefined} />
  ) : (
    <StyledDashboardWrapper>
      <GeneralDashboardWidgetsLayout data={configdata.miniwidgets} />
      <GeneralDashboardChartsLayout data={configdata.chartWidgets} />
      <StyleTabWrapper>
        <StyledTableBox>{LANDING_PAGE_TEAMS_TABLE_TITLE}</StyledTableBox>
        <TabsPanel data={aggReportData} />
      </StyleTabWrapper>

      {/* <TeamsStatusTable data={tableData} />*/}
      <TeamsStatusTable data={tableData} />
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
const StyledTableBox = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  marginBottom: "15px",
}));

const StyleTabWrapper = styled(Box)(({ theme }) => ({
  paddingTop: "45px",
}));
