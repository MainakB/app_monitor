import { JobsDashboard } from "~/pages/jobs";
import { LANDING_PAGE_JOBS_TABLE_TITLE } from "~/data";

export default function JobsIndex() {
  return <JobsDashboard title={LANDING_PAGE_JOBS_TABLE_TITLE} />;
}
