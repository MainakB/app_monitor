import { BASE_URL, TEAMS_OVERVIEW_ENDPOINT } from "~/data/constants";

export type TeamsOverview = {
  team_name: string;
  total_jobs_count: string;
  pipeline_jobs_count: string;
  non_pipeline_jobs_count: string;
  pipeline_success_rate: string;
  non_pipeline_success_rate: string;
  tenants_run: string;
  avg_duration: string;
  pipeline_avg_duration: string;
  nonpipeline_avg_duration: string;
};

export async function getTeamsOverview() {
  const response = await fetch(`${BASE_URL}${TEAMS_OVERVIEW_ENDPOINT}`);
  const teamsOverview: TeamsOverview[] = await response.json();
  console.log("test call getTeamsOverview");
  return teamsOverview;
}
