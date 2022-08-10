import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage(
    {
      cookie: {
        name: "papyrus",
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cr3et1"],
        secure: true,
      },
    },
  );

export { getSession, commitSession, destroySession };
