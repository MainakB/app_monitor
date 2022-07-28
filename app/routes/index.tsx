import { Outlet } from "@remix-run/react";

import { redirect } from "@remix-run/node";

// export default function Home() {
//   return <LandingPage />;
// }

export const loader = () => {
  return redirect("/home");
};

export default function Index() {
  return <></>;
}
