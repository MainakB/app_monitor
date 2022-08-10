import { redirect } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { reportDwldCartCookie } from "~/services/cookies";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await reportDwldCartCookie.parse(cookieHeader);

  if (cookie) {
    return redirect("/home", {
      headers: {
        "Set-Cookie": await reportDwldCartCookie.serialize({
          pdfDwldCart: cookie.pdfDwldCart,
        }),
      },
    });
  }
  const pdfDwldCart: string[] = [];

  return redirect("/home", {
    headers: {
      "Set-Cookie": await reportDwldCartCookie.serialize({
        pdfDwldCart,
      }),
    },
  });
};

// export default function Index() {
//   return <></>;
// }
