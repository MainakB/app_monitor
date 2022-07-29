import { useQuery } from "@tanstack/react-query";
import type { TeamsTrendsOverview } from "~/services/teams";
import { getTeamsTrendsOverview } from "~/services/teams";
import { UseQueryDefaults } from "~/data/constants";
// const fetchAllJobsList = ({ queryKey }) => {
//   const props = queryKey[1];
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(props),
//   };

//   return fetch(`${BASE_URL}${FETCH_ALL_JOBS_URL}`, requestOptions)
//     .then((res) => {
//       if (!res.ok) throw Error(res.statusText);
//       const result = res.json();
//       return result;
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

interface IUseFetchTeamstrendsLandingPageProps {
  setTeamsTrendsData: React.Dispatch<
    React.SetStateAction<TeamsTrendsOverview[] | []>
  >;
}

export const useFetchTeamsTrendsLandingPage = (
  props: IUseFetchTeamstrendsLandingPageProps
) => {
  return useQuery([`qry_dash_teams_ovw`], getTeamsTrendsOverview, {
    ...UseQueryDefaults,

    // enabled: !!props?.data?.tenant_list?.length,
    onSuccess: (data: TeamsTrendsOverview[]) => props.setTeamsTrendsData(data),
  });
};
