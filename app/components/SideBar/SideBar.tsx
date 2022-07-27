import * as React from "react";
import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Home from "@mui/icons-material/Home";
import DraftsIcon from "@mui/icons-material/Drafts";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import EngineeringIcon from "@mui/icons-material/Engineering";

import { SideBarContext } from "~/context";

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "none",
  borderRight: "0.5px solid #dcdbdb",
  marginTop: "20px",
  width: "100%",
  maxWidth: "300px",
  bgcolor: "background.paper",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flex: 1.5,
    flexDirection: "column",
  },
}));

const StyledLabels = styled(Typography)(({ theme }) => ({
  paragraph: true,
  color: "#999",
  fontSize: "13px",
  fontWeight: "bold",
  margin: "15px 0px 5px 5px",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: "#999",
  fontSize: "12px",
  fontWeight: "bold",
}));

// interface ISideBarProps extends React.HTMLAttributes<Element> {
//   //   title?: string;
//   // any props that come into the component
// }

export const SideBar = () => {
  const state = React.useContext(SideBarContext);
  // const [indexLocal, setIndexLocal] = React.useState(state.sideBarIndex);

  const handleListItemClick = (
    event: React.MouseEventHandler<HTMLDivElement>,
    index: number
  ) => {
    // setIndexLocal(index);

    state.setSideBarIndex(index);
  };

  const leftNavListProps = (title: string) => {
    switch (title) {
      case "Home":
        return {
          index: 0,
          icon: <Home />,
        };
      case "Teams Dashboard":
        return {
          index: 1,
          icon: <GroupsOutlinedIcon />,
        };
      case "Jobs Dashboard":
        return {
          index: 2,
          icon: <EngineeringIcon />,
        };
      default:
        return {
          index: 0,
          icon: <Filter1OutlinedIcon />,
        };
    }
  };

  const getLeftNav = (
    indexLocalvalue: number,
    title: string,
    parentLabel?: string
  ) => {
    const propsRetrieved = leftNavListProps(title);
    return (
      <>
        {parentLabel ? <StyledLabels>{parentLabel}</StyledLabels> : null}
        <ListItemButton
          selected={indexLocalvalue === propsRetrieved.index}
          onClick={(event: any) =>
            handleListItemClick(event, propsRetrieved.index)
          }
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
        {getLeftNav(state.sideBarIndex, "Home", "HOME")}
        {getLeftNav(state.sideBarIndex, "Teams Dashboard", "TEAMS")}
        {getLeftNav(state.sideBarIndex, "Jobs Dashboard", "JOBS")}
      </List>
    </BoxStyled>
  );
};
