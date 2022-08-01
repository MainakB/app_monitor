import { styled } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
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
}: ITableHeaderCaretProps) => {
  const rowsCount = (Array(1) as number[]).fill(0);

  return (
    <StyledTableHead>
      <StyledTableRow key={`lndg-hdr-expd-rwspan`}>
        {[
          ...headers.map((header: string, index: number) => (
            <StyledTableCell
              align="left"
              colSpan={!index && hasCaret ? 2 : 1}
              key={`${header}-lndg-hdr-${index}`}
            >
              {header}
            </StyledTableCell>
          )),
          hasSpareEndCoulmn ? (
            <StyledTableCell
              align="left"
              key={`${caretKey}-spare-end-col`}
            ></StyledTableCell>
          ) : null,
        ]}
      </StyledTableRow>
    </StyledTableHead>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  align: "right",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "none",
  backgroundColor: TABLE_COLORS.TABLE_HEADER_ROW_PRIMARY,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightMedium,
}));
