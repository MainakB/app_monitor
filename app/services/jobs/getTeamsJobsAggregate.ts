import { BASE_URL, JOBS_TEST_STATUS_AGGREGATE_REPORT } from "~/data/constants";

export async function getTeamsJobsAggregate() {
  let props = {
    start_time: "2022-07-01T03:13:44.707Z",
    end_time: "2022-07-24T03:12:44.707Z",
  };

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
