import React from "react";

import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamDetailsModal } from "./teamDetailsModal";

interface ITeamsDashboardProps {
  title?: string;
}
export const TeamsDashboard = (props: ITeamsDashboardProps) => {
  const [openTeamDetailsModal, setOpenTeamDetailsModal] = React.useState([
    false,
    "",
  ]);

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
        setOpenTeamDetailsModal={setOpenTeamDetailsModal}
      />
    </>
  );
};
