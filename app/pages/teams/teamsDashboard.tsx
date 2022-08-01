import React, { useEffect } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamsDashboardWrapper } from "~/layout/TeamModalLayout";
import { TeamDetailsModal } from "./teamDetailsModal";
import type { TeamsOverview } from "~/services/teams";
import { GenericBreadcrumbs } from "~/components/Breadcrumbs";
import { FONT_COLORS } from "~/data/constants/colors";
import { TeamDetailsById } from "~/pages/teams";

interface ITeamsDashboardProps extends React.HTMLAttributes<Element> {
  tableData?: TeamsOverview[];
  crumbs: string[];
  teamName?: string;
  setCrumbs: Function;
  title?: string;
}
export const TeamsDashboard = (props: ITeamsDashboardProps) => {
  const [openTeamDetailsModal, setOpenTeamDetailsModal] = React.useState([
    false,
    "",
  ]);

  useEffect(() => {
    console.log("test", props.crumbs);
    if (props.teamName) {
      props.setCrumbs([...props.crumbs, props.teamName]);
    }
  }, []);

  return (
    <TeamsDashboardWrapper
      title={props.title}
      crumbs={props.crumbs}
      setCrumbs={props.setCrumbs}
    >
      {/* {openTeamDetailsModal[0] ? (
        <TeamDetailsModal
          open={openTeamDetailsModal[0] as boolean}
          team={openTeamDetailsModal[1] as string}
          setOpen={setOpenTeamDetailsModal}
        />
      ) : null} */}
      {props.crumbs.length === 2 ? (
        <TeamDetailsById teamName={props.teamName as string} />
      ) : null}
      {props.crumbs.length === 1 && props.crumbs[0] === "Home" ? (
        <TeamsTable
          title={props.title}
          tableData={props.tableData as TeamsOverview[]}
          crumbs={props.crumbs}
          setCrumbs={props.setCrumbs}
          setOpenTeamDetailsModal={setOpenTeamDetailsModal}
        />
      ) : null}
    </TeamsDashboardWrapper>
  );
};
