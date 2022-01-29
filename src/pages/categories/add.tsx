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
import { Save as SaveIcon } from "@mui/icons-material";
import Layout from "src/components/globals/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ADD_CATEGORY, GET_CATEGORIES } from "src/graphql/queries";
import { useMutation } from "@apollo/client";
import { CancelIcon } from "src/utils/icons";
import { useSetRecoilState } from "recoil";
import { loaderState } from "src/atoms/loader";

const Add = () => {
  const setLoaderState = useSetRecoilState(loaderState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addCategory] = useMutation(ADD_CATEGORY);
  const { push } = useRouter();

  const onSubmit = async (form: any) => {
    setLoaderState(true);

    await addCategory({
      variables: {
        input: {
          ...form,
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
              <CardHeader title="Add new Category" />
              <CardContent>
                <Box sx={{ marginY: 1 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...register("name", { required: true, maxLength: 64 })}
                    error={errors.name}
                    helperText={
                      errors.name && "Name is required and max length is 64"
                    }
                  />
                </Box>
                <Box sx={{ marginY: 1 }}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
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
                  color="success"
                  size="large"
                  endIcon={<SaveIcon />}
                  sx={{ marginRight: 1, marginBottom: 2 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Add;
