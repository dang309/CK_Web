import React from "react";
import PropTypes from "prop-types";

import {
  Stack,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  IconButton,
  ButtonGroup,
  Grid,
  Container,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { UPDATE_QUANTITY, REMOVE_ITEM_BY_ID } from "src/reducers/cart";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { red } from "@mui/material/colors";

import { COMMON } from "@utils";

function Cart(props) {
  const dispatch = useDispatch();

  const itemsInCart = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (product) => {
    if (product.quantityInCart > product.quantity) return;
    dispatch(
      UPDATE_QUANTITY({
        id: product.id,
        quantityInCart: product.quantityInCart + 1,
      })
    );
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantityInCart === 1) return;
    dispatch(
      UPDATE_QUANTITY({
        id: product.id,
        quantityInCart: product.quantityInCart - 1,
      })
    );
  };

  const getTotalPrice = (itemsInCart) => {
    if (!itemsInCart || itemsInCart.length === 0) return null;
    let temp = [];
    let finalPrice;
    itemsInCart.forEach((item) => {
      finalPrice =
        (item.unitPrice - item.unitPrice * item.discount) * item.quantityInCart;
      temp.push(finalPrice);
    });

    return temp.reduce((acc, item) => acc + item, 0);
  };

  const handleRemoveItem = (productId) => {
    dispatch(REMOVE_ITEM_BY_ID({ productId }));
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h4">
          Giỏ hàng của bạn ({itemsInCart.length})
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item sm={8} md={8} lg={8}>
            <Paper elevation={4} sx={{ width: "100%", p: 2 }}>
              <Stack direction="column" spacing={2}>
                {itemsInCart &&
                  itemsInCart.length !== 0 &&
                  itemsInCart.map((item, _) => {
                    return (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            component="img"
                            src={item.thumbUrl}
                            alt=""
                            sx={{ width: "128px", borderRadius: 2 }}
                          />
                          <Typography variant="h5">{item.name}</Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <Stack
                            direction="column"
                            alignItems="flex-end"
                            spacing={0.5}
                          >
                            <Typography variant="h6">
                              {COMMON.formatterPrice(
                                item.unitPrice - item.unitPrice * item.discount
                              ) + "đ"}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ textDecoration: "line-through" }}
                              color="text.secondary"
                            >
                              {item.discount > 0 &&
                                COMMON.formatterPrice(item.unitPrice) + "đ"}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="column"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              sx={{
                                border: "1px solid rgba(0,0,0,0.5)",
                                borderRadius: 2,
                                py: 1,
                                px: 2,
                              }}
                            >
                              {item.quantityInCart}
                            </Typography>
                            <ButtonGroup>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleDecreaseQuantity(item)}
                              >
                                <RemoveIcon />
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleIncreaseQuantity(item)}
                              >
                                <AddIcon />
                              </Button>
                            </ButtonGroup>
                          </Stack>

                          <IconButton
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            <DeleteForeverIcon sx={{ color: red[500] }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    );
                  })}

                {(itemsInCart.length === 0 || !itemsInCart) && (
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: "100%" }}
                    spacing={2}
                  >
                    <Typography>
                      Chưa có sản phẩm nào trong giỏ hàng!
                    </Typography>
                    <Button variant="contained" href="/">
                      Mua hàng ngay
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid item sm={3.8} md={3.8} lg={3.8}>
            <Paper sx={{ width: "100%", p: 2 }}>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Tổng tiền: </Typography>
                  <Typography variant="h6">
                    {COMMON.formatterPrice(getTotalPrice(itemsInCart)) + "đ"}
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  href="/checkout"
                  disabled={itemsInCart.length === 0}
                >
                  Thanh toán
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

Cart.propTypes = {};

export default Cart;
