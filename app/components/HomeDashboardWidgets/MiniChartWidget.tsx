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
    count: string | number;
    footerText: string;
    // footerIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    //   muiName: string;
    // };
    change: number;
    changeType: string;
  };
}

export const MiniChartWidget = ({ widget }: IMiniWidgetProps) => {
  return (
    <StyledMiniWidgetWrapperBox>
      <StyledBoxContentWrapper>
        <StyledTitle>{widget.name}</StyledTitle>
        <StyledCounter>{widget.count}</StyledCounter>
        <StyledFooterText>{widget.footerText}</StyledFooterText>
      </StyledBoxContentWrapper>
      <StyledBoxContentWrapper>
        <StyledPercentage
          className={widget.change < 0 ? "negative" : "positive"}
        >
          {widget.change < 0 ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
          {widget.change}
          {widget.changeType === "percent" ? "%" : ""}
        </StyledPercentage>
        {/* {widget.footerIcon} */}
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
  height: "100%",
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledTitle = styled(Typography)((props) => ({
  fontWeight: 600,
  fontSize: "14px",
  color: "#999",
}));

const StyledCounter = styled(Typography)((props) => ({
  fontWeight: 300,
  fontSize: "28px",
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
