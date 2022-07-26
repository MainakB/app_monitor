import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

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
          ...headers.map((header: string, index: number) =>
            !index && hasCaret ? (
              <TableCell key={caretKey}></TableCell>
            ) : (
              <TableCell key={header}>{header}</TableCell>
            )
          ),
          hasSpareEndCoulmn ? (
            <TableCell key={`${caretKey}-spare-end-col`}></TableCell>
          ) : null,
        ]}
      </TableRow>
    </TableHead>
  );
};
