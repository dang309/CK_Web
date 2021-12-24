import * as Yup from "yup";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";

import Cookies from "js-cookie";

import { useSelector } from "react-redux";

import { SET_USER_INFO, LOGIN } from "src/reducers/user";
import { SHOW_NOTI } from "src/reducers/noti";
import { SET_MEMBERS } from "src/reducers/group";
import { SET_ITEMS } from "src/reducers/cart";

import _pick from "lodash/pick";

import {
  AuthService,
  CartService,
  CustomerService,
  ProductService,
} from "@services";

import _uniqBy from "lodash/uniqBy";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isActiveLoadingBtn, setIsActiveLoadingBtn] = useState(false);

  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Email không được trống!"),
    password: Yup.string().required("Mật khẩu không được trống!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setError("");
      setIsActiveLoadingBtn(true);
      const user = {
        email: values.email,
        password: values.password,
      };
      AuthService.LOGIN(user)
        .then((res) => {
          if (!res.result) {
            return null;
          }
          Cookies.set("__N12-token", res.data.token.jwt, {
            expires: new Date(res.data.token.expires),
          });
          dispatch(SET_USER_INFO(res.data));
          dispatch(LOGIN());
          dispatch(
            SHOW_NOTI({
              status: "success",
              message: res.message,
            })
          );
          CartService.GET_ALL_ITEMS_IN_CART(res.data.id)
            .then((resCart) => {
              if (resCart.result) {
                let promises = [];
                resCart.data.forEach(async (item) => {
                  promises.push(
                    ProductService.GET_PRODUCT_BY_ID(item.productId)
                  );
                });
                Promise.all(promises)
                  .then((resProducts) => {
                    const products = resProducts.map((item) => {
                      if (item.result) return item.data[0];
                    });
                    let data = [];
                    for (let i = 0; i < resCart.data.length; i++) {
                      let temp = {
                        id:
                          itemsInCart.length === 0
                            ? 1
                            : itemsInCart[itemsInCart.length - 1].id + 1,
                        productId: products[i].id,
                        ..._pick(products[i], [
                          "name",
                          "thumbUrl",
                          "unitPrice",
                          "quantity",
                          "category",
                          "discount",
                        ]),
                        quantityInCart: resCart.data[i].quantityInCart,
                      };

                      data.push(temp);
                    }

                    dispatch(SET_ITEMS(data));
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
          if (res.data.group_id) {
            CustomerService.GET_ALL_CUSTOMERS_IN_GROUP({
              group_id: res.data.group_id,
            })
              .then((resCustomer) => {
                if (resCustomer.result) {
                  dispatch(SET_MEMBERS(resCustomer.data));
                }
              })
              .catch((err) => console.log(err));
          }
          navigate("/");
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

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ width: "360px" }}>
          {error && (
            <Alert severity="error" elevation={6} variant="filled">
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onFocus={() => setError("")}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Mật khẩu"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onFocus={() => setError("")}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/forgot-password"
          >
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isActiveLoadingBtn}
        >
          Đăng nhập
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
