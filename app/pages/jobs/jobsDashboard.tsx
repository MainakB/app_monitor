import React from "react";

import { JobsTable } from "~/components/JobsDashboardWidgets";

interface IJobsDashboardProps {
  title?: string;
}
export const JobsDashboard = (props: IJobsDashboardProps) => {
  return <JobsTable title={props.title} />;
};
