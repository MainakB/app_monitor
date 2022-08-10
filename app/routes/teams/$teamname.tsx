import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";

import { getTeamBriefSummary } from "~/services/teams";

import { teamIdDetailsCookie } from "~/services/cookies";
import { getDateStringFromTimestamp } from "~/lib";
import { DEFUALTTIMERANGE } from "~/data/constants/timeranges";

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
    teamIdDetailsCookie.parse(cookieHeader),
    getTeamBriefSummary({ team: params.teamname as string }),
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
        "Set-Cookie": await teamIdDetailsCookie.serialize({
          startDate,
          endDate,
        }),
      },
    }
  );
};

export default function TeamId() {
  const { teamname } = useParams();
  const loaderData = useLoaderData<typeof loader>();
  const { crumbs, setCrumbs } = useOutletContext() as any;
  return (
    <TeamsDashboard
      teamName={teamname as string}
      crumbs={crumbs}
      setCrumbs={setCrumbs}
      summaryWidgetData={loaderData.data}
      startDate={loaderData.startDate}
      endDate={loaderData.endDate}
    />
  );
}
