import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Router from "./routes";

import { Snackbar, Alert, Dialog } from "@mui/material";

import { SET_ITEMS } from "src/reducers/cart";
import { HIDE_NOTI } from "src/reducers/noti";
import { SET_MEMBERS } from "src/reducers/group";
import { ACTIVE_LOADING, STOP_LOADING } from "src/reducers/loading";
import { LOGIN } from "src/reducers/user";

import { useSelector, useDispatch } from "react-redux";

import { Scrollbar, Loading } from "@components";

import { CartService, ProductService, CustomerService } from "@services";

import { COMMON } from "@utils";

import _pick from "lodash/pick";
import _uniqBy from "lodash/uniqBy";

import { red } from "@mui/material/colors";

import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();

  const noti = useSelector((state) => state.noti);
  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  );
  const cUser = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isActiveLoading = useSelector((state) => state.loading.isActive);
  const members = useSelector((state) => state.group.members);

  const handleCloseSnackbar = () => {
    dispatch(HIDE_NOTI());
  };

  const getItemsInCart = async () => {
    await COMMON.sleep(5000);
    CartService.GET_ALL_ITEMS_IN_CART(cUser.id)
      .then((resCart) => {
        if (resCart.result) {
          let promises = [];
          resCart.data.forEach(async (item) => {
            promises.push(ProductService.GET_PRODUCT_BY_ID(item.productId));
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
  };

  const getMembersInGroup = async () => {
    await COMMON.sleep(5000);
    if (cUser.group_id) {
      dispatch(ACTIVE_LOADING());
      CustomerService.GET_ALL_CUSTOMERS_IN_GROUP({
        group_id: cUser.group_id,
      })
        .then((res) => {
          dispatch(SET_MEMBERS(res.data));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(STOP_LOADING());
        });
    }
  };

  useEffect(() => {
    getMembersInGroup();
  }, []);

  useEffect(() => {
    const isAuth = Cookies.get("__N12-token") || "";
    if (isAuth) {
      dispatch(LOGIN());
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && members?.length > 1) {
      setInterval(getItemsInCart, 10000);
    }
  }, []);

  return (
    <Scrollbar>
      <Router />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={noti.show}
        autoHideDuration={noti.duration || 500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={noti.status || "info"}>{noti.message}</Alert>
      </Snackbar>
      {ReactDOM.createPortal(
        <Dialog
          open={isActiveLoading}
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          <Loading sx={{ color: red[200] }} />
        </Dialog>,
        document.getElementById("loading")
      )}
    </Scrollbar>
  );
}

export default App;
