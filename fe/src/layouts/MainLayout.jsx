import React, { memo } from "react";

//----------------------------------------

import {
  Container,
  Box,
  Badge,
  Toolbar,
  Avatar,
  Stack,
  Link,
  IconButton,
  Popover,
  Divider,
  Button,
  Fab,
} from "@mui/material";
import Appbar from "@mui/material/AppBar";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//----------------------------------------
import { Footer, ScrollToTop } from "@components";

//----------------------------------------

import { Outlet } from "react-router-dom";

//----------------------------------------

import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";

import { LOGOUT } from "src/reducers/user";

import { REMOVE_ALL_ITEM_IN_CART } from "src/reducers/cart";

import _uniqBy from "lodash/uniqBy";

import { Link as RouterLink } from "react-router-dom";

function MainLayout(props) {
  const dispatch = useDispatch();
  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cUser = useSelector((state) => state.user.user);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("__N12-token");
    window.location.href = "/";
    localStorage.removeItem("persist:root");
    dispatch(REMOVE_ALL_ITEM_IN_CART());
    dispatch(LOGOUT());
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "512px" }}>
      <Appbar
        sx={{
          backgroundColor: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Link
                  component={RouterLink}
                  to="/"
                  underline="none"
                  sx={{
                    color: "#000",
                    fontFamily: "Corinthia, cursive",
                    fontSize: "36px",
                  }}
                >
                  Nhóm 20
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                {isLoggedIn ? (
                  <IconButton onClick={handleClick}>
                    <Avatar src={cUser.avatar} alt={cUser.name} />
                  </IconButton>
                ) : (
                  <Button variant="outlined" to="/auth" component={RouterLink}>
                    Đăng nhập / Đăng ký
                  </Button>
                )}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  disableRestoreFocus
                >
                  <Stack
                    direction="column"
                    spacing={1}
                    divider={<Divider orientation="vertical" flexItem />}
                    sx={{ p: 2 }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AccountCircleOutlinedIcon />}
                      to="/profile"
                      component={RouterLink}
                    >
                      Hồ sơ cá nhân
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<LogoutOutlinedIcon />}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </Stack>
                </Popover>
                <IconButton to="/cart" component={RouterLink}>
                  <Badge
                    badgeContent={itemsInCart.length || null}
                    color="secondary"
                  >
                    <ShoppingCartOutlinedIcon color="action" />
                  </Badge>
                </IconButton>
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </Appbar>

      <div id="back-to-top-anchor" />

      <Box component="main" sx={{ my: 4, pt: 6 }}>
        <Outlet />
      </Box>
      <Footer />

      <ScrollToTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </Box>
  );
}

export default memo(MainLayout);
