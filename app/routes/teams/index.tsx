import { useOutletContext, Outlet } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import { LANDING_PAGE_TEAMS_TABLE_TITLE } from "~/data";

export default function TeamsIndex() {
  const { data, crumbs, setCrumbs } = useOutletContext() as any;

  return (
    <>
      <TeamsDashboard
        tableData={data}
        title={LANDING_PAGE_TEAMS_TABLE_TITLE}
        crumbs={crumbs}
        setCrumbs={setCrumbs}
      />
      <Outlet context={data} />
    </>
  );
}
