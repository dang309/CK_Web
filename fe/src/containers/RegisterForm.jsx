import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";

import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";

//icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { AuthService } from "@services";

import { useDispatch } from "react-redux";

import Cookies from "js-cookie";

import _pick from "lodash/pick";

import { SET_USER_INFO, LOGIN } from "src/reducers/user";
import { SHOW_NOTI } from "src/reducers/noti";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Tên không được trống"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Email không được trống!"),
    password: Yup.string()
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
      .required("Mật khẩu không được trống!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu không khớp!"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const resRegister = await AuthService.REGISTER(data);
      if (resRegister.result) {
        const user = _pick(data, ["email", "password"]);
        const resLogin = await AuthService.LOGIN(user);
        if (!resLogin.result) {
          dispatch(
            SHOW_NOTI({
              status: "error",
              message: resLogin.message,
            })
          );
          return null;
        }
        Cookies.set("__N12-token", resLogin.data.token.jwt, {
          expires: new Date(resLogin.data.token.expires),
        });
        dispatch(SET_USER_INFO(resLogin.data));
        dispatch(LOGIN());
        dispatch(
          SHOW_NOTI({
            status: "success",
            message: resLogin.message,
          })
        );
        navigate("/");
        return null;
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ width: "512px" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Tên"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Mật khẩu"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Đăng ký
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
