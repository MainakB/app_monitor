import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ExpandableTableRow } from "~/components/Table";
import { DashboardExpandTableLayoutSelection } from "~/layout/DashboardLayouts";
interface IRowWrapperLayoutProps extends React.HTMLAttributes<Element> {
  children: React.ReactNode;
  hasCaret: boolean;
  keyValue: string;
  row: any;
  expandKey?: string;
  expandRowSpan?: number;
  stateContext?: string;
}

export const RowWrapperLayout = (props: IRowWrapperLayoutProps) => {
  const expandLayoutArgs = {
    keyValue: props.expandKey as string,
    header: props.row[props.keyValue] as string,
  };

  return props.hasCaret ? (
    <ExpandableTableRow
      key={props.row[props.keyValue]}
      keyValue={props.row[props.keyValue]}
      expandKey={props.expandKey as string}
      stateContext={props.stateContext as string}
      expandComponent={
        <TableCell colSpan={props.expandRowSpan || 3}>
          <DashboardExpandTableLayoutSelection args={expandLayoutArgs} />
        </TableCell>
      }
    >
      {props.children}
    </ExpandableTableRow>
  ) : (
    <TableRow key={`${props.keyValue}-row-wrapper`}>{props.children}</TableRow>
  );
};

export default RowWrapperLayout;
