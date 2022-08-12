import { Link } from "@remix-run/react";
import { styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { FONT_COLORS } from "~/data/constants/colors";
import { BoxWidgetsLayout } from "~/layout/WidgetsLayout";
import { WidgetAddToCartFetcher } from "~/components/Fetchers";
interface IMiniWidgetProps {
  widget: {
    name: string;
    count: string | number;
    footerText: string;
    pathName: string;
    change: number;
    changeType: string;
    startDate: string;
    endDate: string;
  };
  pdfDwldCart: any;
}

export const MiniChartWidget = ({ widget, pdfDwldCart }: IMiniWidgetProps) => {
  return (
    <BoxWidgetsLayout id={widget.name.split(" ").join("_")}>
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
        <StyledFooterIcon>
          <WidgetAddToCartFetcher
            startDate={widget.startDate}
            endDate={widget.endDate}
            pdfDwldCart={pdfDwldCart}
            widgetId={widget.name.split(" ").join("_")}
            widgetName={widget.name}
            widgetType="chart_square_mini"
          >
            {Object.keys(pdfDwldCart).includes(
              widget.name.split(" ").join("_")
            ) ? (
              <StyledAddTaskOutlinedIcon />
            ) : (
              <AddCircleOutlineOutlinedIcon />
            )}
          </WidgetAddToCartFetcher>
        </StyledFooterIcon>
        {/* {widget.footerIcon} */}
      </StyledBoxContentWrapper>
    </BoxWidgetsLayout>
  );
};

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
    transition: "all 0.5s step-start",
  },
})) as typeof Typography;

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

const StyledFooterIcon = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  color: FONT_COLORS.PRIMARY_TEXT,
  opacity: "80%",
  cursor: "pointer",
  transition: "all 0.5s step-start",
  "&:hover": {
    opacity: "60%",
  },
  "&:active": {
    opacity: "30%",
  },
}));

const StyledAddTaskOutlinedIcon = styled(AddTaskOutlinedIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));
