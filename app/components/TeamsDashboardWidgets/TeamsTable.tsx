import * as React from "react";
import { styled } from "@mui/material";
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
  setOpenTeamDetailsModal: Function;
  tableData: TeamsOverview[];
  title?: string;
}
export const TeamsTable = (props: ITeamTableProps) => {
  const teamState = React.useContext(TeamContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    return () => teamState.setExpandedForTeam();
  }, []);

  const teamDetailsClickHandler = (event: any, team: string) => {
    event.preventDefault();
    props.setOpenTeamDetailsModal([true, team]);
  };

  const returnParams = (row: any) => {
    console.log("11->", row["team_name"]);
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
    <StyledWrapperBox>
      {props.title ? <StyledTableBox>{props.title}</StyledTableBox> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHeaderCaret
            headers={LANDING_PAGE_TEAMS_TABLE_HEADERS}
            hasCaret={true}
            caretKey="teams-landing-dash-blank-caret"
            hasSpareEndCoulmn={true}
            topAdditionalRow={2}
          />
          <TableBodySetter args={tableBodyDataParam} />
          <TableFooterWrapper args={tableFooterDataParam} />
        </Table>
      </TableContainer>
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  "-webkit-box-shadow": "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  padding: "20px",
  margin: "20px",
  flex: 4,
}));

const StyledTableBox = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  marginBottom: "15px",
}));
