import { styled } from "@mui/material";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { getPaginatedRows } from "~/lib";
import { RowWrapperLayout } from "~/layout/TableLayouts";
import { trimJobUrl } from "~/lib";

type IRowTypes = {
  value: string;
  type: string;
  onClickHandler?: Function;
  fnArgs?: Function;
};

interface ITableBodySetterProps {
  args: {
    rowsPerPage: number;
    hasCaret: boolean;
    rows: any[] | null;
    page: number;
    keyOrder: IRowTypes[];
    keyValue: string;
    expandKey?: string;
    expandRowSpan?: number;
    stateContext?: string;
  };
}

export const TableBodySetter = (props: ITableBodySetterProps) => {
  const {
    rowsPerPage,
    rows,
    page,
    keyValue,
    keyOrder,
    hasCaret,
    expandKey,
    expandRowSpan,
    stateContext,
  } = props.args;
  const tableData = getPaginatedRows(rowsPerPage, rows, page);

  return (
    <TableBody>
      {tableData && tableData.length
        ? tableData.map((row: any) => (
            <RowWrapperLayout
              hasCaret={hasCaret}
              key={`${row[keyValue]}-row`}
              keyValue={keyValue}
              row={row}
              expandKey={expandKey}
              expandRowSpan={expandRowSpan}
              stateContext={stateContext}
            >
              {...keyOrder.map((rowType: IRowTypes, index: number) =>
                !index ? (
                  <TableCell
                    key={`${keyValue}-${rowType.value}`}
                    component="th"
                    scope="row"
                  >
                    {rowType.type === "link" ? (
                      <Link
                        href={row[rowType.value]}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        underline="hover"
                      >
                        {trimJobUrl(row[rowType.value])}
                      </Link>
                    ) : (
                      row[rowType.value]
                    )}
                  </TableCell>
                ) : rowType.type === "button" && rowType.onClickHandler ? (
                  <TableCell
                    key={`${keyValue}-${rowType.value}-spare`}
                    align="left"
                  >
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
                    {rowType.type === "link" ? (
                      <Link
                        href={row[rowType.value]}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        underline="hover"
                      >
                        {trimJobUrl(row[rowType.value])}
                      </Link>
                    ) : (
                      row[rowType.value]
                    )}
                  </TableCell>
                )
              )}
            </RowWrapperLayout>
          ))
        : null}
    </TableBody>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: "10px",
}));
