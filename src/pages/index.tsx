import { Grid, Typography, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Layout from "src/components/globals/Layout";

const Index: NextPage = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

  return (
    <Layout>
      <Grid container sx={{ marginTop: "5rem", justifyContent: "center" }}>
        <Typography variant={isTabletOrMobile ? "h2" : "h1"}>
          Home Page
        </Typography>
      </Grid>
    </Layout>
  );
};

export default Index;
