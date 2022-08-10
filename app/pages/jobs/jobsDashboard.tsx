import React, { useEffect } from "react";

import { JobsTable } from "~/components/JobsDashboardWidgets";
import { JobsDashboardWrapper } from "~/layout/JobsLayout";
import type { JobsOverview, IJobBriefSummary } from "~/services/jobs";
import { JobDetailsById } from "./jobDetailsById";
import {
  LANDING_PAGE_JOBS_TABLE_TITLE,
  LANDING_PAGE_JOB_DETAIL_TITLE,
} from "~/data";
import { trimJobUrl } from "~/lib";

interface IJobsDashboardProps {
  tableData?: JobsOverview[];
  crumbs: string[];
  jobName?: string;
  setCrumbs: Function;
  summaryWidgetData?: IJobBriefSummary;
  startDate?: string;
  endDate?: string;
}

export const JobsDashboard = (props: IJobsDashboardProps) => {
  useEffect(() => {
    if (props.jobName) {
      props.setCrumbs([...props.crumbs, trimJobUrl(props.jobName)]);
    }
  }, []);

  const resolveTitle = (crumbs: string[], jobName: string | undefined) =>
    crumbs && crumbs.length > 1 && jobName
      ? `${LANDING_PAGE_JOB_DETAIL_TITLE} : ${trimJobUrl(
          jobName
        )?.toUpperCase()}`
      : LANDING_PAGE_JOBS_TABLE_TITLE;

  return (
    <JobsDashboardWrapper
      title={resolveTitle(props.crumbs, props.jobName)}
      crumbs={props.crumbs}
      setCrumbs={props.setCrumbs}
      startDate={props.startDate}
      endDate={props.endDate}
    >
      {props.crumbs.length === 2 ? (
        <JobDetailsById
          jobName={props.jobName as string}
          summaryWidgetData={props.summaryWidgetData || null}
        />
      ) : null}
      {props.crumbs.length === 1 && props.crumbs[0] === "Home" ? (
        <JobsTable
          tableData={props.tableData as JobsOverview[]}
          crumbs={props.crumbs}
          setCrumbs={props.setCrumbs}
        />
      ) : null}
    </JobsDashboardWrapper>
  );
};
