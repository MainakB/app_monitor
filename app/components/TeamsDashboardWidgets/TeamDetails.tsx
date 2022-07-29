import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { StackedAreaChart, TrendLineChart } from "~/components/Charts";
import { FONT_COLORS } from "~/data/constants";

interface IMiniTeamDetailsWidgetProps {
  teamName: string;
}

export const TeamDetails = (props: IMiniTeamDetailsWidgetProps) => {
  return (
    <StyledWrapperBox>
      <StyledBoxContentWrapper>
        <StyledTitle>LAST 7 DAYS TEAM TREND - {props.teamName}</StyledTitle>
        <TrendLineChart />
      </StyledBoxContentWrapper>
      <Divider orientation="vertical" flexItem />
      <StyledBoxContentWrapper>
        <StyledTitle>Trends Jobs and Pipelines</StyledTitle>
        <StackedAreaChart />
      </StyledBoxContentWrapper>
    </StyledWrapperBox>
  );
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
