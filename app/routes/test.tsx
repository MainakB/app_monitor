import { useLoaderData, Outlet } from "@remix-run/react";
import type { TeamsTrendsOverview } from "~/services/teams";
import { getTeamsTrendsOverview } from "~/services/teams";

export const loader = () => {
  console.log("loader called");

  return getTeamsTrendsOverview();
};

export default function Test() {
  const data: TeamsTrendsOverview[] = useLoaderData();

  return <>{JSON.stringify(data)}</>;
}
