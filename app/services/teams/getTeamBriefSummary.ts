import { BASE_URL, TEAMS_BRIEF_SUMMARY_ENDPOINT } from "~/data/constants";

export type ITeamJobs = {
  job_name: string;
  is_pipeline: number;
  build_result: string;
  build_duration: number;
  branch_name: string;
  tenant_name: string;
};

export type TeamBriefSummary = {
  avg_duration: number;
  current_fail_count: number;
  category_count: {
    pipeline_count: number;
    non_pipeline_count: number;
  };
  sub_category_count: {
    ui_jobs: number;
    api_jobs: number;
  };
  growth: [
    {
      weekday: number;
      success_rate: number;
      Change: number;
      "@last_entry := success_rate": number;
    }
  ];
  team_jobs: ITeamJobs[];
};

export type ITeamBriefSummaryProps = {
  team: string;
};

export async function getTeamBriefSummary(props: ITeamBriefSummaryProps) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };
  //   const response = await Promise.all([
  //     fetch(`${BASE_URL}${TEAMS_BRIEF_SUMMARY_ENDPOINT}`, requestOptions),
  //     fetch(`${BASE_URL}${TEAMS_TENANT_SUMMARY_ENDPOINT}`, requestOptions),
  //   ]);

  const response = await fetch(
    `${BASE_URL}${TEAMS_BRIEF_SUMMARY_ENDPOINT}`,
    requestOptions
  );

  const teamsOverview: TeamBriefSummary = await response.json();
  console.log("test call done", teamsOverview);
  return teamsOverview;
}
