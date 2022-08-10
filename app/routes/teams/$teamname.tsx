import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";

import { getTeamBriefSummary } from "~/services/teams";

import { teamIdDetailsCookie } from "~/services/cookies";
import { getDefaultDate } from "~/lib";

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await teamIdDetailsCookie.parse(cookieHeader);

  if (cookie) {
    return json({
      data: await getTeamBriefSummary({
        team: params.teamname as string,
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
      data: await getTeamBriefSummary({
        team: params.teamname as string,
        start_time: startDate,
        end_time: endDate,
      }),
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
