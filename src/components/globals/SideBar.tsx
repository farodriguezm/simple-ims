import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawerState, drawerWidthState } from "src/atoms/drawer";
import { useRouter } from "next/router";

const SideBar = () => {
  const { push } = useRouter();
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const drawerWidth = useRecoilValue(drawerWidthState);

  const toggleDrawer = () => {
    setDrawer((old) => !old);
  };

  const handleClick = (url: string) => {
    setDrawer((old) => !old);
    push(url);
  };

  return (
    <Drawer variant="persistent" open={drawer} anchor="left">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ width: drawerWidth }}>
        <ListItemButton onClick={() => handleClick("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick("/categories")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideBar;
