import type { ReactNode } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";

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
  // -webkit-box-shadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  borderRadius: "10px",
  height: "100%",
}));
