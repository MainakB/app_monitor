import type { ReactNode } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IMiniWidgetProps {
  widget: {
    name: string;
    jobsCount: number;
    pipelineCount: number;
    testCount: number;
  };
}

export const MiniTeamDetailsWidget = ({ widget }: IMiniWidgetProps) => {
  return (
    <StyledMiniWidgetWrapperBox>
      <StyledBoxContentWrapper>
        <StyledTitle>{widget.name}</StyledTitle>
        <StyledCounter>Job Count: {widget.jobsCount}</StyledCounter>
        <StyledCounter>Pipeline Count: {widget.pipelineCount}</StyledCounter>
        <StyledCounter>Test Count: {widget.testCount}</StyledCounter>
      </StyledBoxContentWrapper>
    </StyledMiniWidgetWrapperBox>
  );
};

const StyledMiniWidgetWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  flex: 1,
  padding: "10px",
  // -webkit-box-shadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  borderRadius: "10px",
  height: "90%",
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
}));

const StyledTitle = styled(Typography)((props) => ({
  fontWeight: 600,
  fontSize: "14px",
  color: "#999",
}));

const StyledCounter = styled(Typography)((props) => ({
  fontWeight: 300,
  fontSize: "14px",
}));

const StyledFooterText = styled(Typography)((props) => ({
  width: "max-conten",
  fontSize: "12px",
  borderBottom: "1px solid gray",
}));

const StyledPercentage = styled(Box)((props) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  "&.positive": {
    color: "green",
  },
  "&.negative": {
    color: "red",
  },
}));
