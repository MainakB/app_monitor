import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { StackedAreaChart } from "~/components/Charts";

interface IMiniTeamDetailsWidgetProps {
  widget: {
    teamName: string;
    name: string;
    jobsCount: number;
    pipelineCount: number;
    testCount: number;
  };
}

export const TeamDetails = (props: IMiniTeamDetailsWidgetProps) => {
  return (
    <StyledWrapperBox>
      <StyledBoxContentWrapper>
        <StyledTitle>Trends Test Cases</StyledTitle>
        <StackedAreaChart />
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
}));

const StyledTitle = styled(Typography)((props) => ({
  alignSelf: "center",
  fontWeight: 600,
  margin: "10px",
  fontSize: "14px",
  color: "#999",
}));
