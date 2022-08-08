import * as React from "react";
import { useNavigate } from "@remix-run/react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
// import { TeamContext } from "~/context/index.delete";
import type { TeamsOverview } from "~/services/teams";
import {
  TableHeaderCaret,
  TableBodySetter,
  TableFooterWrapper,
} from "~/components/Table";
import { FONT_COLORS } from "~/data/constants/colors";
import { LANDING_PAGE_HOME_TABLE_HEADERS } from "~/data/constants";

interface ITeamsStatusTableProps {
  data: TeamsOverview[] | null;
}
export const TeamsStatusTable = (props: ITeamsStatusTableProps) => {
  let navigate = useNavigate();
  const [isExpanded, setIsExpanded] = React.useState({} as any);
  // const teamState = React.useContext(TeamContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onClickDetails = (event: any, team: string) => {
    event.preventDefault();
    setIsExpanded({
      ...isExpanded,
      [team]: isExpanded[team] ? !isExpanded[team] : true,
    });

    // teamState.setExpandedForTeam(
    //   team,
    //   teamState.expanded !== undefined && teamState.expanded[team] !== undefined
    //     ? !teamState.expanded[team]
    //     : true
    // );
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
    rows: props.data,
    hasCaret: false,
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
        onClickHandler: onClickDetails,
        fnArgs: returnParams,
      },
    ],
    keyValue: "team_name",
  };

  const tableFooterDataParam = {
    rowsPerPage,
    rows: props.data,
    page,
    colspan:
      ((LANDING_PAGE_HOME_TABLE_HEADERS &&
        LANDING_PAGE_HOME_TABLE_HEADERS.length) ||
        3) + 1,
    setPage,
    setRowsPerPage,
  };

  return (
    <StyledWrapperBox>
      <StyledTableBox>Status By Teams (Last 7 days)</StyledTableBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHeaderCaret
            headers={LANDING_PAGE_HOME_TABLE_HEADERS}
            hasCaret={false}
            caretKey="teams-landing-dash-blank-caret"
            hasSpareEndCoulmn={true}
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
}));

const StyledTableBox = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  marginBottom: "15px",
}));
