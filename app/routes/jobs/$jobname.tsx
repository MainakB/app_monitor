import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { JobsDashboard } from "~/pages/jobs";
import type { IJobBriefSummary } from "~/services/jobs";
import { getJobBriefSummary } from "~/services/jobs";
import { decrypt } from "~/lib";

export const loader = ({ params }: any) => {
  return getJobBriefSummary({
    job_name: decrypt("jobBrief", params.jobname) as string,
  });
};

export default function JobId() {
  const { jobname } = useParams();
  const loaderData: IJobBriefSummary = useLoaderData();
  const { jobsCrumbs, setJobsCrumbs } = useOutletContext() as any;

  return (
    <JobsDashboard
      jobName={decrypt("jobBrief", jobname as string)}
      crumbs={jobsCrumbs}
      setCrumbs={setJobsCrumbs}
      summaryWidgetData={loaderData}
    />
  );
}
