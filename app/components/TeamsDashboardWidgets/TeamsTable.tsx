import * as React from "react";
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

import type { TeamsOverview } from "~/services/teams";
import { TeamDetails } from "./TeamDetails";
import { TeamContext } from "~/context";
import { TableHeaderCaret, ExpandableTableRow } from "~/components/Table";
import {
  FONT_COLORS,
  LANDING_PAGE_TEAMS_TABLE_HEADERS,
} from "~/data/constants";

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

// const headers = [
//   "Team Name",
//   "Jobs Count",
//   "Pipelines Count",
//   "Total Success Rate",
//   "Pipeline Success Rate",
//   "Tenants Run",
//   "Avg. Build Duration(s)",
// ];

interface ITeamTableProps {
  setOpenTeamDetailsModal: Function;
  tableData: TeamsOverview[];
  title?: string;
}
export const TeamsTable = (props: ITeamTableProps) => {
  const teamState = React.useContext(TeamContext);

  React.useEffect(() => {
    return () => teamState.setExpandedForTeam();
  }, []);

  const teamDetailsClickHandler = (team: string) => {
    props.setOpenTeamDetailsModal([true, team]);
  };

  return (
    <StyledWrapperBox>
      {props.title ? <StyledTableBox>{props.title}</StyledTableBox> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeaderCaret
            headers={LANDING_PAGE_TEAMS_TABLE_HEADERS}
            hasCaret={true}
            caretKey="teams-landing-blank-caret"
            hasSpareEndCoulmn={true}
          />
          <TableBody>
            {props.tableData.map((row) => (
              <ExpandableTableRow
                key={row.team_name}
                teamName={row.team_name}
                expandComponent={
                  <TableCell colSpan={9}>
                    <TeamDetails
                      widget={{
                        teamName: row.team_name,
                        name: "TEST CASES TRENDS (LAST 7 DAYS)",
                        jobsCount: row.total_jobs_count,
                        pipelineCount: row.pipeline_jobs_count,
                        testCount: row.non_pipeline_jobs_count,
                      }}
                    />
                  </TableCell>
                }
              >
                <TableCell component="th" scope="row">
                  {row.team_name}
                </TableCell>
                <TableCell align="right">{row.total_jobs_count}</TableCell>
                <TableCell align="right">{row.pipeline_jobs_count}</TableCell>
                <TableCell align="right">
                  {row.non_pipeline_jobs_count}
                </TableCell>
                <TableCell align="right">{row.pipeline_success_rate}</TableCell>
                <TableCell align="right">
                  {row.non_pipeline_success_rate}
                </TableCell>
                <TableCell align="right">{row.tenants_run}</TableCell>
                <TableCell align="right">{row.avg_duration}</TableCell>
                <TableCell align="right">{row.pipeline_avg_duration}</TableCell>
                <TableCell align="right">
                  {row.nonpipeline_avg_duration}
                </TableCell>
                <TableCell align="right">
                  <StyledButton
                    onClick={() => teamDetailsClickHandler(row.team_name)}
                    size="small"
                  >
                    Details
                  </StyledButton>
                </TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
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

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "10px",
}));
