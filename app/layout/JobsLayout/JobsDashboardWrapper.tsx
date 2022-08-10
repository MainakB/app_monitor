import type { ReactNode } from "react";
import React from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GenericBreadcrumbs } from "~/components/Breadcrumbs";
import { DateRangeText } from "~/components/Time";
import { FONT_COLORS } from "~/data/constants/colors";
import { JOB_DETAILS_TIME_RANGE_HANDLER_PATH } from "~/data/constants/redirections";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";

interface IJobsDashboardWrapperProps extends React.HTMLAttributes<Element> {
  title?: string;
  crumbs: string[];
  setCrumbs: Function;
  children: ReactNode;
  startDate?: string;
  endDate?: string;
}
export const JobsDashboardWrapper = (props: IJobsDashboardWrapperProps) => {
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
        {props.crumbs.length === 2 && props.startDate && props.endDate ? (
          <StyledDateRangeFilter>
            <StyledRangeWrapper>
              <DateRangeText
                startDate={props.startDate}
                endDate={props.endDate}
                redirectPath={JOB_DETAILS_TIME_RANGE_HANDLER_PATH}
              />
            </StyledRangeWrapper>
          </StyledDateRangeFilter>
        ) : null}
      </StyledGenericBreadcrumbsWrapper>

      {props.children}
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  boxShadow: GLOBALBOXSHADOW,
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
