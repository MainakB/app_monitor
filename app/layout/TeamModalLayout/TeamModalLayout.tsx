import { ReactNode } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { TeamModalSideBar } from "~/components/TeamModal";
import { DateRangeText } from "~/components/Time";
import { FONT_COLORS } from "~/data/constants/colors";

interface ITeamModalLayoutProps extends React.HTMLAttributes<Element> {
  children: ReactNode;
  setModalNavIndex: Function;
  modalNavIndex: number;
  team: string;
}
export const TeamModalLayout = ({
  children,
  ...props
}: ITeamModalLayoutProps) => {
  return (
    <StyledModalWrapper>
      <StyledModalHeaderWrapper>
        <StyledModalTitleWrapper variant="h5">
          {props.team}
        </StyledModalTitleWrapper>
        <DateRangeText />
      </StyledModalHeaderWrapper>
      <Divider sx={{ color: "#999", opacity: "65%" }} />
      <StyledModalBodyWrapper direction="row">
        <TeamModalSideBar
          modalNavIndex={props.modalNavIndex}
          setModalNavIndex={props.setModalNavIndex}
        />
        {children}
      </StyledModalBodyWrapper>
    </StyledModalWrapper>
  );
};

const StyledModalWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledModalHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px 5px 15px 5px",
}));

const StyledModalTitleWrapper = styled(Typography)(({ theme }) => ({
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
}));

const StyledModalBodyWrapper = styled(Stack)(({ theme }) => ({
  marginTop: "15px",

  //   display: "flex",
  //   flexDirection: "column",
  //   backgroundColor: "yellow",
}));
