import type { ReactNode } from "react";
import { useTransition } from "@remix-run/react";
import { Spinner } from "~/pages/spinner";

import {
  Links,
  Scripts,
  LiveReload,
  Meta,
  ScrollRestoration,
} from "@remix-run/react";

interface Props extends React.HTMLAttributes<Element> {
  children: ReactNode;
  //   title?: string;
  // any props that come into the component
}
export function ErrorBoundary(props: any) {
  console.error(props.error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export const DocumentLayout = ({ children }: Props) => {
  const { state } = useTransition();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {(state === "loading" || state === "submitting") && (
          <Spinner
            show={state === "loading"}
            backdropInvisible={true}
            size="regular"
          />
        )}
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
};
