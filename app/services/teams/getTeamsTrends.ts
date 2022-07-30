import type { QueryFunctionContext } from "@tanstack/react-query";
import {
  BASE_URL,
  TEAMS_TRENDS_ENDPOINT,
  TEAMS_TENANT_SUMMARY_ENDPOINT,
} from "~/data/constants";

export type TeamsTrendsOverview = {
  team_name: string;
  created_date: string;
  pipeline_success_rate: string;
  non_pipeline_success_rate: string;
  pipeline_failure_rate: string;
  non_pipeline_failure_rate: string;
};

export type TeamsTenantsSummary = {
  team_name: string;
  tenant_name: string;
  pipeline_success_rate: string;
  non_pipeline_success_rate: string;
  pipeline_count: string;
  non_pipeline_count: string;
};

type ITeamsDashOvrvwSummaryCharts = {
  teamTrendsOvw: TeamsTrendsOverview[];
  teamTenantsSumry: TeamsTenantsSummary[];
};

interface GetTeamsTrendsOverviewPayload {
  team: string;
  start_date: Date;
  end_date: Date;
}

export async function getTeamsTrendsOverview(
  props: QueryFunctionContext<(string | GetTeamsTrendsOverviewPayload)[], any>
): Promise<ITeamsDashOvrvwSummaryCharts> {
  const data = props.queryKey[1];
  console.log("test trends call DATA", JSON.stringify(data));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await Promise.all([
    fetch(`${BASE_URL}${TEAMS_TRENDS_ENDPOINT}`, requestOptions),
    fetch(`${BASE_URL}${TEAMS_TENANT_SUMMARY_ENDPOINT}`, requestOptions),
  ]);

  //   const teamsTenantsSummary: TeamsTenantsSummary[] = await response.json();
  //: TeamsTrendsOverview[]
  const [teamsTrendsOverview, teamsTenantsSummary] = await Promise.all([
    response[0].json(),
    response[1].json(),
  ]);
  console.log(
    "test trends call done",
    teamsTrendsOverview,
    teamsTenantsSummary
  );
  return {
    teamTrendsOvw: teamsTrendsOverview,
    teamTenantsSumry: teamsTenantsSummary,
  };
}
