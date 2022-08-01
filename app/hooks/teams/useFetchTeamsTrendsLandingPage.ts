import { useQuery } from "@tanstack/react-query";
import type {
  TeamsTrendsOverview,
  TeamsTenantsSummary,
} from "~/services/teams";
import { getTeamsTrendsOverview } from "~/services/teams";
import { UseQueryDefaults } from "~/data/constants";

type ITeamsDashOvrvwSummaryCharts = {
  teamTrendsOvw: TeamsTrendsOverview[] | null;
  teamTenantsSumry: TeamsTenantsSummary[] | null;
};

interface IUseFetchTeamstrendsLandingPageProps {
  payload: {
    team: string;
    start_date: Date;
    end_date: Date;
  };

  setTeamsTrendsData: React.Dispatch<
    React.SetStateAction<ITeamsDashOvrvwSummaryCharts>
  >;
}

export const useFetchTeamsTrendsLandingPage = (
  props: IUseFetchTeamstrendsLandingPageProps
) => {
  return useQuery(
    [`qry_dash_teams_ovw`, props.payload],
    getTeamsTrendsOverview,
    {
      ...UseQueryDefaults,
      enabled: !!props?.payload?.team,
      onSuccess: (data: ITeamsDashOvrvwSummaryCharts) =>
        props.setTeamsTrendsData(data),
    }
  );
};
