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
import { ADD_ORDER } from "src/reducers/order";

import { green } from "@mui/material/colors";

import moment from "moment";

import { v4 as uuidv4 } from "uuid";

const steps = [
  "Thông tin giao hàng",
  "Thông tin thẻ thanh toán",
  "Kiểm tra đơn hàng",
];

export default function Checkout() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.items);
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

  const handleNext = () => {
    window.scrollTo(0, 0);

    if (activeStep === 0 && !shippingInfo.address) return;
    if (activeStep === 1 && !paymentInfo.cardType) return;
    if (activeStep === 1 && !paymentInfo.fullName) return;
    if (activeStep === 1 && !paymentInfo.cardNumber) return;
    if (activeStep === 1 && !paymentInfo.expireDay) return;
    if (activeStep === 1 && !paymentInfo.cvvNumber) return;
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length - 1) {
      let temp = [];
      let transId = uuidv4();
      itemsInCart.forEach((item) => {
        temp.push({
          ...item,
          transactionId: transId,
          orderId: new Date().valueOf() * Math.round(Math.random() * 100),
          status: 0,
          orderDate: moment().format("DD-MM-YYYY"),
        });
      });
      dispatch(ADD_ORDER(temp));
      dispatch(REMOVE_ALL_ITEM_IN_CART());
    }
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
          />
        );
      case 2:
        return (
          <Review
            itemsInCart={itemsInCart}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
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
