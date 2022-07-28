import * as React from "react";
import { useNavigate } from "@remix-run/react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TeamContext } from "~/context";
import type { TeamsOverview } from "~/services/teams";
import {
  TableHeaderCaret,
  TableBodySetter,
  TableFooterWrapper,
} from "~/components/Table";
import { FONT_COLORS, LANDING_PAGE_HOME_TABLE_HEADERS } from "~/data/constants";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Team1", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

interface ITeamsStatusTableProps {
  data: TeamsOverview[] | null;
}
export const TeamsStatusTable = (props: ITeamsStatusTableProps) => {
  let navigate = useNavigate();
  const teamState = React.useContext(TeamContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onClickDetails = (event: any, team: string) => {
    event.preventDefault();
    teamState.setExpandedForTeam(
      team,
      teamState.expanded !== undefined && teamState.expanded[team] !== undefined
        ? !teamState.expanded[team]
        : true
    );
    navigate("/teams", { replace: false });
  };

  const returnParams = (row: any) => {
    return row["team_name"];
  };

  const staticPtableParam = {
    value: "",
    type: "text",
  };

  const tableBodyDataParam = {
    rowsPerPage,
    rows: props.data,
    page,
    keyOrder: [
      {
        ...staticPtableParam,
        value: "team_name",
      },
      {
        ...staticPtableParam,
        value: "total_jobs_count",
      },
      {
        ...staticPtableParam,
        value: "pipeline_jobs_count",
      },
      {
        ...staticPtableParam,
        value: "non_pipeline_jobs_count",
      },
      {
        ...staticPtableParam,
        value: "pipeline_success_rate",
      },
      {
        ...staticPtableParam,
        value: "non_pipeline_success_rate",
      },
      {
        ...staticPtableParam,
        value: "tenants_run",
      },
      {
        ...staticPtableParam,
        value: "avg_duration",
      },
      {
        ...staticPtableParam,
        value: "pipeline_avg_duration",
      },
      {
        ...staticPtableParam,
        value: "nonpipeline_avg_duration",
      },
      {
        ...staticPtableParam,
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
          {/* <TableBody>
            {props.data && props.data.length
              ? props.data.map((row) => (
                  <TableRow
                    key={row.team_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.team_name}
                    </TableCell>
                    <TableCell align="right">{row.total_jobs_count}</TableCell>
                    <TableCell align="right">
                      {row.pipeline_jobs_count}
                    </TableCell>
                    <TableCell align="right">
                      {row.non_pipeline_jobs_count}%
                    </TableCell>
                    <TableCell align="right">
                      {row.pipeline_success_rate}%
                    </TableCell>
                    <TableCell align="right">
                      {row.non_pipeline_success_rate}
                    </TableCell>
                    <TableCell align="right">{row.tenants_run}</TableCell>
                    <TableCell align="right">{row.avg_duration}</TableCell>
                    <TableCell align="right">
                      {row.pipeline_avg_duration}
                    </TableCell>
                    <TableCell align="right">
                      {row.nonpipeline_avg_duration}
                    </TableCell>
                    <TableCell align="right">
                      <StyledButton
                        onClick={(event: any) =>
                          onClickDetails(event, row.team_name)
                        }
                        size="small"
                      >
                        Details
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody> */}
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

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "10px",
}));
