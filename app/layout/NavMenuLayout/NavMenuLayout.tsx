import { useContext } from "react";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";

import { SideBar } from "~/components/SideBar";
import { NavBar } from "~/components/NavBar";

interface INavMenuLayoutProps extends React.HTMLAttributes<Element> {
  children: ReactNode;

  //   title?: string;
  // any props that come into the component
}

export const NavMenuLayout = ({ children, ...props }: INavMenuLayoutProps) => {
  // const spinnerState = useContext(SpinnerContext);

  return (
    <div>
      <NavBar />
      <Stack direction="row" sx={{ padding: "8px" }}>
        <SideBar />
        {children}
      </Stack>
    </div>
  );
};
