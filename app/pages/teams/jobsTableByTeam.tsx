import React from "react";
import type { ITeamJobs } from "~/services/teams";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {
  TableHeaderCaret,
  TableBodySetter,
  TableFooterWrapper,
} from "~/components/Table";
import { TEAMS_SUMMARY_JOBS_TABLE_HEADERS } from "~/data/constants";

interface IJobsTableByTeamProps {
  tableData: ITeamJobs[] | null;
}
export const JobsTableByTeam = (props: IJobsTableByTeamProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const staticTableParam = {
    value: "",
    type: "text",
  };

  const tableFooterDataParam = {
    rowsPerPage,
    rows: props.tableData || null,
    page,
    colspan: TEAMS_SUMMARY_JOBS_TABLE_HEADERS.length,
    setPage,
    setRowsPerPage,
  };

  const tableBodyDataParam = {
    rowsPerPage,
    hasCaret: false,
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
        value: "build_result",
      },
      {
        ...staticTableParam,
        value: "build_duration",
      },
      {
        ...staticTableParam,
        value: "branch_name",
      },
      {
        ...staticTableParam,
        value: "tenant_name",
      },
    ],
    keyValue: "job_name",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeaderCaret
          headers={TEAMS_SUMMARY_JOBS_TABLE_HEADERS}
          hasCaret={false}
          hasSpareEndCoulmn={false}
        />

        <TableBodySetter args={tableBodyDataParam} />
        <TableFooterWrapper args={tableFooterDataParam} />
      </Table>
    </TableContainer>
  );
};
