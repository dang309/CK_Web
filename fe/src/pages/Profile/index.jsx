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

import PersonalProfile from "./components/PersonalProfile";
import OrderHistory from "./components/OrderHistory";

import Cookies from "js-cookie";

import { useDispatch } from "react-redux";

import { LOGOUT } from "src/reducers/user";

function Profile(props) {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    Cookies.remove("__N12-token");
    dispatch(LOGOUT());
  };

  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Grid
          item
          sm={3.5}
          md={3.5}
          lg={3.5}
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
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item sm={8} md={8} lg={8}>
          {selectedIndex === 0 && <PersonalProfile />}
          {selectedIndex === 1 && <OrderHistory />}
        </Grid>
      </Grid>
    </Container>
  );
}

Profile.propTypes = {};

export default Profile;
