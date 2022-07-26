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
import { SideBarContext, TeamContext } from "~/context";

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

export const TeamsSatusTable = () => {
  const state = React.useContext(SideBarContext);
  const teamState = React.useContext(TeamContext);

  const onClickDetails = (event: any, team: string) => {
    state.setSideBarIndex(1);
    teamState.setExpandedForTeam(
      team,
      teamState.expanded !== undefined && teamState.expanded[team] !== undefined
        ? !teamState.expanded[team]
        : true
    );
  };

  return (
    <StyledWrapperBox>
      <StyledTableBox>Status By Teams (Last 7 days)</StyledTableBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell align="right">Jobs Count</TableCell>
              <TableCell align="right">Pipelines Count</TableCell>
              <TableCell align="right">Total Success Rate</TableCell>
              <TableCell align="right">Pipeline Success Rate</TableCell>
              <TableCell align="right">Tenants Run</TableCell>
              <TableCell align="right">Avg. Build Duration(s)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}%</TableCell>
                <TableCell align="right">{row.protein}%</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <StyledButton
                    onClick={(event: any) => onClickDetails(event, row.name)}
                    size="small"
                  >
                    Details
                  </StyledButton>
                </TableCell>
              </TableRow>
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
}));

const StyledTableBox = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  color: "gray",
  marginBottom: "15px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "10px",
}));
