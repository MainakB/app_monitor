import type { ReactNode } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { GLOBALBOXSHADOW } from "~/data/constants/colors";
interface IBoxWidgetsLayoutProps {
  children: ReactNode;
}

export const BoxWidgetsLayout = ({ children }: IBoxWidgetsLayoutProps) => {
  return <StyledMiniWidgetWrapperBox>{children}</StyledMiniWidgetWrapperBox>;
};

const StyledMiniWidgetWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  flex: 1,
  padding: "5px",
  boxShadow: GLOBALBOXSHADOW,
  borderRadius: "10px",
  height: "100%",
}));
