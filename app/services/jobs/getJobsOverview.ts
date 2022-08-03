import { BASE_URL, JOBS_DASH_LIST_OVW } from "~/data/constants";

export type JobsOverview = {
  job_name: string;
  is_pipeline: string;
  team_name: string;
  job_owner: string;
  last_build_result: string;
  last_build_url: string;
  embeddable_url: string;
  last_build_timestamp: number;
};

export async function getJobsOverview() {
  const response = await fetch(`${BASE_URL}${JOBS_DASH_LIST_OVW}`);
  const jobsOverview: JobsOverview[] = await response.json();
  return jobsOverview;
}
