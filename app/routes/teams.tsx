import { useLoaderData, Outlet } from "@remix-run/react";
import type { TeamsOverview } from "~/services/teams";
import { getTeamsOverview } from "~/services/teams";

export const loader = () => {
  return getTeamsOverview();
};

export default function Teams() {
  const data: TeamsOverview[] = useLoaderData();

  return (
    <>
      <Outlet context={data} />
    </>
  );
}
