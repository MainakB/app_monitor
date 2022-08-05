import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BriefSummaryWidget } from "~/components/TeamsDashboardWidgets";
import { FONT_COLORS } from "~/data/constants/colors";
import type { IJobBriefSummary, ITenantTrend } from "~/services/jobs";
import { GenricNoLegendsTrendsLineChart } from "~/components/Charts";
import { JobTenantTrendsLineChart } from "~/components/JobsDashboardWidgets";

import { AllJobsTestAnalyticsPie } from "./pieChart";
import { JobTestsTrendsLineChart } from "./jobTestsTrendsLineChart";

const getJobsummaryMock = () => {
  let result = [];
  let tenantsList = ["qa", "dev", "preprod", "prod"];
  let tool = ["TEST PROJECT", "POSTMAN"];
  //   let tenantsList = Array(5)
  //     .fill(0)
  //     .map((val, idx) => `demoenv${[idx]}`);

  for (let j = 0; j < tool.length; j++) {
    let day = 0;
    let month = 1;
    let year = 2022;
    let oldVal = 0;

    for (let i = 0; i < 5; i++) {
      day = 1 + (day < 27 ? day : 0);
      month = day === 27 ? month + 1 : month;
      year = month > 12 ? year + 1 : year;
      month = month > 12 ? 1 : month;

      result.push({
        tenant_name: tool[j],
        created_timestamp: `${year}-${month}-${day}`,
        success_rate: Math.ceil(Math.random() * (100 - 9) + 9),
        count: Math.ceil(Math.random() * (40 - 9) + 9),
      });
    }
  }
  return result;
};

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

  const mockDataToUse = getJobsummaryMock().reduce(
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

  let mockData = [
    { name: "TEST PROJECT", value: 40, count: 200, fill: "#8884d8" },
    { name: "POSTMAN", value: 30, count: 50, fill: "#119a58" },
  ];

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
        <StyledMiniWidgetWrapperBox customFlex={1}>
          <StyledBoxContentWrapper>
            <StyledTitleTable>TEST CASES TYPE</StyledTitleTable>
            <AllJobsTestAnalyticsPie data={mockData} />
          </StyledBoxContentWrapper>
        </StyledMiniWidgetWrapperBox>
        <StyledMiniWidgetWrapperBox customFlex={2}>
          <StyledBoxContentWrapper>
            <StyledTitleTable>TEST TOOL RUN TREND</StyledTitleTable>
            <JobTestsTrendsLineChart
              data={Object.values(mockDataToUse.data)}
              legendsList={Array.from(mockDataToUse.tenants)}
              dataKeyXAxes="created_timestamp"
              formatterUnit="%"
            />
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
  display: "flex",
  justifyContent: "space-around",
  // alignSelf: "center",
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));
