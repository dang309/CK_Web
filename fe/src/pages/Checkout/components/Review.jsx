import * as React from "react";

import {
  ListItemAvatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Stack,
} from "@mui/material";

import { COMMON } from "@utils";

export default function Review(props) {
  const { itemsInCart, shippingInfo, paymentInfo } = props;

  const getTotalPrice = (itemsInCart) => {
    if (!itemsInCart || itemsInCart.length === 0) return null;
    let temp = [];
    let finalPrice;
    itemsInCart.forEach((item, _) => {
      finalPrice =
        (item.unitPrice - item.unitPrice * item.discount) * item.quantityInCart;
      temp.push(finalPrice);
    });
    return temp.reduce((acc, item) => acc + item, 0);
  };
  return (
    <React.Fragment>
      <List disablePadding>
        {itemsInCart.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Box
                component="img"
                src={product.thumbUrl}
                alt=""
                sx={{ borderRadius: 2 }}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} />
            <Typography variant="subtitle2">
              {COMMON.formatterPrice(
                (product.unitPrice - product.unitPrice * product.discount) *
                  product.quantityInCart
              ) + "đ"}
            </Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tổng" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {COMMON.formatterPrice(getTotalPrice(itemsInCart)) + "đ"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Thông tin giao hàng
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography gutterBottom variant="subtitle2">
              Địa chỉ:{" "}
            </Typography>
            <Typography gutterBottom>{shippingInfo.address}</Typography>
          </Stack>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Thông tin thẻ thanh toán
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                Loại thẻ:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cardType}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                Họ và tên:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.fullName}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                Số thẻ:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cardNumber}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                Số CVV:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentInfo.cvvNumber}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
