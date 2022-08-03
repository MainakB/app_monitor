import * as React from "react";
import { useNavigate } from "@remix-run/react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import type { JobsOverview } from "~/services/jobs";

import {
  TableHeaderCaret,
  TableBodySetter,
  TableFooterWrapper,
} from "~/components/Table";
import {
  LANDING_PAGE_JOBS_TABLE_HEADERS,
  JOB_LANDING_TRENDS_KEY,
  TEAMS_LANDING_CONTEXT_KEY,
} from "~/data/constants";

interface IJobsTableProps {
  tableData: JobsOverview[];
  crumbs: string[];
  setCrumbs: Function;
}
export const JobsTable = (props: IJobsTableProps) => {
  let navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const jobDetailsClickHandler = (event: any, jobName: string) => {
    event.preventDefault();
    navigate(`/jobs/${jobName}`, { replace: false });
  };

  const returnParams = (row: any) => {
    return row["job_name"];
  };

  const staticTableParam = {
    value: "",
    type: "text",
  };

  const tableBodyDataParam = {
    rowsPerPage,
    hasCaret: true,
    rows: props.tableData,
    page,
    keyOrder: [
      {
        ...staticTableParam,
        value: "job_name",
        type: "link",
      },
      {
        ...staticTableParam,
        value: "is_pipeline",
      },
      {
        ...staticTableParam,
        value: "team_name",
      },
      {
        ...staticTableParam,
        value: "job_owner",
      },
      {
        ...staticTableParam,
        value: "last_build_result",
      },
      {
        ...staticTableParam,
        value: "embeddable_url",
        type: "image",
      },
      {
        ...staticTableParam,
        value: "last_build_timestamp",
        type: "unixtime",
      },
      {
        ...staticTableParam,
        value: "Details",
        type: "button",
        onClickHandler: jobDetailsClickHandler,
        fnArgs: returnParams,
      },
    ],
    keyValue: "job_name",
    expandKey: JOB_LANDING_TRENDS_KEY,
    expandRowSpan: LANDING_PAGE_JOBS_TABLE_HEADERS.length + 2,
    // stateContext: TEAMS_LANDING_CONTEXT_KEY,
  };

  const tableFooterDataParam = {
    rowsPerPage,
    rows: props.tableData,
    page,
    colspan:
      ((LANDING_PAGE_JOBS_TABLE_HEADERS &&
        LANDING_PAGE_JOBS_TABLE_HEADERS.length) ||
        3) + 2,
    setPage,
    setRowsPerPage,
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeaderCaret
          headers={LANDING_PAGE_JOBS_TABLE_HEADERS}
          hasCaret={true}
          caretKey="jobs-landing-dash-blank-caret"
          hasSpareEndCoulmn={true}
          // topAdditionalRow={2}
        />
        <TableBodySetter args={tableBodyDataParam} />
        <TableFooterWrapper args={tableFooterDataParam} />
      </Table>
    </TableContainer>
  );
};
