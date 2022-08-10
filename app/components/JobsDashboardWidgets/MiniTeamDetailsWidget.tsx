import type { ReactNode } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FONT_COLORS } from "~/data/constants/colors";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";

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
      <Box>
        <StyledTitle>{widget.name}</StyledTitle>
        <StyledCounter>Job Count: {widget.jobsCount}</StyledCounter>
        <StyledCounter>Pipeline Count: {widget.pipelineCount}</StyledCounter>
        <StyledCounter>Test Count: {widget.testCount}</StyledCounter>
      </Box>
    </StyledMiniWidgetWrapperBox>
  );
};

const StyledMiniWidgetWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  flex: 1,
  padding: "5px",
  boxShadow: GLOBALBOXSHADOW,
  borderRadius: "10px",
  height: "100%",
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
