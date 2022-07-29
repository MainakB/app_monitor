import { BASE_URL, TEAMS_TRENDS_ENDPOINT } from "~/data/constants";

export type TeamsTrendsOverview = {
  team_name: string;
  created_date: string;
  pipeline_success_rate: string;
  non_pipeline_success_rate: string;
  pipeline_failure_rate: string;
  non_pipeline_failure_rate: string;
};

export async function getTeamsTrendsOverview() {
  console.log("test trends call");
  const response = await fetch(`${BASE_URL}${TEAMS_TRENDS_ENDPOINT}`);
  const teamsTrendsOverview: TeamsTrendsOverview[] = await response.json();
  console.log("test trends call done", teamsTrendsOverview);
  return teamsTrendsOverview;
}
