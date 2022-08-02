import * as React from "react";
import { useNavigate } from "@remix-run/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import type { TeamsOverview } from "~/services/teams";
import { TeamContext } from "~/context";
import {
  TableHeaderCaret,
  TableBodySetter,
  TableFooterWrapper,
} from "~/components/Table";
import { FONT_COLORS } from "~/data/constants/colors";
import {
  LANDING_PAGE_TEAMS_TABLE_HEADERS,
  TEAM_LANDING_TRENDS_KEY,
  TEAMS_LANDING_CONTEXT_KEY,
} from "~/data/constants";

interface ITeamTableProps {
  tableData: TeamsOverview[];
  crumbs: string[];
  setCrumbs: Function;
  title?: string;
}
export const TeamsTable = (props: ITeamTableProps) => {
  const teamState = React.useContext(TeamContext);
  let navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    return () => teamState.setExpandedForTeam();
  }, []);

  const teamDetailsClickHandler = (event: any, team: string) => {
    event.preventDefault();
    navigate(`/teams/${team}`, { replace: false });
  };

  const returnParams = (row: any) => {
    return row["team_name"];
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
        value: "team_name",
      },
      {
        ...staticTableParam,
        value: "total_jobs_count",
      },
      {
        ...staticTableParam,
        value: "pipeline_jobs_count",
      },
      {
        ...staticTableParam,
        value: "non_pipeline_jobs_count",
      },
      {
        ...staticTableParam,
        value: "pipeline_success_rate",
      },
      {
        ...staticTableParam,
        value: "non_pipeline_success_rate",
      },
      {
        ...staticTableParam,
        value: "tenants_run",
      },
      {
        ...staticTableParam,
        value: "avg_duration",
      },
      {
        ...staticTableParam,
        value: "pipeline_avg_duration",
      },
      {
        ...staticTableParam,
        value: "nonpipeline_avg_duration",
      },
      {
        ...staticTableParam,
        value: "Details",
        type: "button",
        onClickHandler: teamDetailsClickHandler,
        fnArgs: returnParams,
      },
    ],
    keyValue: "team_name",
    expandKey: TEAM_LANDING_TRENDS_KEY,
    expandRowSpan: LANDING_PAGE_TEAMS_TABLE_HEADERS.length + 2,
    stateContext: TEAMS_LANDING_CONTEXT_KEY,
  };

  const tableFooterDataParam = {
    rowsPerPage,
    rows: props.tableData,
    page,
    colspan:
      ((LANDING_PAGE_TEAMS_TABLE_HEADERS &&
        LANDING_PAGE_TEAMS_TABLE_HEADERS.length) ||
        3) + 2,
    setPage,
    setRowsPerPage,
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeaderCaret
          headers={LANDING_PAGE_TEAMS_TABLE_HEADERS}
          hasCaret={true}
          caretKey="teams-landing-dash-blank-caret"
          hasSpareEndCoulmn={true}
          // topAdditionalRow={2}
        />
        <TableBodySetter args={tableBodyDataParam} />
        <TableFooterWrapper args={tableFooterDataParam} />
      </Table>
    </TableContainer>
  );
};
