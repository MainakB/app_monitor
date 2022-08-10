import { useState } from "react";
import { useLoaderData, Outlet, useOutletContext } from "@remix-run/react";
import type { TeamsOverview } from "~/services/teams";
import { getTeamsOverview } from "~/services/teams";

export const loader = () => {
  return getTeamsOverview();
};

export default function Teams() {
  const { pdfDwldCart } = useOutletContext() as any;
  const loaderData: TeamsOverview[] = useLoaderData();
  const [crumbs, setCrumbs] = useState(["Home"]);

  const data = {
    data: loaderData,
    crumbs,
    setCrumbs,
    pdfDwldCart,
  };

  return (
    <>
      <Outlet context={data} />
    </>
  );
}
