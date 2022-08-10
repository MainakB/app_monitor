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
import { LANDING_PAGE_TEAMS_TABLE_TITLE, LANDING_PAGE_DASHBOARD } from "~/data";
import { DateRangeText } from "~/components/Time";
import { Spinner } from "../spinner";
import { OVERVIEW_TIME_RANGE_HANDLER_PATH } from "~/data/constants/redirections";

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
  startDate: string;
  endDate: string;
}

export const GeneralDashboardPage = ({
  tableData,
  aggReportData,
  startDate,
  endDate,
}: IGeneralDashboardPageProps) => {
  return tableData === undefined ? (
    <Spinner show={tableData === undefined} />
  ) : (
    <StyledDashboardWrapper>
      <StyledGenericTitleDateRangeWrapper>
        <StyledTableBox>{LANDING_PAGE_DASHBOARD}</StyledTableBox>
        <StyledDateRangeFilter>
          <StyledRangeWrapper>
            <DateRangeText
              startDate={startDate}
              endDate={endDate}
              redirectPath={OVERVIEW_TIME_RANGE_HANDLER_PATH}
            />
          </StyledRangeWrapper>
        </StyledDateRangeFilter>
      </StyledGenericTitleDateRangeWrapper>
      <GeneralDashboardWidgetsLayout data={configdata.miniwidgets} />
      <GeneralDashboardChartsLayout data={configdata.chartWidgets} />
      <StyleTabWrapper>
        <StyledTableBox>{LANDING_PAGE_TEAMS_TABLE_TITLE}</StyledTableBox>

        <TabsPanel
          data={aggReportData}
          startDate={startDate}
          endDate={endDate}
        />
      </StyleTabWrapper>
      {/* <div>{startDate}</div>
      <div>{endDate}</div> */}
      {/* <TeamsStatusTable data={tableData} /> */}
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
  fontSize: "24px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  padding: "15px 10px 10px 10px",
  // marginBottom: "15px",
}));

const StyleTabWrapper = styled(Box)(({ theme }) => ({
  paddingTop: "45px",
}));

const StyledGenericTitleDateRangeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 15px 0px 15px",
}));

const StyledDateRangeFilter = styled(Box)(({ theme }) => ({
  padding: "10px",
  fontSize: "0.8125rem",
}));

const StyledRangeWrapper = styled(Box)(({ theme }) => ({
  fontSize: "0.8125rem",
}));
