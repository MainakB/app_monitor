import { Link } from "@remix-run/react";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { AggregateTableHeaders } from "./aggregateTableHeaders";
import { TEAMS_AGGREGATE_REPORT } from "~/data/constants";

import { trimJobUrl } from "~/lib";

interface IJobsTableByTeamProps {
  tableData: any;
  tenant: string;
  tenantList: string[];
  tableRef: any;
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
    return Object.keys(jobNameObj).filter((val) => val === "success_rate")
      .length;
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
    return Object.keys(jobObj).filter((val) => val === "success_rate");
  };

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable
        aria-label="custom pagination table"
        ref={props.tableRef}
        id="table"
      >
        <AggregateTableHeaders
          headers={TEAMS_AGGREGATE_REPORT}
          tenant={props.tenant}
        />
        {/* <TableHeaderCaret headers={headers} /> */}
        <TableBody>
          {teams.map((teamName, idx) =>
            getTeamsServices(teamName, props.tableData).map(
              (service, indexService) =>
                getServices(teamName, service, props.tableData).map(
                  (jobname, idxJob) =>
                    getJobs(teamName, service, jobname, props.tableData).map(
                      (successrate, idxrate) => (
                        <TableRow
                          key={`${teamName}${idx}${service}${indexService}${jobname}${idxJob}${idxrate}-row${
                            Math.random() * 2000
                          }`}
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
                          <StyledTableCell align="center">
                            {
                              props.tableData[teamName][service][jobname][
                                "success_count"
                              ]
                            }
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {
                              props.tableData[teamName][service][jobname][
                                "total_count"
                              ]
                            }
                          </StyledTableCell>
                        </TableRow>
                      )
                    )
                )
            )
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  "-webkit-box-shadow": "2px 2px 8px 0px rgba(69, 68, 68, 0.47)",
})) as typeof TableContainer;

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 500,
  border: "none",
  // boxShadow: "20px 4px 10px 1px rgba(234, 18, 18, 0.47)",
  // // theme.shadows[1],
  // "-webkit-box-shadow": "2px 4px 10px 1px rgba(234, 18, 18, 0.47)",
}));

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
