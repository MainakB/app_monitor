import * as React from "react";
import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Home from "@mui/icons-material/Home";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { FONT_COLORS } from "~/data/constants/colors";

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "none",
  borderRight: "0.5px solid #dcdbdb",
  marginTop: "20px",
  width: "100%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  [theme.breakpoints.up("sm")]: {
    marginTop: "0px",
    display: "flex",
    flexDirection: "column",
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "46px",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  fontWeight: theme.typography.fontWeightBold,
}));

interface ITeamModalSideBarProps extends React.HTMLAttributes<Element> {
  setModalNavIndex: Function;
  modalNavIndex: number;
  // any props that come into the component
}

export const TeamModalSideBar = (props: ITeamModalSideBarProps) => {
  const handleListItemClick = (index: number) => {
    props.setModalNavIndex(index);
  };

  const leftNavListProps = (title: string) => {
    switch (title) {
      case "Home":
        return {
          index: 0,
          icon: <Home />,
        };
      case "Jobs":
        return {
          index: 1,
          icon: <EngineeringIcon />,
        };
      case "Code Coverage":
        return {
          index: 2,
          icon: <IntegrationInstructionsIcon />,
        };
      default:
        return {
          index: 0,
          icon: <Filter1OutlinedIcon />,
        };
    }
  };

  const getLeftNav = (indexLocalvalue: number, title: string) => {
    const propsRetrieved = leftNavListProps(title);
    return (
      <>
        <ListItemButton
          // dense={true}
          selected={indexLocalvalue === propsRetrieved.index}
          onClick={() => handleListItemClick(propsRetrieved.index)}
        >
          <StyledListItemIcon>{propsRetrieved.icon}</StyledListItemIcon>
          <StyledListItemText
            primaryTypographyProps={{ fontSize: "16px" }}
            primary={title}
          />
        </ListItemButton>
        <Divider sx={{ color: "#999", opacity: "45%" }} />
      </>
    );
  };

  return (
    <BoxStyled>
      <List component="nav" aria-label="main mailbox folders">
        {getLeftNav(props.modalNavIndex, "Home")}

        {getLeftNav(props.modalNavIndex, "Jobs")}

        {getLeftNav(props.modalNavIndex, "Code Coverage")}
      </List>
    </BoxStyled>
  );
};
