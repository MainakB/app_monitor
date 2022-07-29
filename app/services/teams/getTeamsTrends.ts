import type { QueryFunctionContext } from "@tanstack/react-query";
import { BASE_URL, TEAMS_TRENDS_ENDPOINT } from "~/data/constants";

export type TeamsTrendsOverview = {
  team_name: string;
  created_date: string;
  pipeline_success_rate: string;
  non_pipeline_success_rate: string;
  pipeline_failure_rate: string;
  non_pipeline_failure_rate: string;
};

interface GetTeamsTrendsOverviewPayload {
  team: string;
  start_date: Date;
  end_date: Date;
}

export async function getTeamsTrendsOverview(
  props: QueryFunctionContext<(string | GetTeamsTrendsOverviewPayload)[], any>
) {
  const data = props.queryKey[1];
  console.log("test trends call DATA", JSON.stringify(data));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${BASE_URL}${TEAMS_TRENDS_ENDPOINT}`,
    requestOptions
  );

  const teamsTrendsOverview: TeamsTrendsOverview[] = await response.json();
  console.log("test trends call done", teamsTrendsOverview);
  return teamsTrendsOverview;
}
