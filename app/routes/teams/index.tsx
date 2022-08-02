import { useOutletContext, Outlet } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";
import { LANDING_PAGE_TEAMS_TABLE_TITLE } from "~/data";

export default function TeamsIndex() {
  const { data, crumbs, setCrumbs } = useOutletContext() as any;

  return (
    <>
      <TeamsDashboard
        tableData={data}
        title={
          crumbs && crumbs.length === 1
            ? LANDING_PAGE_TEAMS_TABLE_TITLE
            : undefined
        }
        crumbs={crumbs}
        setCrumbs={setCrumbs}
      />
      <Outlet context={data} />
    </>
  );
}
