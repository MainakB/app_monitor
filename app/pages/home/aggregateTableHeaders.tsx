import { styled } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TABLE_COLORS, FONT_COLORS } from "~/data/constants/colors";
import type { TEAMS_AGGREGATE_REPORT } from "~/data/constants";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";

interface ITableHeaderCaretProps {
  headers: typeof TEAMS_AGGREGATE_REPORT;
  tenant: string;
}

export const AggregateTableHeaders = ({
  headers,
  tenant,
}: ITableHeaderCaretProps) => {
  return (
    <StyledTableHead>
      <StyledTableRow key={`lndg-hdr-expd-rwspan`}>
        {[
          ...headers.PRIMARY.map((header: string, index: number) => (
            <StyledTableCell
              align="center"
              rowSpan={2}
              key={`${header}-lndg-hdr-${index}`}
            >
              {header}
            </StyledTableCell>
          )),
          <StyledTableCellTenant
            align="center"
            colSpan={3}
            key={`${tenant}-hdr-lndg-hdr}`}
          >
            {tenant.toUpperCase()}
          </StyledTableCellTenant>,
        ]}
      </StyledTableRow>
      <StyledTableRow key={`lndg-sub-hdr-expd-rwspan`}>
        {[
          ...headers.SECONDARY.map((header: string, index: number) => (
            <StyledTableCell
              align="center"
              key={`${header}-lndg-sbhdr-${index}`}
            >
              {header}
            </StyledTableCell>
          )),
        ]}
      </StyledTableRow>
    </StyledTableHead>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  align: "right",
  boxShadow: theme.shadows[1],
}));

const StyledTableCellTenant = styled(TableCell)(({ theme }) => ({
  align: "right",
  borderBottom: `1px solid ${FONT_COLORS.BORDERS_SEPERATORS}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "none",
  backgroundColor: TABLE_COLORS.TABLE_HEADER_ROW_PRIMARY,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightMedium,
}));
