import React from "react";
import { styled } from "@mui/material";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { getPaginatedRows } from "~/lib";

type IRowTypes = {
  value: string;
  type: string;
  onClickHandler?: Function;
  fnArgs?: Function;
};

interface ITableBodySetterProps {
  args: {
    rowsPerPage: number;
    rows: any[] | null;
    page: number;
    keyOrder: IRowTypes[];
    keyValue: string;
  };
}

export const TableBodySetter = (props: ITableBodySetterProps) => {
  const { rowsPerPage, rows, page, keyValue, keyOrder } = props.args;
  const tableData = getPaginatedRows(rowsPerPage, rows, page);

  return (
    <TableBody>
      {tableData && tableData.length
        ? tableData.map((row: any) => (
            <TableRow key={keyValue}>
              {keyOrder.map((rowType: IRowTypes, index: number) =>
                !index ? (
                  <TableCell
                    key={`${keyValue}-${rowType.value}`}
                    component="th"
                    scope="row"
                  >
                    {row[rowType.value]}
                  </TableCell>
                ) : rowType.type === "button" && rowType.onClickHandler ? (
                  <TableCell align="center">
                    <StyledButton
                      onClick={(event: any) =>
                        (rowType.onClickHandler as Function)(
                          event,
                          rowType.fnArgs ? rowType.fnArgs(row) : undefined
                        )
                      }
                      size="small"
                    >
                      Details
                    </StyledButton>
                  </TableCell>
                ) : (
                  <TableCell
                    key={`${keyValue}-${rowType.value}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    {row[rowType.value]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))
        : null}
    </TableBody>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "10px",
}));
