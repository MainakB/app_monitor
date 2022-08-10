import { useContext } from "react";
import type { ReactNode } from "react";

import { Stack } from "@mui/material";

import { SideBar } from "~/components/SideBar";
import { NavBar } from "~/components/NavBar";

interface INavMenuLayoutProps extends React.HTMLAttributes<Element> {
  children: ReactNode;
  pdfDwldCart: string[];
}

export const NavMenuLayout = ({
  children,
  pdfDwldCart,
}: INavMenuLayoutProps) => {
  return (
    <div>
      <NavBar pdfDwldCart={pdfDwldCart} />
      <Stack direction="row" sx={{ padding: "8px" }}>
        <SideBar />
        {children}
      </Stack>
    </div>
  );
};
