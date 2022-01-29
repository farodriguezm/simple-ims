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
import { useSetRecoilState } from "recoil";
import { loaderState } from "src/atoms/loader";
import { useEffect } from "react";

const Update = () => {
  const setLoaderState = useSetRecoilState(loaderState);
  const {
    query: { id },
    push,
  } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const { loading } = useQuery(GET_CATEGORY, {
    variables: {
      input: {
        id: id ? id : "0",
      },
    },
    onCompleted: (data) => {
      if (data.getCategory) {
        setValue("name", data.getCategory.name, { shouldValidate: true });
        setValue("description", data.getCategory.description, {
          shouldValidate: true,
        });
      }
    },
  });

  const onSubmit = async (form: any) => {
    setLoaderState(true);

    await updateCategory({
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
                    defaultValue=" "
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
                    defaultValue=" "
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
