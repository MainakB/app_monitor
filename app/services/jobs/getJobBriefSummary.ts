import { BASE_URL, JOBS_BRIEF_SUMMARY_ENDPOINT } from "~/data/constants";

export type ITenantTrend = {
  tenant_name: string;
  created_timestamp: string;
  success_rate: number;
  count: number;
};

export type IJobBriefSummary = {
  job_tenant_trend: ITenantTrend[];
  // avg_duration: number;
  // current_fail_count: number;
  // category_count: {
  //   pipeline_count: number;
  //   non_pipeline_count: number;
  // };
  // sub_category_count: {
  //   ui_jobs: number;
  //   api_jobs: number;
  // };
  // growth: [
  //   {
  //     weekday: number;
  //     success_rate: number;
  //     Change: number;
  //     "@last_entry := success_rate": number;
  //   }
  // ];
  // team_jobs: ITeamJobs[];
};

export type IJobBriefSummaryProps = {
  job_name: string;
};

export async function getJobBriefSummary(props: IJobBriefSummaryProps) {
  console.log("req props", props);
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
    `${BASE_URL}${JOBS_BRIEF_SUMMARY_ENDPOINT}`,
    requestOptions
  );

  const jobOverview: IJobBriefSummary = await response.json();
  return jobOverview;
}
