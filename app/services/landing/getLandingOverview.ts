// import type { TeamsOverview } from "~/services/teams";
// import { getTeamsOverview } from "~/services/teams";
import { getTeamsJobsAggregate } from "~/services/jobs";

interface IGetLandingOverviewProps {
  start_time: string;
  end_time: string;
}

export async function getLandingOverview({
  start_time,
  end_time,
}: IGetLandingOverviewProps) {
  // const responseTeams = await getTeamsOverview({ start_time, end_time });
  const getTeamsJobsAggregateResponse = await getTeamsJobsAggregate({
    start_time,
    end_time,
  });

  return {
    // teamsOvw: responseTeams as TeamsOverview[],
    reportAggregate: getTeamsJobsAggregateResponse,
  };
}
