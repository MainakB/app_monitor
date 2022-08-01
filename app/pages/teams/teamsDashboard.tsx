import React from "react";

import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamDetailsModal } from "./teamDetailsModal";
import type { TeamsOverview } from "~/services/teams";

interface ITeamsDashboardProps extends React.HTMLAttributes<Element> {
  tableData: TeamsOverview[];
  title?: string;
}
export const TeamsDashboard = (props: ITeamsDashboardProps) => {
  const [openTeamDetailsModal, setOpenTeamDetailsModal] = React.useState([
    false,
    "",
  ]);

  const [teamsCrumbsStack, setTeamsCrumbsStack] = React.useState(["Home"]);

  return (
    <>
      {openTeamDetailsModal[0] ? (
        <TeamDetailsModal
          open={openTeamDetailsModal[0] as boolean}
          team={openTeamDetailsModal[1] as string}
          setOpen={setOpenTeamDetailsModal}
        />
      ) : null}
      <TeamsTable
        title={props.title}
        tableData={props.tableData}
        setOpenTeamDetailsModal={setOpenTeamDetailsModal}
      />
    </>
  );
};
