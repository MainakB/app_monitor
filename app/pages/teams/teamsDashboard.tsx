import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamDetailsModal } from "./teamDetailsModal";
import type { TeamsOverview } from "~/services/teams";
import { GenericBreadcrumbs } from "~/components/Breadcrumbs";
import { FONT_COLORS } from "~/data/constants/colors";

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
    <StyledWrapperBox>
      {props.title ? (
        <StyledPageTitleBox>{props.title}</StyledPageTitleBox>
      ) : null}
      <GenericBreadcrumbs />
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
    </StyledWrapperBox>
  );
};

const StyledWrapperBox = styled(Box)(({ theme }) => ({
  "-webkit-box-shadow": "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  padding: "20px",
  margin: "20px",
  flex: 4,
}));

const StyledPageTitleBox = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  marginBottom: "15px",
}));
