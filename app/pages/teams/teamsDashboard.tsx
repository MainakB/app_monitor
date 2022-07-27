import React from "react";

import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamDetailsModal } from "./teamDetailsModal";
export const TeamsDashboard = () => {
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
      <TeamsTable setOpenTeamDetailsModal={setOpenTeamDetailsModal} />
    </>
  );
};
