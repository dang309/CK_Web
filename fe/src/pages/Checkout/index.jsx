import React, { useState } from "react";

import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Stack,
} from "@mui/material";

// components
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useSelector, useDispatch } from "react-redux";
import { REMOVE_ALL_ITEM_IN_CART } from "src/reducers/cart";
import { SHOW_NOTI } from "src/reducers/noti";

import { green } from "@mui/material/colors";

import { COMMON } from "@utils";

import _uniqBy from "lodash/uniqBy";

import {
  TransactionService,
  TransactionDetailService,
  OrderService,
  CartService,
} from "@services";

const steps = [
  "Thông tin giao hàng",
  "Phương thức thanh toán",
  "Kiểm tra đơn hàng",
];

export default function Checkout() {
  const dispatch = useDispatch();
  const itemsInCart = _uniqBy(
    useSelector((state) => state.cart.items),
    "productId"
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentUser = useSelector((state) => state.user.user);
  const members = useSelector((state) => state.group.members);

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardType: "",
    fullName: "",
    cardNumber: "",
    expireDay: "",
    cvvNumber: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleNext = () => {
    if (activeStep === 0 && !shippingInfo.address) return;
    if (activeStep === 1 && paymentMethod == "card" && !paymentInfo.cardType)
      return;
    if (activeStep === 1 && paymentMethod == "card" && !paymentInfo.fullName)
      return;
    if (activeStep === 1 && paymentMethod == "card" && !paymentInfo.cardNumber)
      return;
    if (activeStep === 1 && paymentMethod == "card" && !paymentInfo.expireDay)
      return;
    if (activeStep === 1 && paymentMethod == "card" && !paymentInfo.cvvNumber)
      return;
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length - 1) {
      let data = {};
      if (isLoggedIn) {
        data = {
          totalAmount: itemsInCart.reduce(
            (acc, item) =>
              acc +
              (item.unitPrice - item.unitPrice * item.discount) *
                item.quantityInCart,
            0
          ),
          isPaid: true,
          paymentMethod,
          shippingAddress: shippingInfo.address,
        };

        TransactionService.CREATE_TRANSACTION(data)
          .then((res) => {
            if (members.length > 0) {
              console.log("ddd", members);
              let promises = [];
              members.forEach((member) => {
                promises.push(
                  TransactionDetailService.CREATE_TRANSACTION_DETAIL({
                    customerId: member.id,
                    transactionId: res.data.id,
                  })
                );
              });

              Promise.all(promises)
                .then(() => {
                  dispatch(
                    SHOW_NOTI({
                      status: "success",
                      message: "Thành công!",
                    })
                  );
                })
                .catch((err) => console.log(err));
            } else {
              let data = {
                customerId: currentUser.id,
                transactionId: res.data.id,
              };

              TransactionDetailService.CREATE_TRANSACTION_DETAIL(data);
            }

            let promises = [];

            itemsInCart.forEach((item) => {
              promises.push(
                OrderService.CREATE_ORDER({
                  transactionId: res.data.id,
                  productId: item.productId,
                  quantity: item.quantityInCart,
                  amount:
                    (item.unitPrice - item.unitPrice * item.discount) *
                    item.quantityInCart,
                  status: COMMON.randomInRange(0, 2),
                })
              );
            });

            Promise.all(promises)
              .then(() => {
                dispatch(
                  SHOW_NOTI({
                    status: "success",
                    message: "Thành công!",
                  })
                );
              })
              .catch((err) => console.log(err));

            return res;
          })
          .then(() => {
            itemsInCart.forEach((item) => {
              const data = {
                customerId: currentUser.id,
                productId: item.productId,
              };
              CartService.REMOVE_ITEM_IN_CART(data);
            });
          })
          .catch((err) => console.log(err));

        dispatch(REMOVE_ALL_ITEM_IN_CART());
      }
    }

    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 2:
        return (
          <Review
            itemsInCart={itemsInCart}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            paymentMethod={paymentMethod}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Thanh toán
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleOutlineIcon sx={{ color: green[500] }} />
                <Typography variant="h5">Thanh toán thành công!</Typography>
                <CheckCircleOutlineIcon sx={{ color: green[500] }} />
              </Stack>
              <Button variant="contained" fullWidth href="/">
                Tiếp tục mua hàng
              </Button>
            </Stack>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay lại
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Đặt hàng" : "Tiếp theo"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}
