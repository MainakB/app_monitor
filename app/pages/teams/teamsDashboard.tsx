import React, { useEffect } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { TeamsTable } from "~/components/TeamsDashboardWidgets";
import { TeamsDashboardWrapper } from "~/layout/TeamModalLayout";
import { TeamDetailsModal } from "./teamDetailsModal";
import type { TeamsOverview, TeamBriefSummary } from "~/services/teams";

import { GenericBreadcrumbs } from "~/components/Breadcrumbs";
import { FONT_COLORS } from "~/data/constants/colors";
import { TeamDetailsById } from "~/pages/teams";
import {
  LANDING_PAGE_TEAMS_TABLE_TITLE,
  LANDING_PAGE_TEAM_DETAIL_TITLE,
} from "~/data";

interface ITeamsDashboardProps extends React.HTMLAttributes<Element> {
  tableData?: TeamsOverview[];
  crumbs: string[];
  teamName?: string;
  setCrumbs: Function;
  summaryWidgetData?: TeamBriefSummary;
}

export const TeamsDashboard = (props: ITeamsDashboardProps) => {
  useEffect(() => {
    if (props.teamName) {
      props.setCrumbs([...props.crumbs, props.teamName]);
    }
  }, []);

  const resolveTitle = (crumbs: string[], teamname: string | undefined) =>
    crumbs && crumbs.length > 1
      ? `${LANDING_PAGE_TEAM_DETAIL_TITLE} : ${teamname?.toUpperCase()}`
      : LANDING_PAGE_TEAMS_TABLE_TITLE;

  return (
    <TeamsDashboardWrapper
      title={resolveTitle(props.crumbs, props.teamName)}
      crumbs={props.crumbs}
      setCrumbs={props.setCrumbs}
    >
      {props.crumbs.length === 2 ? (
        <TeamDetailsById
          teamName={props.teamName as string}
          summaryWidgetData={props.summaryWidgetData || null}
        />
      ) : null}
      {props.crumbs.length === 1 && props.crumbs[0] === "Home" ? (
        <TeamsTable
          title={resolveTitle(props.crumbs, props.teamName)}
          tableData={props.tableData as TeamsOverview[]}
          crumbs={props.crumbs}
          setCrumbs={props.setCrumbs}
        />
      ) : null}
    </TeamsDashboardWrapper>
  );
};
