// import { Box, styled } from "@mui/material";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// interface MenuBarProps {}

// const MenuBarStyled = styled(Box)(({ theme }) => ({
//   display: "none",
//   alignItems: "center",
//   gap: "20px",
//   [theme.breakpoints.up("sm")]:{}
// }));

// export const MenuBar = (props: MenuBarProps) => {
//   return (
//     // <Menu
//     //   id="basic-menu"
//     //   // anchorEl={anchorEl}
//     //   open={true}
//     //   // onClose={handleClose}
//     //   // MenuListProps={{
//     //   //   "aria-labelledby": "basic-button",
//     //   // }}
//     // >
//     //   <MenuItem>Profile</MenuItem>
//     //   <MenuItem>My account</MenuItem>
//     //   <MenuItem>Logout</MenuItem>
//     // </Menu>
//     <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
//       Hello
//       <div>Hello</div>
//       <div>Hello</div>
//       <div>Hello</div>
//       <div>Hello</div>
//       <div>Hello</div>
//       <div>Hello</div>
//     </Box>
//   );
// };

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

interface MenuBarProps {}

const MenuBarStyled = styled(Box)(({ theme }) => ({
  display: "none",
  // alignItems: "center",
  // gap: "20px",
  backgroundColor: "red",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flex: 1,

    flexDirection: "column",
  },
}));

export const MenuBar = (props: MenuBarProps) => {
  return (
    // <Menu
    //   id="basic-menu"
    //   // anchorEl={anchorEl}
    //   open={true}
    //   // onClose={handleClose}
    //   // MenuListProps={{
    //   //   "aria-labelledby": "basic-button",
    //   // }}
    // >
    //   <MenuItem>Profile</MenuItem>
    //   <MenuItem>My account</MenuItem>
    //   <MenuItem>Logout</MenuItem>
    // </Menu>
    <MenuBarStyled>
      {/* <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}> */}
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      {/* </Box> */}
    </MenuBarStyled>
  );
};
