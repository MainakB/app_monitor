import { useState } from "react";
import { useLoaderData, Outlet } from "@remix-run/react";
import type { JobsOverview } from "~/services/jobs";
import { getJobsOverview } from "~/services/jobs";

export const loader = () => {
  return getJobsOverview();
};

export default function Jobs() {
  const loaderData: JobsOverview[] = useLoaderData();
  const [jobsCrumbs, setJobsCrumbs] = useState(["Home"]);

  const data = {
    data: loaderData,
    jobsCrumbs,
    setJobsCrumbs,
  };

  return (
    <>
      <Outlet context={data} />
    </>
  );
}
