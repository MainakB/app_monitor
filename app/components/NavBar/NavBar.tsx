import * as React from "react";
import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

const drawerWidth = 240;

interface INavBarProps {
  pdfDwldCart: any;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // window?: () => Window;
}

interface IWidgetType {
  id: string;
  range: string;
  widgetType: string;
}

export const NavBar = (props: INavBarProps) => {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VARIS
      </Typography>
      <Divider />
    </Box>
  );

  const rows: IWidgetType[] = Object.values(props.pdfDwldCart);

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            VARIS
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Tooltip
              title={
                Object.values(props.pdfDwldCart).length
                  ? "Open download cart"
                  : "Add charts to enable download report option"
              }
            >
              <span>
                <IconButton
                  disabled={Object.values(props.pdfDwldCart).length < 1}
                  size="large"
                  aria-label={`show ${
                    Object.values(props.pdfDwldCart).length
                  } new notifications`}
                  color="inherit"
                  onClick={handleOpenUserMenu}
                >
                  <Badge
                    badgeContent={Object.values(props.pdfDwldCart).length}
                    color="error"
                  >
                    <ShoppingCartCheckoutOutlinedIcon />
                  </Badge>
                </IconButton>
              </span>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <TableContainer component={Box}>
                <Table
                  sx={{ minWidth: 400, borderBottom: "none" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Chart Name</StyledTableCell>
                      <StyledTableCell align="center">
                        Date Selected
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.range}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <StyledTableCell rowSpan={2} colSpan={2} align="right">
                        <Button variant="contained"> Download</Button>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  boxShadow: theme.shadows[1],
}));
