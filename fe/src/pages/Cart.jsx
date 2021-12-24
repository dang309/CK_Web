import React, { useState, useEffect } from "react";
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
  Avatar,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  DialogContentText,
  LinearProgress,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import {
  UPDATE_QUANTITY,
  REMOVE_ITEM_BY_ID,
  SET_ITEMS,
} from "src/reducers/cart";
import { SHOW_NOTI } from "src/reducers/noti";
import { SET_MEMBERS } from "src/reducers/group";
import { ACTIVE_LOADING, STOP_LOADING } from "src/reducers/loading";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Link as RouterLink } from "react-router-dom";

import { red } from "@mui/material/colors";

import { COMMON } from "@utils";

import { CartService, CustomerService, ProductService } from "@services";

import { Scrollbar } from "@components";

import _uniqBy from "lodash/uniqBy";
import _compact from "lodash/compact";
import _pick from "lodash/pick";

function Cart(props) {
  const dispatch = useDispatch();

  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  ).sort((a, b) => a.productId < b.productId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cUser = useSelector((state) => state.user.user);
  const members = useSelector((state) => state.group.members);

  const [openDialogGroup, setOpenDialogGroup] = useState(false);
  const [outputOtp, setOutputOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [joinOrAdd, setJoinOrAdd] = useState("join");

  const scrollIntoView = () => {
    document
      .getElementById("into-view-cart")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    scrollIntoView();
  }, []);

  const handleIncreaseQuantityInCart = (itemInCart) => {
    if (itemInCart.quantityInCart > itemInCart.quantity) return;
    if (isLoggedIn) {
      let data = {
        quantityInCart: itemInCart.quantityInCart + 1,
        customerId: cUser.id,
        productId: itemInCart.productId,
        availableQuantity: itemInCart.quantity - 1,
      };
      CartService.UPDATE_ITEM_IN_CART(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    dispatch(
      UPDATE_QUANTITY({
        productId: itemInCart.productId,
        quantityInCart: itemInCart.quantityInCart + 1,
        quantity: itemInCart.quantity - 1,
      })
    );
  };

  const handleDecreaseQuantity = (itemInCart) => {
    if (itemInCart.quantityInCart === 1) return;
    if (isLoggedIn) {
      let data = {
        quantityInCart: itemInCart.quantityInCart - 1,
        customerId: cUser.id,
        productId: itemInCart.productId,
        availableQuantity: itemInCart.quantity + 1,
      };
      CartService.UPDATE_ITEM_IN_CART(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    dispatch(
      UPDATE_QUANTITY({
        productId: itemInCart.productId,
        quantityInCart: itemInCart.quantityInCart - 1,
        quantity: itemInCart.quantity + 1,
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

    return Math.round(temp.reduce((acc, item) => acc + item, 0));
  };

  const getItemsInCart = async () => {
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

  const handleRemoveItem = (itemInCart) => {
    if (isLoggedIn) {
      const data = {
        customerId: cUser.id,
        productId: itemInCart.productId,
      };
      CartService.REMOVE_ITEM_IN_CART(data)
        .then(() => {
          getItemsInCart();
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(REMOVE_ITEM_BY_ID({ productId: itemInCart.productId }));
    }
  };

  const handleOpenDialogGroup = (action) => {
    setOpenDialogGroup(true);
    setJoinOrAdd(action);
    setOutputOtp(COMMON.randomInRange(100000, 999999, cUser.id + cUser.name));
  };

  const handleCloseDialogGroup = () => {
    setOpenDialogGroup(false);
  };

  const handleChangeInputOTP = (e) => {
    setInputOtp(e.target.value);
  };

  const handleJoinOrAdd = (action) => {
    let params = {};
    if (action === "add") {
      params = {
        group_id: outputOtp,
        customer_id: cUser.id,
      };
      CustomerService.CREATE_GROUP(params)
        .then(() => {
          dispatch(
            SHOW_NOTI({
              status: "success",
              message: "Thành công!",
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (action === "join") {
      params = {
        group_id: inputOtp,
        customer_id: cUser.id,
      };
      CustomerService.JOIN_GROUP(params)
        .then(() => {
          dispatch(
            SHOW_NOTI({
              status: "success",
              message: "Thành công!",
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
        });
    }

    if (action === "leave") {
      params = {
        customer_id: cUser.id,
      };
      CustomerService.LEAVE_GROUP(params)
        .then(() => {
          dispatch(
            SHOW_NOTI({
              status: "success",
              message: "Thành công!",
            })
          );
        })
        .catch((err) => console.log(err));
    }

    handleCloseDialogGroup();
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

  const handleRefreshMembers = () => {
    getMembersInGroup();
  };

  useEffect(() => {
    getMembersInGroup();
  }, []);

  return (
    <Container>
      <div id="into-view-cart" />
      <Stack direction="column" alignItems="center" spacing={2}>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">
            Giỏ hàng của bạn ({itemsInCart.length})
          </Typography>
        </Stack>
        <Grid container justifyContent="space-between" gap={2}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Paper elevation={4} sx={{ width: "100%", p: 2 }}>
              <Scrollbar style={{ maxHeight: 512 }}>
                <Stack direction="column" spacing={2}>
                  {itemsInCart &&
                    itemsInCart.length !== 0 &&
                    itemsInCart.map((item) => {
                      return (
                        <Stack
                          key={item.productId}
                          direction={{
                            xs: "column",
                            sm: "row",
                            md: "row",
                            lg: "row",
                          }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
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
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                          >
                            <Stack
                              direction="column"
                              alignItems="flex-end"
                              spacing={0.5}
                            >
                              <Typography variant="h6">
                                {COMMON.formatterPrice(
                                  item.unitPrice -
                                    item.unitPrice * item.discount
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
                              <Typography variant="caption">
                                Còn: {item.quantity}
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
                                  onClick={() =>
                                    handleIncreaseQuantityInCart(item)
                                  }
                                >
                                  <AddIcon />
                                </Button>
                              </ButtonGroup>
                            </Stack>

                            <IconButton onClick={() => handleRemoveItem(item)}>
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
              </Scrollbar>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={3.8} lg={3.8}>
            <Stack direction="column" spacing={2}>
              {isLoggedIn && (
                <Paper sx={{ width: "100%", p: 2 }}>
                  <Stack direction="column" spacing={3}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h6">
                          Thành viên ({members.length})
                        </Typography>

                        <IconButton onClick={handleRefreshMembers}>
                          <RefreshIcon />
                        </IconButton>
                      </Stack>
                      <Box sx={{ width: "100%" }}>
                        <LinearProgress
                          color="secondary"
                          variant="determinate"
                          value={members.length * 10}
                          sx={{
                            height: "12px",
                            borderRadius: "16px",
                          }}
                        />
                      </Box>
                      <Stack>
                        <Typography variant="subtitle2">
                          {members.length} / 10
                        </Typography>
                      </Stack>

                      <Stack>
                        <Typography variant="caption">
                          Giảm {members.length * 5}%
                        </Typography>
                      </Stack>
                    </Stack>

                    {members && _compact(members).length !== 0 && (
                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        {members.map((member) => {
                          return (
                            <Stack
                              key={member.id}
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={1}
                            >
                              <Avatar src={member.avatar} alt={member.name} />
                              <Typography variant="subtitle1">
                                {member.name}
                              </Typography>
                            </Stack>
                          );
                        })}
                      </Stack>
                    )}

                    <Stack direction="row" justifyContent="center">
                      <ButtonGroup
                        variant="outlined"
                        orientation="vertical"
                        fullWidth
                      >
                        <Button
                          onClick={() => handleOpenDialogGroup("add")}
                          startIcon={<GroupAddIcon />}
                        >
                          Đặt hàng nhóm
                        </Button>
                        <Button
                          onClick={() => handleOpenDialogGroup("join")}
                          startIcon={<GroupsIcon />}
                        >
                          Tham gia nhóm
                        </Button>

                        <Button
                          onClick={() => handleOpenDialogGroup("leave")}
                          startIcon={<GroupRemoveIcon />}
                        >
                          Rời nhóm
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Stack>
                </Paper>
              )}
              <Paper sx={{ width: "100%", p: 2 }}>
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Tổng tiền: </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="h6">
                        {COMMON.formatterPrice(
                          getTotalPrice(itemsInCart) -
                            getTotalPrice(itemsInCart) * 0.05 * members.length
                        ) + "đ"}
                      </Typography>

                      {getTotalPrice(itemsInCart) !== 0 &&
                        itemsInCart.length !== 0 && (
                          <Typography
                            variant="caption"
                            sx={{ textDecoration: "line-through" }}
                          >
                            {COMMON.formatterPrice(getTotalPrice(itemsInCart)) +
                              "đ"}
                          </Typography>
                        )}
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    to="/checkout"
                    component={RouterLink}
                    disabled={itemsInCart.length === 0}
                    startIcon={<ShoppingCartCheckoutIcon />}
                    fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    Thanh toán
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Dialog open={openDialogGroup} onClose={handleCloseDialogGroup}>
        <DialogContent>
          {joinOrAdd === "add" && (
            <DialogContentText>
              Đưa ID này cho bất kỳ ai để tham gia đặt hàng
            </DialogContentText>
          )}

          {joinOrAdd === "join" && (
            <DialogContentText>Nhập ID để tham gia nhóm</DialogContentText>
          )}
          {joinOrAdd === "add" && (
            <Stack direction="row" justifyContent="center" spacing={2}>
              {outputOtp
                .toString()
                .split("")
                .map((item, index) => {
                  return (
                    <Typography key={index} variant="h3">
                      {item}
                    </Typography>
                  );
                })}
            </Stack>
          )}
          {joinOrAdd === "join" && (
            <Stack direction="row" justifyContent="center">
              <TextField
                label="ID"
                value={inputOtp}
                onChange={handleChangeInputOTP}
                fullWidth
                sx={{ mt: 2 }}
              />
            </Stack>
          )}

          {joinOrAdd === "leave" && (
            <Stack direction="row" justifyContent="center">
              Bạn muốn rời nhóm ?
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleJoinOrAdd(joinOrAdd)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

Cart.propTypes = {};

export default Cart;
