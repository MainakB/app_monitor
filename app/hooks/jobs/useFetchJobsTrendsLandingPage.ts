import { useQuery } from "@tanstack/react-query";
import type { IJobsTrendsOverview, IJobsTenantsSummary } from "~/services/jobs";
import { getJobsTrendsOverview } from "~/services/jobs";
import { UseQueryDefaults } from "~/data/constants";

type IJobsDashOvrvwSummaryCharts = {
  jobTrendsOvw: IJobsTrendsOverview[] | null;
  jobsTenantsSumry: IJobsTenantsSummary[] | null;
};

interface IUseFetchJobsTrendsLandingPageProps {
  payload: {
    job_name: string;
    start_date: Date;
    end_date: Date;
  };

  setJobsTrendsData: React.Dispatch<
    React.SetStateAction<IJobsDashOvrvwSummaryCharts>
  >;
}

export const useFetchJobsTrendsLandingPage = (
  props: IUseFetchJobsTrendsLandingPageProps
) => {
  return useQuery([`qry_dash_jobs_ovw`, props.payload], getJobsTrendsOverview, {
    ...UseQueryDefaults,
    enabled: !!props?.payload?.job_name,
    onSuccess: (data: IJobsDashOvrvwSummaryCharts) =>
      props.setJobsTrendsData(data),
  });
};
