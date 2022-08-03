import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  SideStackedBar,
  GenricNoLegendsTrendsLineChart,
} from "~/components/Charts";
import { useFetchJobsTrendsLandingPage } from "~/hooks/jobs";
import { FONT_COLORS } from "~/data/constants/colors";
import type {
  // TeamsTrendsOverview,
  // TeamsTenantsSummary,
  IJobsTrendsOverview,
  IJobsTenantsSummary,
} from "~/services/jobs";
import { Spinner } from "~/pages/spinner";
// getJobsTrends
interface IMiniJobDetailsWidgetProps {
  jobName: string;
  startDate: Date;
  endDate: Date;
}

type IJobsDashOvrvwSummaryCharts = {
  jobTrendsOvw: IJobsTrendsOverview[] | null;
  jobsTenantsSumry: IJobsTenantsSummary[] | null;
};

export const JobDetails = (props: IMiniJobDetailsWidgetProps) => {
  const [jobsTrendsData, setJobsTrendsData] =
    React.useState<IJobsDashOvrvwSummaryCharts>({
      jobTrendsOvw: null,
      jobsTenantsSumry: null,
    });

  const { isLoading, isError, error } = useFetchJobsTrendsLandingPage({
    setJobsTrendsData,
    payload: {
      job_name: props.jobName,
      start_date: props.startDate,
      end_date: props.endDate,
    },
  });

  const getView = (
    isLoading: boolean,
    props: IMiniJobDetailsWidgetProps,
    dataValue: typeof jobsTrendsData
  ) => {
    return isLoading ? (
      <Spinner show={isLoading} backdropInvisible={false} />
    ) : (
      <StyledWrapperBox>
        <StyledBoxContentWrapper>
          <StyledTitle>JOB TREND</StyledTitle>
          <GenricNoLegendsTrendsLineChart
            data={dataValue?.jobTrendsOvw}
            dataKeyXAxes="created_date"
            dataKeyYAxes="success_rate"
            domainValue={[0, 100]}
            formatterUnit="%"
          />
        </StyledBoxContentWrapper>
        <Divider sx={{ margin: "3px" }} orientation="vertical" flexItem />
        <StyledBoxContentWrapper>
          <StyledTitle>TENANTS RUN SUMMARY</StyledTitle>
          {/* <SideStackedBar
            data={dataValue?.jobsTenantsSumry}
            legendsList={getLegendsList()}
            dataKeyXAxes="tenant_name"
            formatterUnit="%"
          /> */}
        </StyledBoxContentWrapper>
      </StyledWrapperBox>
    );
  };

  return getView(isLoading, props, jobsTrendsData);
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // flex: 6,
  // padding: "20px",
  // gap: "20px",
  boxShadow: "1px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    // padding: "20px",
    // gap: "20px",
    flexDirection: "row",
    flex: 6,
    justifyContent: "space-evenly",
    // width: "1vw",
  },
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: FONT_COLORS.DOCUMENT_BODY_SECONDARY_LIGHT,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  fontWeight: theme.typography.fontWeightMedium,
  margin: "10px",
  fontSize: "14px",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));
