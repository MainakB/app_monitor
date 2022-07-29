import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { StackedAreaChart, TrendLineChart } from "~/components/Charts";
import { useFetchTeamsTrendsLandingPage } from "~/hooks/teams";
import { FONT_COLORS } from "~/data/constants";
import type { TeamsTrendsOverview } from "~/services/teams";
import { Spinner } from "~/pages/spinner";

interface IMiniTeamDetailsWidgetProps {
  teamName: string;
  startDate: Date;
  endDate: Date;
}

export const TeamDetails = (props: IMiniTeamDetailsWidgetProps) => {
  const [teamsTrendsData, setTeamsTrendsData] = React.useState<
    TeamsTrendsOverview[] | null
  >(null);

  const { isLoading, isError, error } = useFetchTeamsTrendsLandingPage({
    setTeamsTrendsData,
    payload: {
      team: props.teamName,
      start_date: props.startDate,
      end_date: props.endDate,
    },
  });

  const getLegendsList = (dataValue: typeof teamsTrendsData) => {
    return ["pipeline_success_rate", "non_pipeline_success_rate"];
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
          <StyledTitle>LAST 7 DAYS TEAM TREND - {props.teamName}</StyledTitle>
          <TrendLineChart
            data={dataValue}
            legendsList={getLegendsList(dataValue)}
          />
        </StyledBoxContentWrapper>
        <Divider orientation="vertical" flexItem />
        <StyledBoxContentWrapper>
          <StyledTitle>Trends Jobs and Pipelines</StyledTitle>
          <StackedAreaChart />
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
