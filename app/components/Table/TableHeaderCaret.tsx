import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material";

interface ITableHeaderCaretProps {
  headers: string[];
  hasCaret?: boolean;
  caretKey?: string;
  hasSpareEndCoulmn?: boolean;
}

export const TableHeaderCaret = ({
  headers,
  hasCaret,
  caretKey,
  hasSpareEndCoulmn,
}: ITableHeaderCaretProps) => {
  return (
    <TableHead>
      <TableRow>
        {[
          hasCaret ? <StyledTableCell key={caretKey}></StyledTableCell> : null,
          ...headers.map((header: string, index: number) => (
            <StyledTableCell key={header}>{header}</StyledTableCell>
          )),
          hasSpareEndCoulmn ? (
            <StyledTableCell
              key={`${caretKey}-spare-end-col`}
            ></StyledTableCell>
          ) : null,
        ]}
      </TableRow>
    </TableHead>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightMedium,

  // flex: 4,
}));
