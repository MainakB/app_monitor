import { useState } from "react";
import { useLoaderData, Outlet } from "@remix-run/react";
import type { TeamsOverview } from "~/services/teams";
import { getTeamsOverview } from "~/services/teams";

export const loader = () => {
  return getTeamsOverview();
};

export default function Teams() {
  const loaderData: TeamsOverview[] = useLoaderData();
  const [crumbs, setCrumbs] = useState(["Home"]);

  const data = {
    data: loaderData,
    crumbs,
    setCrumbs,
  };

  return (
    <>
      <Outlet context={data} />
    </>
  );
}
