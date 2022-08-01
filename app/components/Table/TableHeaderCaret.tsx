import { styled } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableCrumbs } from "./TableCrumbs";
import { TABLE_COLORS } from "~/data/constants/colors";

interface ITableHeaderCaretProps {
  headers: string[];
  hasCaret?: boolean;
  caretKey?: string;
  hasSpareEndCoulmn?: boolean;
  topAdditionalRow?: number;
}

export const TableHeaderCaret = ({
  headers,
  hasCaret,
  caretKey,
  hasSpareEndCoulmn,
  topAdditionalRow,
}: ITableHeaderCaretProps) => {
  const rowsCount = (Array(topAdditionalRow || 1) as number[]).fill(0);

  return (
    <StyledTableHead hasTop={rowsCount.length > 1}>
      {rowsCount.map((val, idx) =>
        idx === rowsCount.length - 1 ? (
          <StyledTableRow
            key={`lndg-hdr-expd-rwspan-${idx}`}
            hasTop={rowsCount.length > 1}
          >
            {[
              ...headers.map((header: string, index: number) => (
                <StyledTableCell
                  colSpan={!index && hasCaret ? 2 : 1}
                  hasTop={rowsCount.length > 1}
                  key={`${header}-lndg-hdr-${index}`}
                >
                  {header}
                </StyledTableCell>
              )),
              hasSpareEndCoulmn ? (
                <StyledTableCell
                  hasTop={rowsCount.length > 1}
                  key={`${caretKey}-spare-end-col`}
                ></StyledTableCell>
              ) : null,
            ]}
          </StyledTableRow>
        ) : (
          <StyledTableRow
            key={`lndg-hdr-expd-rwspan-crmbs-${idx}`}
            hasTop={rowsCount.length > 1}
          >
            {/* {hasCaret ? (
              <StyledTableCell
                hasTop={rowsCount.length > 1}
                key={caretKey}
              ></StyledTableCell>
            ) : (
              <></>
            )} */}
            <StyledTableCell
              colSpan={
                headers.length +
                (hasCaret ? 1 : 0) +
                (hasSpareEndCoulmn ? 1 : 0)
              }
            >
              <TableCrumbs />
            </StyledTableCell>
          </StyledTableRow>
        )
      )}
    </StyledTableHead>
  );
};

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "hasTop",
})<{ hasTop?: boolean }>(({ theme, hasTop }) => ({
  paddingTop: hasTop ? "12px" : "14px",
  borderBottom: hasTop ? "none" : "inherit",
  paddingBottom: hasTop ? "0px" : "14px",
  align: "right",
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "hasTop",
})<{ hasTop?: boolean }>(({ theme, hasTop }) => ({
  borderBottom: "none",
  backgroundColor: TABLE_COLORS.TABLE_HEADER_ROW_PRIMARY,
}));

const StyledTableHead = styled(TableHead, {
  shouldForwardProp: (prop) => prop !== "hasTop",
})<{ hasTop?: boolean }>(({ theme, hasTop }) => ({
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightMedium,
}));
