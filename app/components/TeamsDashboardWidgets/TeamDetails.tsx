import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { SideStackedBar, TrendLineChart } from "~/components/Charts";
import { useFetchTeamsTrendsLandingPage } from "~/hooks/teams";
import { FONT_COLORS } from "~/data/constants/colors";
import type {
  TeamsTrendsOverview,
  TeamsTenantsSummary,
} from "~/services/teams";
import { Spinner } from "~/pages/spinner";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";

interface IMiniTeamDetailsWidgetProps {
  teamName: string;
  startDate: Date;
  endDate: Date;
}

type ITeamsDashOvrvwSummaryCharts = {
  teamTrendsOvw: TeamsTrendsOverview[] | null;
  teamTenantsSumry: TeamsTenantsSummary[] | null;
};

export const TeamDetails = (props: IMiniTeamDetailsWidgetProps) => {
  const [teamsTrendsData, setTeamsTrendsData] =
    React.useState<ITeamsDashOvrvwSummaryCharts>({
      teamTrendsOvw: null,
      teamTenantsSumry: null,
    });

  const { isLoading, isError, error } = useFetchTeamsTrendsLandingPage({
    setTeamsTrendsData,
    payload: {
      team: props.teamName,
      start_date: props.startDate,
      end_date: props.endDate,
    },
  });

  const getLegendsList = () => {
    return {
      pipeline_success_rate: "Pipeline",
      non_pipeline_success_rate: "Non Pipeline",
    };
  };

  const getView = (
    isLoading: boolean,
    props: IMiniTeamDetailsWidgetProps,
    dataValue: typeof teamsTrendsData
  ) => {
    return isLoading ? (
      <Spinner show={isLoading} backdropInvisible={false} />
    ) : (
      <StyledWrapperBox>
        <StyledBoxContentWrapper>
          <StyledTitle>TEAM TREND</StyledTitle>
          <TrendLineChart
            data={dataValue?.teamTrendsOvw}
            legendsList={getLegendsList()}
            dataKeyXAxes="created_date"
            formatterUnit="%"
          />
        </StyledBoxContentWrapper>
        <Divider sx={{ margin: "3px" }} orientation="vertical" flexItem />
        <StyledBoxContentWrapper>
          <StyledTitle>TENANTS RUN SUMMARY</StyledTitle>
          <SideStackedBar
            data={dataValue?.teamTenantsSumry}
            legendsList={getLegendsList()}
            dataKeyXAxes="tenant_name"
            formatterUnit="%"
          />
        </StyledBoxContentWrapper>
      </StyledWrapperBox>
    );
  };

  return getView(isLoading, props, teamsTrendsData);
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // flex: 6,
  // padding: "20px",
  // gap: "20px",
  boxShadow: GLOBALBOXSHADOW,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    // padding: "20px",
    // gap: "20px",
    flexDirection: "row",
    flex: 6,
    justifyContent: "space-evenly",
    // width: "1vw",
  },
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: FONT_COLORS.DOCUMENT_BODY_SECONDARY_LIGHT,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  fontWeight: theme.typography.fontWeightMedium,
  margin: "10px",
  fontSize: "14px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));
