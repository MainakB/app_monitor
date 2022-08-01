import { ReactNode } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { TeamModalSideBar } from "~/components/TeamModal";
import { DateRangeText } from "~/components/Time";
import { FONT_COLORS } from "~/data/constants/colors";

interface ITeamDetailsByIdProps extends React.HTMLAttributes<Element> {
  teamName: string;
}
export const TeamDetailsById = ({ teamName }: ITeamDetailsByIdProps) => {
  return <StyledContentWrapper></StyledContentWrapper>;
};

const StyledContentWrapper = styled(Box)(({ theme }) => ({
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
