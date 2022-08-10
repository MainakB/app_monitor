import { createCookie } from "@remix-run/node";
import { JOBID_OVW_COOKIE } from "~/data/constants/cookies";

export const teamIdDetailsCookie = createCookie(JOBID_OVW_COOKIE, {
  httpOnly: true,
  maxAge: 60,
  path: "/",
  sameSite: "lax",
  secrets: ["s3cr3et1"],
  secure: true,
});
