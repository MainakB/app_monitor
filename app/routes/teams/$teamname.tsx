import { useOutletContext, useParams } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";

import { LANDING_PAGE_TEAM_DETAIL_TITLE } from "~/data";

// export const loader = ({params}) => {
//   return getTeamsOverview();
// };

export default function TeamId() {
  const { teamname } = useParams();

  const { crumbs, setCrumbs } = useOutletContext() as any;
  console.log("on nav", crumbs);
  return (
    // <div>Test</div>
    <TeamsDashboard
      teamName={teamname as string}
      crumbs={crumbs}
      setCrumbs={setCrumbs}
      title={`${LANDING_PAGE_TEAM_DETAIL_TITLE} : ${teamname?.toUpperCase()}`}
    />
  );
}
