import React from "react";

interface INoDataInRootTableMessageProps {
  parentType: string;
  style?: any;
  headers: any;
  keyName?: string;
  jobString: string;
  additionalMessage?: string;
}

export const NoDataInRootTableMessage = (
  props: INoDataInRootTableMessageProps
) => (
  //   props.parentType && props.parentType.toLowerCase() === "table"
  //     ? [
  //         <Table.Row textAlign="left" key={props.keyName || "no-data-table"}>
  //           <Table.Cell
  //             key={props.keyName ? `${props.keyName}-cell` : "no-data-table-cel"}
  //             colSpan={
  //               typeof props.headers === "number"
  //                 ? props.headers
  //                 : Array.isArray(props.headers)
  //                 ? props.headers.length
  //                 : Object.keys(props.headers).length
  //             }
  //           >{`No ${props.jobString ? `${props.jobString} data` : "data"} found.${
  //             props.additionalMessage ? props.additionalMessage : ""
  //           }`}</Table.Cell>
  //         </Table.Row>,
  //       ]
  //     : [
  <div
    key={props.keyName || "no-data-container"}
    style={{ ...(props.style ? props.style : {}), width: "100%" }}
  >{`No ${props.jobString ? `${props.jobString} data` : "data"} found. ${
    props.additionalMessage ? props.additionalMessage : ""
  }`}</div>
);
//   ];
