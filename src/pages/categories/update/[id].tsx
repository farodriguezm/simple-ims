import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Layout from "src/components/globals/Layout";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
} from "src/graphql/queries";
import { CancelIcon, EditIcon } from "src/utils/icons";

const Update = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      input: {
        id,
      },
    },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const category: Category = data?.getCategory || {};

  const onSubmit = async (form: any) => {
    const { data } = await updateCategory({
      variables: {
        input: {
          ...form,
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
        <Grid sx={{ mt: "5rem" }}>
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardHeader title="Update Category" />
              <CardContent>
                <Box sx={{ marginY: 1 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={errors.name}
                    helperText={
                      errors.name && "Name is required and max length is 64"
                    }
                    defaultValue={category.name}
                    {...register("name", { required: true, maxLength: 64 })}
                  />
                </Box>
                <Box sx={{ marginY: 1 }}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={category.description}
                    {...register("description")}
                  />
                </Box>
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
                  color="warning"
                  size="large"
                  endIcon={<EditIcon />}
                  sx={{ marginRight: 1, marginBottom: 2 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Update;
