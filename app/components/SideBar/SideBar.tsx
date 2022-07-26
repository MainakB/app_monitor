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
      default:
        return {
          index: 0,
          icon: <Home />,
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
      </List>
      {/* <Divider /> */}
    </BoxStyled>

    // <BoxStyled>
    //   <List component="nav" aria-label="main mailbox folders">
    //     <ListItemButton
    //       selected={selectedIndex === 0}
    //       onClick={(event) => handleListItemClick(event, 0)}
    //     >
    //       <ListItemIcon>
    //         <InboxIcon />
    //       </ListItemIcon>
    //       <ListItemText primary="Inbox" />
    //     </ListItemButton>
    //     <ListItemButton
    //       selected={selectedIndex === 1}
    //       onClick={(event) => handleListItemClick(event, 1)}
    //     >
    //       <ListItemIcon>
    //         <DraftsIcon />
    //       </ListItemIcon>
    //       <ListItemText primary="Drafts" />
    //     </ListItemButton>
    //   </List>
    //   <Divider />
    //   <List component="nav" aria-label="secondary mailbox folder">
    //     <ListItemButton
    //       selected={selectedIndex === 2}
    //       onClick={(event) => handleListItemClick(event, 2)}
    //     >
    //       <ListItemText primary="Trash" />
    //     </ListItemButton>
    //     <ListItemButton
    //       selected={selectedIndex === 3}
    //       onClick={(event) => handleListItemClick(event, 3)}
    //     >
    //       <ListItemText primary="Spam" />
    //     </ListItemButton>
    //   </List>
    // </BoxStyled>
  );
};
