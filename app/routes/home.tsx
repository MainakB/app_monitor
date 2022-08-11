import { Outlet, useOutletContext } from "@remix-run/react";

import { json } from "@remix-run/node";
import type { LoaderFunction, LoaderArgs } from "@remix-run/node";
import { reportDwldCartCookie } from "~/services/cookies";

// export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
//   const cookieHeader = request.headers.get("Cookie");
//   const cookie = await reportDwldCartCookie.parse(cookieHeader);

//   if (cookie) {
//     return json(
//       {},
//       {
//         headers: {
//           "Set-Cookie": await reportDwldCartCookie.serialize({
//             pdfDwldCart: cookie.pdfDwldCart,
//           }),
//         },
//       }
//     );
//   }
//   const pdfDwldCart: any = {};

//   return json(
//     {},
//     {
//       headers: {
//         "Set-Cookie": await reportDwldCartCookie.serialize({
//           pdfDwldCart,
//         }),
//       },
//     }
//   );
// };

export default function Home() {
  const data = useOutletContext() as any;
  return <Outlet context={data} />;
}
