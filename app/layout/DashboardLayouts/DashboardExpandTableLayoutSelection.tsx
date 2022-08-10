import React from "react";
import { TeamDetails } from "~/components/TeamsDashboardWidgets";
import { JobDetails } from "~/components/JobsDashboardWidgets";
import {
  TEAM_LANDING_TRENDS_KEY,
  JOB_LANDING_TRENDS_KEY,
} from "~/data/constants/propKeys";
import { DEFUALTTIMERANGE } from "~/data/constants/timeranges";
import {
  setDateWithDayStartTime,
  getDateStringFromTimestamp,
  trimJobUrl,
} from "~/lib/utils";

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
        return (
          <TeamDetails
            teamName={header}
            startDate={getDateStringFromTimestamp(
              setDateWithDayStartTime(),
              DEFUALTTIMERANGE
            )}
            endDate={getDateStringFromTimestamp(setDateWithDayStartTime())}
          />
        );
      case JOB_LANDING_TRENDS_KEY:
        return (
          <JobDetails
            jobName={header}
            startDate={getDateStringFromTimestamp(
              setDateWithDayStartTime(),
              DEFUALTTIMERANGE
            )}
            endDate={getDateStringFromTimestamp(setDateWithDayStartTime())}
          />
        );
      default:
        return <div>Hello default</div>;
    }
  };

  return getView(keyValue);
};
