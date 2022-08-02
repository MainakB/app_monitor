import { useOutletContext, Outlet } from "@remix-run/react";
import { TeamsDashboard } from "~/pages/teams";

export default function TeamsIndex() {
  const { data, crumbs, setCrumbs } = useOutletContext() as any;

  return (
    <>
      <TeamsDashboard tableData={data} crumbs={crumbs} setCrumbs={setCrumbs} />
      <Outlet context={data} />
    </>
  );
}
