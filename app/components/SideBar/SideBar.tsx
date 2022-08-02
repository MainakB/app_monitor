import { Link, useLocation, useNavigate } from "@remix-run/react";

import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Home from "@mui/icons-material/Home";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { FONT_COLORS } from "~/data/constants/colors";

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "none",
  borderRight: "0.5px solid #dcdbdb",
  marginTop: "20px",
  width: "100%",
  maxWidth: "300px",
  bgcolor: "background.paper",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    minWidth: "250px",
    width: "250px",
    // flex: 1.5,
    flexDirection: "column",
  },
}));

const StyledLabels = styled(Typography)(({ theme }) => ({
  paragraph: true,
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  fontSize: "13px",
  fontWeight: theme.typography.fontWeightBold,
  margin: "15px 0px 5px 5px",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: FONT_COLORS.HEADERS_LABELS_PLACEHOLDERS,
  fontSize: "12px",
  fontWeight: theme.typography.fontWeightBold,
}));

export const SideBar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const leftNavListProps = (title: string, pathValue: string) => {
    switch (title) {
      case "Home":
        return {
          path: "/home",
          icon: <Home />,
        };
      case "Teams Dashboard":
        return {
          path: pathValue.match(/^\/teams\/.+$/g) ? pathValue : "/teams",
          icon: <GroupsOutlinedIcon />,
        };
      case "Jobs Dashboard":
        return {
          path: "/jobs",
          icon: <EngineeringIcon />,
        };
      default:
        return {
          index: "/",
          icon: <Filter1OutlinedIcon />,
        };
    }
  };

  const getLeftNav = (
    pathValue: string,
    title: string,
    parentLabel?: string
  ) => {
    const propsRetrieved = leftNavListProps(title, pathValue);
    return (
      <>
        {parentLabel ? <StyledLabels>{parentLabel}</StyledLabels> : null}
        <ListItemButton
          component={Link}
          to={`${propsRetrieved.path}`}
          selected={pathValue === propsRetrieved.path}
        >
          <ListItemIcon>{propsRetrieved.icon}</ListItemIcon>
          <StyledListItemText primary={title} />
        </ListItemButton>
      </>
    );
  };

  return (
    <BoxStyled>
      <List component="nav" aria-label="main mailbox folders">
        {getLeftNav(location.pathname, "Home", "HOME")}
        {getLeftNav(location.pathname, "Teams Dashboard", "TEAMS")}
        {getLeftNav(location.pathname, "Jobs Dashboard", "JOBS")}
      </List>
    </BoxStyled>
  );
};
