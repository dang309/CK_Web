import * as React from "react";

import {
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useSelector } from "react-redux";

import { COMMON, CONSTANT } from "@utils";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function OrderHistory() {
  const orders = useSelector((state) => state.order.orders);
  console.log("haidnag", orders);

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

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.length !== 0 &&
              orders.map((order, index) => (
                <TableRow
                  key={order.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>#{order.orderId}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.quantityInCart}</TableCell>
                  <TableCell>
                    {COMMON.formatterPrice(getTotalPrice(orders)) + "đ"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={CONSTANT.ORDER_STATUS[order.status].text}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: CONSTANT.ORDER_STATUS[order.status].color,
                        borderColor: CONSTANT.ORDER_STATUS[order.status].color,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
