import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BriefSummaryWidget } from "~/components/TeamsDashboardWidgets";
import { FONT_COLORS } from "~/data/constants/colors";
import type { IJobBriefSummary, ITenantTrend } from "~/services/jobs";
import { GenricNoLegendsTrendsLineChart } from "~/components/Charts";
import { JobTenantTrendsLineChart } from "~/components/JobsDashboardWidgets";

interface IJobDetailsByIdProps extends React.HTMLAttributes<Element> {
  jobName: string;
  summaryWidgetData: IJobBriefSummary | null;
}
export const JobDetailsById = ({
  jobName,
  summaryWidgetData,
}: IJobDetailsByIdProps) => {
  const dataToUse = summaryWidgetData?.job_tenant_trend.reduce(
    (acc: any, val: ITenantTrend) => {
      acc.tenants.add(val.tenant_name);
      acc.data = {
        ...acc.data,
        [val.created_timestamp]: {
          ...(acc.data[val.created_timestamp]
            ? {
                ...acc.data[val.created_timestamp],
                [val.tenant_name]: val.success_rate,
                [`${val.tenant_name}-count`]: val.count,
              }
            : {
                created_timestamp: val.created_timestamp,
                [val.tenant_name]: val.success_rate,
                [`${val.tenant_name}-count`]: val.count,
              }),
        },
      };
      return acc;
    },
    {
      tenants: new Set<string>(),
      data: {},
    }
  );

  // const getData = (job_tenant_trend: ITenantTrend[]) =>
  //     job_tenant_trend.map((val: ITenantTrend) => val.tenant_name);

  return (
    <>
      <StyledDashboardWrapper>
        {/* <StyledMiniWidgetWrapperBox>
          <BriefSummaryWidget summaryWidgetData={summaryWidgetData} />
        </StyledMiniWidgetWrapperBox> */}
        <StyledMiniWidgetWrapperBox customFlex={2}>
          <StyledBoxContentWrapper>
            <StyledTitle>ENVIRONMENT RUN TREND</StyledTitle>
            <JobTenantTrendsLineChart
              data={Object.values(dataToUse.data)}
              legendsList={Array.from(dataToUse.tenants)}
              dataKeyXAxes="created_timestamp"
              formatterUnit="%"
            />
            {/* data={dataValue?.teamTrendsOvw}
            legendsList={getLegendsList()}
            dataKeyXAxes="created_date"
            formatterUnit="%" */}
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
      </StyledDashboardWrapper>
      <StyledDashboardWrapper>
        <StyledMiniWidgetWrapperBox customFlex={2}>
          <StyledBoxContentWrapper>
            <StyledTitleTable>
              PLACEHOLDER FOR TEST RELATED DATA
            </StyledTitleTable>
            {/* <JobsTableByTeam tableData={summaryWidgetData?.team_jobs || null} /> */}
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
      </StyledDashboardWrapper>
    </>
  );
};

const StyledDashboardWrapper = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "column",
  // flex: 6,
  // padding: "20px",
  // gap: "20px",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    padding: "20px",
    gap: "20px",
    flexDirection: "row",
    flex: 6,
    justifyContent: "space-evenly",
    // width: "1vw",
  },
}));

const StyledBoxContentWrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: "red",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: "10px 10px 10px 20px",
}));

const StyledMiniWidgetWrapperBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customFlex",
})<{ customFlex?: number }>(({ theme, customFlex }) => ({
  display: "flex",
  justifyContent: "space-around",
  flex: customFlex ? customFlex : 1,
  padding: "5px",
  "-webkit-box-shadow": "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  borderRadius: "10px",
  // height: "100%",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  alignSelf: "center",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledTitleTable = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "18px",
  paddingBottom: "10px",
  // alignSelf: "center",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));
