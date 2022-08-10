import { createCookie } from "@remix-run/node";
import { DWNLD_CART_COOKIE } from "~/data/constants/cookies";

export const reportDwldCartCookie = createCookie(DWNLD_CART_COOKIE, {
  httpOnly: true,
  maxAge: 60,
  path: "/",
  sameSite: "lax",
  secrets: ["s3cr3et1"],
  secure: true,
});
