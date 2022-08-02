import { useOutletContext, useParams } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";

export default function TeamId() {
  const { teamname } = useParams();

  const { crumbs, setCrumbs } = useOutletContext() as any;
  console.log("on nav", crumbs);
  return (
    <TeamsDashboard
      teamName={teamname as string}
      crumbs={crumbs}
      setCrumbs={setCrumbs}
    />
  );
}
