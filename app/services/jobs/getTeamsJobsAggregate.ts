import { BASE_URL, JOBS_TEST_STATUS_AGGREGATE_REPORT } from "~/data/constants";

interface IGetTeamsJobsAggregateProps {
  start_time: string;
  end_time: string;
}

export async function getTeamsJobsAggregate(
  props: IGetTeamsJobsAggregateProps
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };

  const response = await fetch(
    `${BASE_URL}${JOBS_TEST_STATUS_AGGREGATE_REPORT}`,
    requestOptions
  );
  const responseAggr: any = await response.json();
  return responseAggr;
}
