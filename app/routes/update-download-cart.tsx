import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { reportDwldCartCookie } from "~/services/cookies";
import { clickHandlerAddWidgetToCart } from "~/lib";

export async function loader() {
  return json("Method not allowed", { status: 405 });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectUrl = formData.get("redirectUrl");
  const widgetName = formData.get("widgetName");
  const actionType = formData.get("actionType");
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await reportDwldCartCookie.parse(cookieHeader);

  if (!cookie) {
    return redirect("/");
  }

  const cartValue = clickHandlerAddWidgetToCart(
    cookie.pdfDwldCart,
    typeof widgetName === "string" ? widgetName : null,
    typeof actionType === "string" ? actionType : null
  );

  return redirect(typeof redirectUrl === "string" ? redirectUrl : "/", {
    headers: {
      "Set-Cookie": await reportDwldCartCookie.serialize({
        pdfDwldCart: cartValue,
      }),
    },
  });
}
