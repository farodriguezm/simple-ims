import { Box, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import Main from "./Main";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <CssBaseline />
      <NavBar />
      <SideBar />
      <Main>{children}</Main>
    </Box>
  );
};

export default Layout;
