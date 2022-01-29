import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { GET_CATEGORIES } from "src/graphql/queries";
import { AddIcon, EditIcon, DeleteIcon } from "src/utils/icons";
import Layout from "src/components/globals/Layout";
import { useQuery } from "@apollo/client";
import { useSetRecoilState } from "recoil";
import { loaderState } from "src/atoms/loader";
import { useEffect } from "react";

const Index = () => {
  const setLoaderState = useSetRecoilState(loaderState);
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const categories = data?.getCategories || [];
  const router = useRouter();

  const renderActionButtons = (params: GridRenderCellParams) => {
    return (
      <Box>
        <IconButton
          color="warning"
          aria-label="edit"
          onClick={() => router.push(`/categories/update/${params.row.id}`)}
        >
          <EditIcon fontSize={isTabletOrMobile ? "small" : "large"} />
        </IconButton>
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => router.push(`/categories/delete/${params.row.id}`)}
        >
          <DeleteIcon fontSize={isTabletOrMobile ? "small" : "large"} />
        </IconButton>
      </Box>
    );
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      hide: isTabletOrMobile,
    },
    {
      field: "id",
      headerName: "Options",
      flex: 0.5,
      renderCell: renderActionButtons,
    },
  ];

  useEffect(() => {
    setLoaderState(loading);
    return () => {};
  }, [loading]);

  return (
    <Layout>
      <Container>
        <Grid sx={{ mt: "5rem" }}>
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardHeader
                title="List of Categories"
                action={
                  <IconButton
                    color="success"
                    aria-label="add"
                    onClick={() => router.push("/categories/add")}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                }
              />
              <CardContent>
                <DataGrid
                  autoHeight
                  rows={categories}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[6, 10]}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Index;
