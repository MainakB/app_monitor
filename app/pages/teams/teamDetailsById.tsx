import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BriefSummaryWidget } from "~/components/TeamsDashboardWidgets";
import { FONT_COLORS } from "~/data/constants/colors";
import type { TeamBriefSummary } from "~/services/teams";
import { GenricNoLegendsTrendsLineChart } from "~/components/Charts";
import { JobsTableByTeam } from "./jobsTableByTeam";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";
interface ITeamDetailsByIdProps extends React.HTMLAttributes<Element> {
  teamName: string;
  summaryWidgetData: TeamBriefSummary | null;
}
export const TeamDetailsById = ({
  teamName,
  summaryWidgetData,
}: ITeamDetailsByIdProps) => {
  return (
    <>
      <StyledDashboardWrapper>
        <StyledMiniWidgetWrapperBox>
          <BriefSummaryWidget summaryWidgetData={summaryWidgetData} />
        </StyledMiniWidgetWrapperBox>
        <StyledMiniWidgetWrapperBox customFlex={2}>
          <StyledBoxContentWrapper>
            <StyledTitle>SUCCESS RATE CHANGE TREND</StyledTitle>
            <GenricNoLegendsTrendsLineChart
              data={summaryWidgetData?.growth || null}
              dataKeyXAxes="weekday"
              dataKeyYAxes="Change"
              formatterUnit="%"
              domainValue={[-100, 100]}
            />
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
      </StyledDashboardWrapper>
      <StyledDashboardWrapper>
        <StyledMiniWidgetWrapperBox customFlex={2}>
          <StyledBoxContentWrapper>
            <StyledTitleTable>TEAM JOBS</StyledTitleTable>
            <JobsTableByTeam tableData={summaryWidgetData?.team_jobs || null} />
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
      </StyledDashboardWrapper>
    </>
  );
};

const StyledDashboardWrapper = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // flex: 6,
  // padding: "20px",
  // gap: "20px",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    flexDirection: "row",
    flex: 6,
    justifyContent: "space-evenly",
    // width: "1vw",
  },
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: "red",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: "10px 10px 10px 20px",
}));

const StyledMiniWidgetWrapperBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customFlex",
})<{ customFlex?: number }>(({ theme, customFlex }) => ({
  display: "flex",
  justifyContent: "space-around",
  flex: customFlex ? customFlex : 1,
  padding: "5px",
  boxShadow: GLOBALBOXSHADOW,
  borderRadius: "10px",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  alignSelf: "center",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledTitleTable = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  paddingBottom: "10px",
  // alignSelf: "center",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));
