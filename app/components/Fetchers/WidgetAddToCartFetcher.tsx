import type { ReactNode } from "react";
import { useFetcher, useLocation } from "@remix-run/react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface IWidgetAddToCartFetcherProps {
  startDate: string;
  endDate: string;
  pdfDwldCart: any;
  children: ReactNode;
  tooltipText?: string;
  redirectPath?: string;
  widgetId: string;
  widgetType: string;
  widgetName?: string;
}

export const WidgetAddToCartFetcher = (props: IWidgetAddToCartFetcherProps) => {
  const fetcher = useFetcher();
  const { pathname, search } = useLocation();

  return (
    <Tooltip title={props.tooltipText || "Add to downloadable report"}>
      <fetcher.Form
        method="post"
        action={props.redirectPath || "/update-download-cart"}
      >
        <input hidden name="redirectUrl" value={pathname + search} readOnly />
        <input hidden name="widgetId" value={props.widgetId} readOnly />
        <input
          hidden
          name="widgetName"
          value={props.widgetName || props.widgetId}
          readOnly
        />
        <input hidden name="widgetStartDate" value={props.startDate} readOnly />
        <input hidden name="widgetEndDate" value={props.endDate} readOnly />
        <input
          hidden
          name="actionType"
          value={
            Object.keys(props.pdfDwldCart).includes(props.widgetId)
              ? "remove"
              : "add"
          }
          readOnly
        />
        <input hidden name="widgetType" value={props.widgetType} readOnly />
        <IconButton type="submit">{props.children}</IconButton>
      </fetcher.Form>
    </Tooltip>
  );
};
