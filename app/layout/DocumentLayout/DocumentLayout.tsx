import type { ReactNode } from "react";

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

export const DocumentLayout = ({ children }: Props) => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
    </body>
  </html>
);
