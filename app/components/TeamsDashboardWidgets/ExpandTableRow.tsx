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
import IconButton from "@mui/material/IconButton";
import { TeamContext } from "~/context";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

interface IExpandableTableRow extends React.HTMLAttributes<Element> {
  children: React.ReactNode;
  teamName: string;
  expandComponent: any;
  otherProps?: any;
}

export const ExpandableTableRow = ({
  children,
  teamName,
  expandComponent,
  ...otherProps
}: IExpandableTableRow) => {
  // const [isExpanded, setIsExpanded] = React.useState({} as any);
  const teamState = React.useContext(TeamContext);

  const setExpanded = (event: any, team: string) => {
    teamState.setExpandedForTeam(team);
    console.log("test", teamState);
  };

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={(event: any) => setExpanded(event, teamName)}>
            {teamState &&
            teamState.expanded !== undefined &&
            (teamState.expanded as any)[teamName] ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {teamState &&
        teamState.expanded !== undefined &&
        (teamState.expanded as any)[teamName] && (
          <TableRow>
            <TableCell padding="checkbox" />
            {expandComponent}
          </TableRow>
        )}
    </>
  );
};

//   return (
//     <>
//       <TableRow {...otherProps}>
//         <TableCell padding="checkbox">
//           <IconButton
//             onClick={(event: any) => setExapndedForTeam(event, teamName)}
//           >
//             {isExpanded[teamName] ? (
//               <KeyboardArrowUpOutlinedIcon />
//             ) : (
//               <KeyboardArrowDownOutlinedIcon />
//             )}
//           </IconButton>
//         </TableCell>
//         {children}
//       </TableRow>
//       {isExpanded[teamName] && (
//         <TableRow>
//           <TableCell padding="checkbox" />
//           {expandComponent}
//         </TableRow>
//       )}
//     </>
//   );
// };
