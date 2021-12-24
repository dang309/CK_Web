import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";

// material
import {
  Stack,
  TextField,
  Container,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { AuthService } from "@services";

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isActiveLoadingBtn, setIsActiveLoadingBtn] = useState(false);

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Email không được trống!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setError("");
      setSuccessText("");
      const data = {
        Email: values.email,
      };
      window.localStorage.setItem("email-forgot-password", values.email);
      window.localStorage.setItem("open-reset-password-page", true);
      setIsActiveLoadingBtn(true);
      AuthService.FORGOT_PASSWORD(data)
        .then((resForgotPassword) => {
          if (resForgotPassword.result) {
            setSuccessText(resForgotPassword?.message);
          }
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
        })
        .finally(() => {
          setIsActiveLoadingBtn(false);
        });
      return null;
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ p: 2 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ width: "512px" }}>
              <Typography variant="h4">Lấy lại mật khẩu</Typography>
              {successText && (
                <Alert severity="success" elevation={6} variant="filled">
                  <div dangerouslySetInnerHTML={{ __html: successText }} />
                </Alert>
              )}
              {error && (
                <Alert severity="error" elevation={6} variant="filled">
                  {error}
                </Alert>
              )}
              <TextField
                fullWidth
                type="email"
                label="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onFocus={() => {
                  setSuccessText("");
                  setError("");
                }}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isActiveLoadingBtn}
              >
                Gửi
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Paper>
    </Container>
  );
}
