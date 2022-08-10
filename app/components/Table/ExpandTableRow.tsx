// import * as React from "react";
// import { styled } from "@mui/material";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import { TeamContext } from "~/context";

// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

// interface IExpandableTableRow extends React.HTMLAttributes<Element> {
//   children: React.ReactNode;
//   teamName: string;
//   expandComponent: any;
//   expand_key: string;
//   otherProps?: any;
// }

// export const ExpandableTableRow = ({
//   children,
//   teamName,
//   expandComponent,
//   expand_key,
//   ...otherProps
// }: IExpandableTableRow) => {
//   // const [isExpanded, setIsExpanded] = React.useState({} as any);
//   const teamState = React.useContext(TeamContext);

//   const setExpanded = (event: any, team: string) => {
//     teamState.setExpandedForTeam(
//       team,
//       teamState.expanded !== undefined && teamState.expanded[team] !== undefined
//         ? !teamState.expanded[team]
//         : true
//     );
//   };

//   return (
//     <>
//       <TableRow
//         {...otherProps}
//         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//       >
//         <TableCell padding="checkbox">
//           <IconButton onClick={(event: any) => setExpanded(event, teamName)}>
//             {teamState &&
//             teamState.expanded !== undefined &&
//             (teamState.expanded as any)[teamName] ? (
//               <KeyboardArrowUpOutlinedIcon />
//             ) : (
//               <KeyboardArrowDownOutlinedIcon />
//             )}
//           </IconButton>
//         </TableCell>
//         {children}
//       </TableRow>
//       {teamState &&
//         teamState.expanded !== undefined &&
//         (teamState.expanded as any)[teamName] && (
//           <TableRow>
//             <TableCell padding="checkbox" />
//             {expandComponent}
//           </TableRow>
//         )}
//     </>
//   );
// };

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
import { GLOBALBOXSHADOW } from "~/data/constants/colors";
import { useGetContext } from "~/hooks/contexts";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { FONT_COLORS } from "~/data/constants/colors";

interface IExpandableTableRow extends React.HTMLAttributes<Element> {
  children: React.ReactNode;
  keyValue: string;
  expandComponent: any;
  expandKey: string;
  // stateContext?: string;
  otherProps?: any;
}

export const ExpandableTableRow = ({
  children,
  keyValue,
  expandComponent,
  expandKey,
  // stateContext,
  ...otherProps
}: IExpandableTableRow) => {
  const [isExpanded, setIsExpanded] = React.useState({} as any);
  // const state = useGetContext(stateContext);

  const setExpanded = (event: any, keyValue: string) => {
    event.preventDefault();
    setIsExpanded({
      ...isExpanded,
      [keyValue]: isExpanded[keyValue] ? !isExpanded[keyValue] : true,
    });
    // state.setExpandedForTeam(
    //   keyValue,
    //   state.expanded !== undefined && state.expanded[keyValue] !== undefined
    //     ? !state.expanded[keyValue]
    //     : true
    // );
  };

  return (
    <>
      <TableRow
        {...otherProps}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell padding="checkbox">
          <IconButton onClick={(event: any) => setExpanded(event, keyValue)}>
            {isExpanded && (isExpanded as any)[keyValue] ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (isExpanded as any)[keyValue] && (
        <StyledTableRowWrapper>
          {/* <TableCell padding="checkbox" /> */}
          {expandComponent}
        </StyledTableRowWrapper>
      )}
    </>
  );
};

const StyledTableRowWrapper = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${FONT_COLORS.BORDERS_SEPERATORS}`,
  boxShadow: GLOBALBOXSHADOW,
}));
