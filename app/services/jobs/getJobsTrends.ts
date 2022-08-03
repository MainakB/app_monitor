import type { QueryFunctionContext } from "@tanstack/react-query";
import {
  BASE_URL,
  JOBS_TRENDS_ENDPOINT,
  JOBS_TENANT_SUMMARY_ENDPOINT,
} from "~/data/constants";

export type IJobsTrendsOverview = {
  job_name: string;
  created_date: string;
  success_rate: string;
};

export type IJobsTenantsSummary = {
  tenant_name: string;
  success_rate: string;
  count: number;
};

type ITeamsDashOvrvwSummaryCharts = {
  jobTrendsOvw: IJobsTrendsOverview[];
  jobTenantsSumry: IJobsTenantsSummary[];
};

interface IGetJobsTrendsOverviewPayload {
  job_name: string;
  start_date: Date;
  end_date: Date;
}

export async function getJobsTrendsOverview(
  props: QueryFunctionContext<(string | IGetJobsTrendsOverviewPayload)[], any>
): Promise<ITeamsDashOvrvwSummaryCharts> {
  const data = props.queryKey[1];
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await Promise.all([
    fetch(`${BASE_URL}${JOBS_TRENDS_ENDPOINT}`, requestOptions),
    fetch(`${BASE_URL}${JOBS_TENANT_SUMMARY_ENDPOINT}`, requestOptions),
  ]);

  const [jobsTrendsOverview, jobsTenantsSummary] = await Promise.all([
    response[0].json(),
    response[1].json(),
  ]);

  return {
    jobTrendsOvw: jobsTrendsOverview,
    jobTenantsSumry: jobsTenantsSummary,
  };
}
