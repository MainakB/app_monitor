import { useLoaderData } from "@remix-run/react";
import { GeneralDashboardPage } from "~/pages/home";
import { getTeamsOverview } from "~/services/teams";
import type { TeamsOverview } from "~/services/teams";

import { getLandingOverview } from "~/services/landing";

export const loader = () => {
  return getLandingOverview();
};

export default function HomeIndex() {
  const data: any = useLoaderData();

  return (
    <GeneralDashboardPage
      tableData={data.teamsOvw}
      aggReportData={data.reportAggregate}
    />
  );
}
