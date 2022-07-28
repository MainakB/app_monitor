import { useOutletContext } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import { LANDING_PAGE_TEAMS_TABLE_TITLE } from "~/data";

export default function TeamsIndex() {
  const data = useOutletContext() as any;

  return (
    <TeamsDashboard tableData={data} title={LANDING_PAGE_TEAMS_TABLE_TITLE} />
  );
}
