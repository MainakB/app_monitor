import { useLoaderData } from "@remix-run/react";
import { GeneralDashboardPage } from "~/pages/home";
import { getLandingOverview } from "~/services/landing";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { dOvwCookie } from "~/services/cookies";
import { getDateStringFromTimestamp } from "~/lib";
import { DEFUALTTIMERANGE } from "~/data/constants/timeranges";

const getDefaultDate = ({ start }: { start: boolean }) => {
  const timeArgs: number[] = start ? [0, 0, 0, 0] : [23, 59, 59, 59];
  return getDateStringFromTimestamp(
    (() => {
      const d = new Date();
      d.setHours(timeArgs[0], timeArgs[1], timeArgs[2], timeArgs[3]);
      return d;
    })(),
    start ? DEFUALTTIMERANGE : 0
  );
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const [cookie, data] = await Promise.all([
    dOvwCookie.parse(cookieHeader),
    getLandingOverview(),
  ]);

  if (cookie) {
    return json({
      data,
      startDate: cookie.startDate,
      endDate: cookie.endDate,
    });
  }
  const startDate = getDefaultDate({ start: true });
  const endDate = getDefaultDate({ start: false });

  return json(
    {
      data,
      startDate,
      endDate,
    },
    {
      headers: {
        "Set-Cookie": await dOvwCookie.serialize({
          startDate,
          endDate,
        }),
      },
    }
  );
};

export default function HomeIndex() {
  const loaderData: any = useLoaderData<typeof loader>();

  return (
    <GeneralDashboardPage
      tableData={loaderData.data.teamsOvw}
      startDate={loaderData.startDate}
      endDate={loaderData.endDate}
      aggReportData={loaderData.data.reportAggregate}
    />
  );
}
