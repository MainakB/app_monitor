import { useLoaderData } from "@remix-run/react";
import { GeneralDashboardPage } from "~/pages/home";
import { getLandingOverview } from "~/services/landing";
import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { dOvwCookie } from "~/services/cookies";
import { getDefaultDate } from "~/lib";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await dOvwCookie.parse(cookieHeader);

  if (cookie) {
    return json({
      data: await getLandingOverview({
        start_time: cookie.startDate,
        end_time: cookie.endDate,
      }),
      startDate: cookie.startDate,
      endDate: cookie.endDate,
    });
  }
  const startDate = getDefaultDate({ start: true });
  const endDate = getDefaultDate({ start: false });

  return json(
    {
      data: await getLandingOverview({
        start_time: startDate,
        end_time: endDate,
      }),
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
