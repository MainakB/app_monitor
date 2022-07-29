import React from "react";
import { TeamDetails } from "~/components/TeamsDashboardWidgets";
import { TEAM_LANDING_TRENDS_KEY } from "~/data/constants/propKeys";

interface IDashboardExpandTableLayoutSelectionArgs {
  keyValue: string;
  header: string;
}

interface IDashboardExpandTableLayoutSelectionprops {
  args: IDashboardExpandTableLayoutSelectionArgs;
}

export const DashboardExpandTableLayoutSelection = (
  props: IDashboardExpandTableLayoutSelectionprops
) => {
  const { keyValue, header } = props.args;

  const getView = (keyValue: string) => {
    switch (keyValue) {
      case TEAM_LANDING_TRENDS_KEY:
        return <TeamDetails teamName={header} />;
      default:
        return <div>Hello default</div>;
    }
  };

  return getView(keyValue);
};
