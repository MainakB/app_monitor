import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { JobsDashboard } from "~/pages/jobs";
import type { IJobBriefSummary } from "~/services/jobs";
import { getJobBriefSummary } from "~/services/jobs";
import { decrypt } from "~/lib";
import { jobIdDetailsCookie } from "~/services/cookies";
import { getDateStringFromTimestamp } from "~/lib";
import { DEFUALTTIMERANGE } from "~/data/constants/timeranges";

// export const loader = ({ params }: any) => {
//   return getJobBriefSummary({
//     job_name: decrypt("jobBrief", params.jobname) as string,
//   });
// };

const getDefaultDate = ({ start }: { start: boolean }) => {
  const timeArgs: number[] = start ? [0, 0, 0, 0] : [23, 59, 59, 59];
  return getDateStringFromTimestamp(
    (() => {
      const d = new Date();
      d.setHours(timeArgs[0], timeArgs[1], timeArgs[2], timeArgs[3]);
      return d;
    })(),
    start ? DEFUALTTIMERANGE : 0
  );
};

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const [cookie, data] = await Promise.all([
    jobIdDetailsCookie.parse(cookieHeader),
    getJobBriefSummary({
      job_name: decrypt("jobBrief", params.jobname as string) as string,
    }),
  ]);

  if (cookie) {
    return json({
      data,
      startDate: cookie.startDate,
      endDate: cookie.endDate,
    });
  }
  const startDate = getDefaultDate({ start: true });
  const endDate = getDefaultDate({ start: false });

  return json(
    {
      data,
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
