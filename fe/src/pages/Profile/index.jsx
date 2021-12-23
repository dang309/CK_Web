import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import PersonalProfile from "./components/PersonalProfile";
import TransactionHistory from "./components/TransactionHistory";

import Cookies from "js-cookie";

import { useDispatch } from "react-redux";

import { LOGOUT } from "src/reducers/user";
import { REMOVE_ALL_ITEM_IN_CART } from "src/reducers/cart";

function Profile(props) {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    Cookies.remove("__N12-token");
    window.location.href = "/";
    dispatch(REMOVE_ALL_ITEM_IN_CART());
    dispatch(LOGOUT());
  };

  return (
    <Container sx={{ minHeight: "512px" }}>
      <Grid container justifyContent="space-between" gap={2}>
        <Grid
          item
          sm={12}
          md={3}
          lg={3}
          sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ cá nhân" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <ShoppingBasketOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Lịch sử đặt hàng" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item sm={12} md={8.8} lg={8.8}>
          {selectedIndex === 0 && <PersonalProfile />}
          {selectedIndex === 1 && <TransactionHistory />}
        </Grid>
      </Grid>
    </Container>
  );
}

Profile.propTypes = {};

export default Profile;
