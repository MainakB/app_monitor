import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { dOvwCookie } from "~/services/cookies";

export async function loader() {
  return json("Method not allowed", { status: 405 });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectUrl = formData.get("redirectUrl");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  return redirect(typeof redirectUrl === "string" ? redirectUrl : "/", {
    headers: {
      "Set-Cookie": await dOvwCookie.serialize({
        startDate,
        endDate,
      }),
    },
  });
}
