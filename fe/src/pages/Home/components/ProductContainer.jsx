import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Grid,
  Container,
  Tabs,
  Tab,
  Stack,
  Skeleton,
} from "@mui/material";

import _get from "lodash/get";
import _pick from "lodash/pick";

import { ProductCard, Loading } from "@components";
import { COMMON, CONSTANT } from "@utils";
import { ProductService, CartService } from "@services";

import BorderAllIcon from "@mui/icons-material/BorderAll";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LiquorIcon from "@mui/icons-material/Liquor";
import NoFoodIcon from "@mui/icons-material/NoFood";
import CakeIcon from "@mui/icons-material/Cake";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import { useDispatch, useSelector } from "react-redux";

import { SHOW_NOTI } from "src/reducers/noti";

import _uniqBy from "lodash/uniqBy";
import { ACTIVE_LOADING, STOP_LOADING } from "src/reducers/loading";

function ProductContainer(props) {
  const dispatch = useDispatch();
  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentUser = useSelector((state) => state.user.user);

  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");

  const handleChangeCurrentTab = (event, newTab) => {
    setCategory(CONSTANT.CATEGORIES[newTab].code);
    setTab(newTab);
  };

  const getProducts = async (category = "all") => {
    const params = {
      limit: 999,
      skip: 1,
      category,
    };
    const res = await ProductService.GET_ALL_PRODUCTS(params);
    if (res.result) {
      const _products = _get(res, "data");
      setProducts(_products);
    }
  };

  const handleAddToCart = (product) => {
    if (itemsInCart.findIndex((item) => item.productId === product.id) > -1) {
      dispatch(
        SHOW_NOTI({
          status: "error",
          message: "Sản phẩm đã tồn tại trong giỏ hàng",
        })
      );
    } else {
      if (isLoggedIn) {
        let data = {
          productId: product.id,
          customerId: currentUser.id,
          quantityInCart: 1,
        };
        dispatch(ACTIVE_LOADING());
        CartService.ADD_ITEM_IN_CART(data)
          .then(() => {
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: "Thêm vào giỏ hàng thành công!",
              })
            );
          })
          .catch((err) => {
            dispatch(
              SHOW_NOTI({
                status: "error",
                message: err?.response?.data?.message,
              })
            );
          })
          .finally(() => dispatch(STOP_LOADING()));
      } else {
        dispatch(
          SHOW_NOTI({
            status: "success",
            message: "Thêm vào giỏ hàng thành công!",
          })
        );
      }
    }
  };

  useEffect(() => {
    getProducts(category);
  }, [category]);

  return (
    <Container maxWidth="xl" id="myId">
      <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChangeCurrentTab}
            aria-label="tabs category"
            centered
          >
            <Tab
              label="Tất cả"
              {...COMMON.a11yProps("category", 0)}
              icon={<BorderAllIcon />}
            />
            <Tab
              label="Đồ ăn"
              {...COMMON.a11yProps("category", 1)}
              icon={<RestaurantMenuIcon />}
            />
            <Tab
              label="Đồ uống"
              {...COMMON.a11yProps("category", 2)}
              icon={<LiquorIcon />}
            />
            <Tab
              label="Đồ chay"
              {...COMMON.a11yProps("category", 3)}
              icon={<NoFoodIcon />}
            />
            <Tab
              label="Bánh kem"
              {...COMMON.a11yProps("category", 4)}
              icon={<CakeIcon />}
            />
            <Tab
              label="Mỳ"
              {...COMMON.a11yProps("category", 5)}
              icon={<RamenDiningIcon />}
            />
            <Tab
              label="Đồ ăn nhanh"
              {...COMMON.a11yProps("category", 6)}
              icon={<LunchDiningIcon />}
            />
          </Tabs>
        </Box>
        <Box sx={{ p: 2 }}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            gap={2}
          >
            {products &&
              products.map((item) => {
                return (
                  <Grid
                    item
                    xs={5.5}
                    sm={3.5}
                    md={3.5}
                    lg={2.25}
                    key={item.id}
                    className="product-card"
                  >
                    <ProductCard
                      product={item}
                      handleAddToCart={() => handleAddToCart(item)}
                      seed={item.id}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {!products && (
            <Grid
              container
              alignItems="flex-start"
              justifyContent="center"
              gap={2}
            >
              {new Array(30).fill(0).map((item) => {
                return (
                  <Grid
                    item
                    xs={5.5}
                    sm={3.5}
                    md={3.5}
                    lg={2.25}
                    key={item.id}
                    className="product-card"
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        width: "100%",
                        px: 4,
                        py: 8,
                        borderRadius: 2,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

ProductContainer.propTypes = {};

export default ProductContainer;
