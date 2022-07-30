import { Link } from "@remix-run/react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FONT_COLORS } from "~/data/constants/colors";

interface IMiniWidgetProps {
  widget: {
    name: string;
    count: string | number;
    footerText: string;
    pathName: string;
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
        <StyledFooterText component={Link} to={`${widget.pathName}`}>
          {widget.footerText}
        </StyledFooterText>
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
  justifyContent: "space-around",
  flex: 1,
  padding: "5px",
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

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledCounter = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightLight,
  fontSize: "60px",
}));

const StyledFooterText = styled(Typography)(({ theme }) => ({
  width: "max-content",
  fontSize: "14px",
  padding: "5px",
  textDecoration: "none",
  color: theme.palette.text.primary,
  opacity: "80%",
  "&:hover": {
    opacity: "100%",
    paddingBottom: "0px",
    borderBottom: "1px solid gray",
  },
  // borderBottom: "1px solid gray",
}));

const StyledPercentage = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: theme.typography.fontWeightBold,
  "&.positive": {
    color: theme.palette.success.main,
  },
  "&.negative": {
    color: theme.palette.error.main,
  },
}));
