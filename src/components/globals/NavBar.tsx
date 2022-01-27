import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawerState, drawerWidthState } from "src/atoms/drawer";

const NavBar = () => {
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const drawerWidth = useRecoilValue(drawerWidthState);
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

  const toggleDrawer = () => {
    setDrawer((old) => !old);
  };

  return (
    <AppBar
      sx={{
        ...(drawer &&
          !isTabletOrMobile && { width: `calc(100% - ${drawerWidth}px)` }),
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ ...(drawer && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Simple IMS
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="account"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
