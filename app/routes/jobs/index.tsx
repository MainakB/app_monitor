import { useOutletContext, Outlet } from "@remix-run/react";
import { JobsDashboard } from "~/pages/jobs";

export default function JobsIndex() {
  const { data, jobsCrumbs, setJobsCrumbs } = useOutletContext() as any;

  return (
    <>
      <JobsDashboard
        tableData={(data && data.jobsList) || []}
        crumbs={jobsCrumbs}
        setCrumbs={setJobsCrumbs}
      />
      {/* <Outlet context={data} /> */}
    </>
  );
}
