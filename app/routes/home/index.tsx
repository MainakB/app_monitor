import { GeneralDashboardPage } from "~/pages/home";
import { getTeamsOverview } from "~/services/teams";
import type { TeamsOverview } from "~/services/teams";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
  return getTeamsOverview();
};

export default function HomeIndex() {
  const data: TeamsOverview[] = useLoaderData();

  return <GeneralDashboardPage tableData={data} />;
}
