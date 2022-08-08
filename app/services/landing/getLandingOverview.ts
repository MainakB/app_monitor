import type { TeamsOverview } from "~/services/teams";
import { getTeamsOverview } from "~/services/teams";
import { getTeamsJobsAggregate } from "~/services/jobs";

export async function getLandingOverview() {
  const responseTeams = await getTeamsOverview();
  const getTeamsJobsAggregateResponse = await getTeamsJobsAggregate();

  return {
    teamsOvw: responseTeams as TeamsOverview[],
    reportAggregate: getTeamsJobsAggregateResponse,
  };
}
