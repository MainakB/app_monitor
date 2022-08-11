// import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { styled } from "@mui/material";
import { useFetcher, useLocation } from "@remix-run/react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FONT_COLORS } from "~/data/constants/colors";
import { BoxWidgetsLayout } from "~/layout/WidgetsLayout";
import { clickHandlerAddWidgetToCart } from "~/lib";

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
  // cart: string[];
  // setCart: Function;
}

export const MiniChartWidget = ({
  widget,
  // cart,
  // setCart,
  pdfDwldCart,
}: IMiniWidgetProps) => {
  const { pathname, search } = useLocation();
  const fetcher = useFetcher();

  return (
    <BoxWidgetsLayout>
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
          <fetcher.Form method="post" action="/update-download-cart">
            <input
              hidden
              name="redirectUrl"
              value={pathname + search}
              readOnly
            />
            <input hidden name="widgetName" value={widget.name} readOnly />
            <input
              hidden
              name="widgetStartDate"
              value={widget.startDate}
              readOnly
            />
            <input
              hidden
              name="widgetEndDate"
              value={widget.endDate}
              readOnly
            />
            <input
              hidden
              name="actionType"
              value={
                Object.keys(pdfDwldCart).includes(widget.name)
                  ? "remove"
                  : "add"
              }
              readOnly
            />
            <IconButton type="submit">
              {Object.keys(pdfDwldCart).includes(widget.name) ? (
                <StyledAddTaskOutlinedIcon
                  id={widget.name}
                  // onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                  //   clickHandlerAddWidgetToCart(
                  //     cart,
                  //     widget.name,
                  //     "remove",
                  //     setCart
                  //   )
                  // }
                />
              ) : (
                <AddCircleOutlineOutlinedIcon
                  id={widget.name}
                  // onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                  //   clickHandlerAddWidgetToCart(cart, widget.name, "add", setCart)
                  // }
                />
              )}
            </IconButton>
          </fetcher.Form>
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
