import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Grid,
  Container,
  Tabs,
  Tab,
  Pagination,
  Stack,
} from "@mui/material";

import _get from "lodash/get";
import _pick from "lodash/pick";

import { ProductCard } from "@components";
import { COMMON, CONSTANT } from "@utils";
import { ProductService } from "@services";

import BorderAllIcon from "@mui/icons-material/BorderAll";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LiquorIcon from "@mui/icons-material/Liquor";
import NoFoodIcon from "@mui/icons-material/NoFood";
import CakeIcon from "@mui/icons-material/Cake";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import { useDispatch, useSelector } from "react-redux";

import { ADD_ITEM_TO_CART } from "src/reducers/cart";
import { SHOW_NOTI } from "src/reducers/noti";

function ProductContainer(props) {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.items);

  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");

  const handleChangeCurrentTab = (event, newTab) => {
    setCategory(CONSTANT.CATEGORIES[newTab]);
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
    if (itemsInCart.findIndex((item) => item.id === product.id) > -1) {
      dispatch(
        SHOW_NOTI({
          status: "error",
          message: "Sản phẩm đã tồn tại trong giỏ hàng",
        })
      );
    } else {
      dispatch(
        SHOW_NOTI({
          status: "success",
          message: "Thêm vào giỏ hàng thành công!",
        })
      );
      dispatch(
        ADD_ITEM_TO_CART({
          productId: product.id,
          ..._pick(product, [
            "name",
            "thumbUrl",
            "unitPrice",
            "quantity",
            "category",
            "discount",
          ]),
          quantityInCart: 1,
        })
      );
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
            justifyContent="flex-start"
            gap={2}
          >
            {products &&
              products.map((item) => {
                return (
                  <Grid
                    item
                    xs={2.25}
                    sm={2.25}
                    md={2.25}
                    lg={2.25}
                    key={item.id}
                    sx={{ width: "100%" }}
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
        </Box>
      </Stack>
    </Container>
  );
}

ProductContainer.propTypes = {};

export default ProductContainer;
