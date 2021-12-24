import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { AuthService } from "@services";

import { useDispatch } from "react-redux";

import { SHOW_NOTI } from "src/reducers/noti";
import { ACTIVE_LOADING, STOP_LOADING } from "src/reducers/loading";

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isActiveLoadingBtn, setIsActiveLoadingBtn] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
      .required("Mật khẩu không được trống!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp!")
      .required("Mật khẩu không khớp!"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setError("");
      setIsActiveLoadingBtn(true);
      const data = {
        Email: window.localStorage.getItem("email-forgot-password"),
        Password: values.password,
      };
      AuthService.RESET_PASSWORD(data)
        .then((resResetPwd) => {
          if (resResetPwd.result) {
            dispatch(ACTIVE_LOADING());
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: resResetPwd?.message,
                duration: 1000,
              })
            );
            setTimeout(() => {
              window.localStorage.removeItem("email-forgot-password");
              window.localStorage.removeItem("open-reset-password-page");
              window.location.href = "/auth";

              dispatch(STOP_LOADING());
            }, 2000);
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
            <Stack spacing={3} sx={{ width: "512px" }}>
              <Typography variant="h4">Đặt lại mật khẩu</Typography>

              {error && (
                <Alert severity="error" elevation={6} variant="filled">
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu mới"
                {...getFieldProps("password")}
                onFocus={() => {
                  setError("");
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                autoComplete="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                label="Xác nhận mật khẩu"
                {...getFieldProps("confirmPassword")}
                onFocus={() => setError("")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isActiveLoadingBtn}
              >
                Đặt lại
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Paper>
    </Container>
  );
}
