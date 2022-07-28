import type { ReactNode } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FONT_COLORS } from "~/data/constants";

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
  justifyContent: "space-around",
  flex: 1,
  padding: "5px",
  // -webkit-box-shadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  borderRadius: "10px",
  height: "100%",
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledCounter = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightLight,
  fontSize: "60px",
}));
