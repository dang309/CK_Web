import React, { useState, useEffect } from "react";

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
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { COMMON, CONSTANT } from "@utils";

import {
  TransactionService,
  TransactionDetailService,
  OrderService,
  ProductService,
} from "@services";

import { useDispatch, useSelector } from "react-redux";

import { SET_TRANSACTIONS } from "src/reducers/transaction";
import moment from "moment";

export default function TransactionHistory() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  const cUser = useSelector((state) => state.user.user);

  const getTransactions = async () => {
    const params = {
      customer_id: cUser.id,
    };
    const resTd =
      await TransactionDetailService.GET_ALL_TRANSACTION_DETAIL_BY_CUSTOMER_ID(
        params
      );
    if (resTd.result) {
      let transactionIds = resTd.data;
      let data = [];
      let promises = [];
      transactionIds.map((item) => {
        promises.push(
          TransactionService.GET_TRANSACTION_BY_ID(item.transactionId)
        );
      });
      Promise.all(promises).then((res) => {
        res.forEach((item) => {
          data.push(...item.data);
        });
        dispatch(SET_TRANSACTIONS(data));
      });
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  function Row(props) {
    const { row, index } = props;
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const hanldeOpenCollapseOrders = async (transaction) => {
      if (!open) {
        const params = {
          transaction_id: transaction.id,
        };
        const resOrders = await OrderService.GET_ALL_ORDERS_BY_TRANSACTION_ID(
          params
        );
        if (resOrders.result) {
          let promises = [];
          resOrders.data.forEach((item) => {
            promises.push(ProductService.GET_PRODUCT_BY_ID(item.productId));
          });
          const resProducts = await Promise.all(promises);
          let data = [];
          resProducts.forEach((item) => {
            if (item.result) {
              data.push(...item.data);
            }
          });
          let temp = [];
          for (let i = 0; i < resOrders.data.length; i++) {
            temp.push({
              orderId: resOrders.data[i].id,
              productId: data[i].id,
              quantity: resOrders.data[i].quantity,
              name: data[i].name,
              thumbUrl: data[i].thumbUrl,
              amount: resOrders.data[i].amount,
              status: resOrders.data[i].status,
            });
          }

          setOrders(temp);
        }
      }
      setOpen(!open);
    };

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => hanldeOpenCollapseOrders(row)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            #{row.id + COMMON.randomInRange(100000000, 999999999)}
          </TableCell>
          <TableCell>{moment(row.date).format("DD-MM-YYYY")}</TableCell>
          <TableCell>{COMMON.formatterPrice(row.totalAmount) + "đ"}</TableCell>
          <TableCell>{row.shippingAddress}</TableCell>
          <TableCell>
            <Chip
              label={row.paymentMethod === "cash" ? "Tiền mặt" : "Thẻ tín dụng"}
              icon={
                row.paymentMethod === "cash" ? (
                  <AttachMoneyIcon />
                ) : (
                  <CreditCardIcon />
                )
              }
              variant="outlined"
              size="small"
              color="secondary"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết đơn hàng
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell>Tình trạng đơn hàng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders &&
                      orders.length !== 0 &&
                      orders.map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>
                            <Box
                              component="img"
                              src={order.thumbUrl}
                              alt=""
                              sx={{
                                width: "56px",
                                boxShadow:
                                  "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px ",
                                borderRadius: "16px",
                              }}
                            />
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            {COMMON.formatterPrice(order.amount) + "đ"}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                CONSTANT.ORDER_STATUS[parseInt(order.status)]
                                  .text
                              }
                              sx={{
                                color:
                                  CONSTANT.ORDER_STATUS[parseInt(order.status)]
                                    .color,
                              }}
                              icon={
                                row.paymentMethod === "cash" ? (
                                  <AttachMoneyIcon />
                                ) : (
                                  <CreditCardIcon />
                                )
                              }
                              variant="outlined"
                              size="small"
                              color="secondary"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Đại chỉ giao hàng</TableCell>
              <TableCell>Phương thức thanh toán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.length !== 0 &&
              transactions.map((row, index) => (
                <Row key={row.name} row={row} index={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
