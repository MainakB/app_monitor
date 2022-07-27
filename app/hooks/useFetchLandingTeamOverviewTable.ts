import { useQuery } from "@tanstack/react-query";
import type { TeamsOverview } from "~/services/teams";
import { getTeamsOverview } from "~/services/teams";
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

interface IUseFetchLandingTeamOverviewTableProps {
  setData: React.Dispatch<React.SetStateAction<TeamsOverview[] | null>>;
}

export const useFetchLandingTeamOverviewTable = (
  props: IUseFetchLandingTeamOverviewTableProps
) => {
  return useQuery([`qry_dash_teams_ovw`], getTeamsOverview, {
    ...UseQueryDefaults,

    // enabled: !!props?.data?.tenant_list?.length,
    onSuccess: (data: TeamsOverview[]) => props.setData(data),
  });
};
