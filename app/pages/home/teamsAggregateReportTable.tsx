import { Link } from "@remix-run/react";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { TableHeaderCaret } from "~/components/Table";
import { TEAMS_AGGREGATE_REPORT } from "~/data/constants";
import { trimJobUrl } from "~/lib";

interface IJobsTableByTeamProps {
  tableData: any;
  tenant: string;
  tenantList: string[];
}

export const TeamsAggregateReportTable = (props: IJobsTableByTeamProps) => {
  let teams = Object.keys(props.tableData);

  const getTeamsRowSpan = (teamName: string, tableData: any) => {
    const teamObj = tableData[teamName];

    const services = Object.keys(teamObj);
    const rowSpan = services.reduce((acc, val) => {
      acc = acc + Object.keys(teamObj[val]).length;
      return acc;
    }, 0);

    return rowSpan;
  };

  const getTeamsServicesRowSpan = (
    serviceName: string,
    teamName: string,
    tableData: any
  ) => {
    const serviceObj = tableData[teamName][serviceName];
    return Object.keys(serviceObj).length;
  };

  const getJobsRowSpan = (
    serviceName: string,
    teamName: string,
    jobName: string,
    tableData: any
  ) => {
    const jobNameObj = tableData[teamName][serviceName][jobName];
    return Object.keys(jobNameObj).length;
  };

  const getTeamsServices = (teamName: string, tableData: any) => {
    const teamObj = tableData[teamName];
    return Object.keys(teamObj);
  };

  const getServices = (teamName: string, service: string, tableData: any) => {
    const serviceObj = tableData[teamName][service];
    return Object.keys(serviceObj);
  };

  const getJobs = (
    teamName: string,
    service: string,
    jobName: string,
    tableData: any
  ) => {
    const jobObj = tableData[teamName][service][jobName];
    return Object.keys(jobObj);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeaderCaret
          headers={TEAMS_AGGREGATE_REPORT}
          hasCaret={false}
          hasSpareEndCoulmn={false}
        />
        <TableBody>
          {teams.map((teamName, idx) =>
            getTeamsServices(teamName, props.tableData).map(
              (service, indexService) =>
                getServices(teamName, service, props.tableData).map(
                  (jobname, idxJob) =>
                    getJobs(teamName, service, jobname, props.tableData).map(
                      (successrate, idxrate) => (
                        <>
                          <TableRow
                            key={teamName}
                            sx={{
                              //   border: "1px solid black",
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {!indexService && !idxJob && !idxrate ? (
                              <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                                rowSpan={getTeamsRowSpan(
                                  teamName,
                                  props.tableData
                                )}
                              >
                                <StyledTypography
                                  component={Link}
                                  to={`/teams/${teamName}`}
                                >
                                  {teamName}
                                </StyledTypography>
                              </StyledTableCell>
                            ) : null}
                            {!idxJob ? (
                              <StyledTableCell
                                align="center"
                                key={`${teamName}-${service}-${indexService}`}
                                rowSpan={getTeamsServicesRowSpan(
                                  service,
                                  teamName,
                                  props.tableData
                                )}
                              >
                                {trimJobUrl(service)}
                              </StyledTableCell>
                            ) : null}
                            {!idxrate ? (
                              <StyledTableCell
                                align="center"
                                key={`${teamName}-${service}-${jobname}-${idxJob}`}
                                rowSpan={getJobsRowSpan(
                                  service,
                                  teamName,
                                  jobname,
                                  props.tableData
                                )}
                              >
                                {trimJobUrl(jobname)}
                              </StyledTableCell>
                            ) : null}
                            <StyledTableCell align="center">
                              {
                                props.tableData[teamName][service][jobname][
                                  "success_rate"
                                ]
                              }
                            </StyledTableCell>
                          </TableRow>
                        </>
                      )
                    )
                )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  boxShadow: theme.shadows[1],
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  transition: "all 0.2s step-start",
  "&:hover": {
    textDecoration: "underline",
    opacity: "70%",
  },
  "&:active": {
    textDecoration: "underline",
    opacity: "50%",
  },
})) as typeof Typography;
