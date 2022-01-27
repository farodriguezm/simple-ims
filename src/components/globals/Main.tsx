import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { drawerState, drawerWidthState } from "src/atoms/drawer";

const Main = ({ children }: { children: ReactNode }) => {
  const drawer = useRecoilValue(drawerState);
  const drawerWidth = useRecoilValue(drawerWidthState);
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

  return (
    <Box
      sx={{
        marginTop: 6,
        ...(drawer && !isTabletOrMobile && { marginLeft: `${drawerWidth}px` }),
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
