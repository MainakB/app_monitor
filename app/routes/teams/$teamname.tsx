import { useOutletContext, useParams, useLoaderData } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import type { TeamBriefSummary } from "~/services/teams";
import { getTeamBriefSummary } from "~/services/teams";

export const loader = ({ params }: any) => {
  return getTeamBriefSummary({ team: params.teamname });
};

export default function TeamId() {
  const { teamname } = useParams();
  const loaderData: TeamBriefSummary = useLoaderData();
  const { crumbs, setCrumbs } = useOutletContext() as any;
  return (
    <TeamsDashboard
      teamName={teamname as string}
      crumbs={crumbs}
      setCrumbs={setCrumbs}
      summaryWidgetData={loaderData}
    />
  );
}
