import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { reportDwldCartCookie } from "~/services/cookies";
import { downloadPdfHandler } from "~/services/pdfDownloader";

export async function loader() {
  return json("Method not allowed", { status: 405 });
}

export async function action({ request }: ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await reportDwldCartCookie.parse(cookieHeader);
  const formData = await request.formData();
  const redirectUrl = formData.get("redirectUrl");

  if (!cookie) {
    return redirect("/");
  }

  // await downloadPdfHandler(cookie.pdfDwldCart);
  const cartValue = {};

  return redirect(typeof redirectUrl === "string" ? redirectUrl : "/", {
    headers: {
      "Set-Cookie": await reportDwldCartCookie.serialize({
        pdfDwldCart: { ...cartValue },
      }),
    },
  });
}
