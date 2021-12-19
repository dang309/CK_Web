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
} from "@mui/material";
import Appbar from "@mui/material/AppBar";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

//----------------------------------------
import { Footer } from "@components";

//----------------------------------------

import { Outlet } from "react-router-dom";

//----------------------------------------

import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";

import { LOGOUT } from "src/reducers/user";

function MainLayout() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.items);
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
                  href="/"
                  underline="none"
                  sx={{
                    color: "#000",
                    fontFamily: "Corinthia, cursive",
                    fontSize: "36px",
                  }}
                >
                  Nhóm 12
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                {isLoggedIn ? (
                  <IconButton onClick={handleClick}>
                    {cUser.thumbUrl ? (
                      <Avatar src={cUser.thumbUrl} />
                    ) : (
                      <Avatar>{cUser.name[0]}</Avatar>
                    )}
                  </IconButton>
                ) : (
                  <Button variant="outlined" href="/auth">
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
                      href="/profile"
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
                <IconButton href="/cart">
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

      <Box component="main" sx={{ my: 4, pt: 6 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default memo(MainLayout);
