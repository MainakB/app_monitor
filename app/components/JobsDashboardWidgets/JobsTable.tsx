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

import { TeamDetails } from "./TeamDetails";
import { TeamContext } from "~/context";
import { TableHeaderCaret, ExpandableTableRow } from "~/components/Table";
import { FONT_COLORS } from "~/data/constants/colors";
import { LANDING_PAGE_JOBS_TABLE_HEADERS } from "~/data/constants";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Team1", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

// const headers = [
//   "NAME",
//   "IS PIPELINE",
//   "STATUS",
//   "DURATION",
//   "TEAM",
//   "REPOSITORY",
//   "TEST COUNT",
//   "TEST TYPE",
//   "TEST BROWSERS",
//   "TEST TENANT",
//   "EXECUTION DATE",
// ];

interface IJobsTableProps {
  title?: string;
}

export const JobsTable = (props: IJobsTableProps) => {
  const teamState = React.useContext(TeamContext);

  React.useEffect(() => {
    return () => teamState.setExpandedForTeam();
  }, []);

  return (
    <StyledWrapperBox>
      {/* <StyledTableBox>STATUS BY JOBS (LAST 7 DAYS)</StyledTableBox> */}
      {props.title ? <StyledTableBox>{props.title}</StyledTableBox> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeaderCaret
            headers={LANDING_PAGE_JOBS_TABLE_HEADERS}
            hasCaret={true}
            caretKey="jobs-landing-blank-caret"
            hasSpareEndCoulmn={true}
          />
          <TableBody>
            {rows.map((row) => (
              <ExpandableTableRow
                key={row.name}
                keyValue={row.name}
                expandKey="abcd"
                stateContext="abcd"
                expandComponent={
                  <TableCell colSpan={9}>
                    <TeamDetails
                      widget={{
                        teamName: row.name,
                        name: "Test Cases Trends (Last 7 days)",
                        jobsCount: row.calories,
                        pipelineCount: row.calories,
                        testCount: row.calories,
                      }}
                    />
                  </TableCell>
                }
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <StyledButton size="small">Details</StyledButton>
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
  display: "flex",
  flexDirection: "column",

  // flex: 4,
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
