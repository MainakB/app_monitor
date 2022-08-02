import { ReactNode } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FONT_COLORS } from "~/data/constants/colors";
import type { TeamBriefSummary } from "~/services/teams";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface IBriefSummaryWidgetProps extends React.HTMLAttributes<Element> {
  summaryWidgetData: TeamBriefSummary | null;
}

// total_count: number;
// category_count: {
//   pipeline_count: number;
//   non_pipeline_count: number;
// };
// sub_category_count: {
//   ui_jobs: number;
//   api_jobs: number;
// };

export const BriefSummaryWidget = ({
  summaryWidgetData,
}: IBriefSummaryWidgetProps) => {
  const getContentText = (title: string, content: string | number) => {
    return (
      <StyledTypography component="div">
        {title}
        <StyledNestedBox>{content}</StyledNestedBox>
      </StyledTypography>
    );
  };

  if (!summaryWidgetData) {
    return <Typography>No data found</Typography>;
  }

  const {
    avg_duration,
    category_count,
    growth,
    sub_category_count,
    current_fail_count,
  } = summaryWidgetData;
  const { pipeline_count, non_pipeline_count } = category_count;

  const getAvgDuration = (value: number) => {
    return `${value > 59 ? Math.ceil(value / 60) : value} ${
      value > 59 ? "minutes" : "seconds"
    }`;
  };

  return (
    <>
      <StyledBoxContentWrapper>
        <StyledTitle>SUMMARY</StyledTitle>
        <StyledContentWrapper>
          <>
            {getContentText("Total Pipeline Jobs :", pipeline_count || 0)}
            {getContentText(
              "Total Non Pipeline Jobs :",
              non_pipeline_count || 0
            )}
            {getContentText(
              "Avg.Build Duration:",
              getAvgDuration(avg_duration || 0)
            )}
            {getContentText("Count of failing jobs :", current_fail_count || 0)}
          </>
        </StyledContentWrapper>
      </StyledBoxContentWrapper>
      <StyledBoxContentWrapper>
        <StyledPercentage
          className={growth[0].success_rate < 0 ? "negative" : "positive"}
        >
          {growth[0].success_rate < 0 ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
          {growth[0].success_rate}%
        </StyledPercentage>
        {/* {widget.footerIcon} */}
      </StyledBoxContentWrapper>
    </>
  );
};

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: "red",
  // display: "flex",
  // flex: 1,
  // flexDirection: "column",
  // justifyContent: "space-evenly",
  padding: "10px 10px 10px 10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: "auto",
}));

const StyledContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "10px",
  justifyContent: "space-between",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  padding: "10px 10px 10px 0px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: "5px ",
  fontWeight: theme.typography.fontWeightMedium,
  opacity: "80%",
})) as typeof Typography;

const StyledNestedBox = styled(Box)(({ theme }) => ({
  paddingLeft: "5px",
  opacity: "100%",
  fontWeight: theme.typography.fontWeightRegular,
  display: "inline",
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
