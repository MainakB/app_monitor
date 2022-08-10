import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { JobsDashboard } from "~/pages/jobs";
import { getJobBriefSummary } from "~/services/jobs";
import { decrypt } from "~/lib";
import { jobIdDetailsCookie } from "~/services/cookies";
import { getDefaultDate } from "~/lib";

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await jobIdDetailsCookie.parse(cookieHeader);

  if (cookie) {
    return json({
      data: await getJobBriefSummary({
        job_name: decrypt("jobBrief", params.jobname as string) as string,
        start_time: cookie.startDate,
        end_time: cookie.endDate,
      }),
      startDate: cookie.startDate,
      endDate: cookie.endDate,
    });
  }
  const startDate = getDefaultDate({ start: true });
  const endDate = getDefaultDate({ start: false });

  return json(
    {
      data: await getJobBriefSummary({
        job_name: decrypt("jobBrief", params.jobname as string) as string,
        start_time: startDate,
        end_time: endDate,
      }),
      startDate,
      endDate,
    },
    {
      headers: {
        "Set-Cookie": await jobIdDetailsCookie.serialize({
          startDate,
          endDate,
        }),
      },
    }
  );
};

export default function JobId() {
  const { jobname } = useParams();
  const loaderData = useLoaderData<typeof loader>();
  const { jobsCrumbs, setJobsCrumbs } = useOutletContext() as any;

  return (
    <JobsDashboard
      jobName={decrypt("jobBrief", jobname as string)}
      crumbs={jobsCrumbs}
      setCrumbs={setJobsCrumbs}
      summaryWidgetData={loaderData.data}
      startDate={loaderData.startDate}
      endDate={loaderData.endDate}
    />
  );
}
