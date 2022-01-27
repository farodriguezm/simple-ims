import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import Layout from "src/components/globals/Layout";
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
} from "src/graphql/queries";
import { CancelIcon, DeleteIcon } from "src/utils/icons";

const Delete = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");
  const {
    query: { id },
    push,
  } = useRouter();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      input: {
        id,
      },
    },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const category: Category = data?.getCategory || {};

  const handleDelete = async () => {
    const { data } = await deleteCategory({
      variables: {
        input: {
          id,
        },
      },
      refetchQueries: [{ query: GET_CATEGORIES }],
    });

    push("/categories");
  };

  return (
    <Layout>
      <Container>
        <Grid sx={{ marginTop: "5rem" }}>
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardHeader title="Delete Category" />
              <CardContent>
                <Typography
                  variant={isTabletOrMobile ? "h4" : "h5"}
                  align="center"
                >
                  Are you sure to delete {category.name}?
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  endIcon={<CancelIcon />}
                  sx={{ marginRight: 1, marginBottom: 2 }}
                  onClick={() => push("/categories")}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  endIcon={<DeleteIcon />}
                  sx={{ marginRight: 1, marginBottom: 2 }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Delete;
