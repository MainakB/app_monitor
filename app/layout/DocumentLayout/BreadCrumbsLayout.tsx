import type { ReactNode } from "react";
import React from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GenericBreadcrumbs } from "~/components/Breadcrumbs";
import { DateRangeText } from "~/components/Time";
import { FONT_COLORS } from "~/data/constants/colors";

interface IBreadCrumbsLayoutProps extends React.HTMLAttributes<Element> {
  title?: string;
  crumbs: string[];
  setCrumbs: Function;
  children: ReactNode;
}
export const BreadCrumbsLayout = (props: IBreadCrumbsLayoutProps) => {
  // const openDateClickHandler = (
  //   event: React.MouseEvent<Element, MouseEvent>
  // ) => {};
  return (
    <StyledWrapperBox>
      {props.title ? (
        <StyledPageTitleBox>{props.title}</StyledPageTitleBox>
      ) : null}
      <StyledGenericBreadcrumbsWrapper>
        <GenericBreadcrumbs
          crumbs={props.crumbs}
          setCrumbs={props.setCrumbs}
          shouldNavigate={true}
        />
        {props.crumbs.length === 2 ? (
          <StyledDateRangeFilter>
            <StyledRangeWrapper>
              <DateRangeText />
            </StyledRangeWrapper>
          </StyledDateRangeFilter>
        ) : null}
      </StyledGenericBreadcrumbsWrapper>

      {props.children}
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  "-webkit-box-shadow": "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  padding: "20px",
  margin: "20px",
  flex: 4,
}));

const StyledPageTitleBox = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  marginBottom: "15px",
}));

const StyledGenericBreadcrumbsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
}));

const StyledDateRangeFilter = styled(Box)(({ theme }) => ({
  padding: "10px",
  fontSize: "0.8125rem",
}));

const StyledRangeWrapper = styled(Box)(({ theme }) => ({
  fontSize: "0.8125rem",
}));

const StyledDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.8125rem",
  cursor: "pointer",
  color: theme.palette.primary.light,
  "&:hover": {
    opacity: "75%",

    transition: "all 0.5s step-start",
  },
  "&:active": {
    opacity: "40%",
    transition: "all 0.5s step-start",
  },
})) as typeof Typography;
