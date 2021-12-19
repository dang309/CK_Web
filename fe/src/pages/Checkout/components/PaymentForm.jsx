import * as React from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
} from "@mui/material";

export default function PaymentForm(props) {
  const { paymentInfo, setPaymentInfo } = props;
  return (
    <Box component="form">
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="cardName"
            label="Họ và tên"
            fullWidth
            variant="standard"
            value={paymentInfo.fullName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, fullName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Số thẻ"
            fullWidth
            variant="standard"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={4} md={4}>
          <TextField
            required
            id="cardType"
            label="Loại thẻ"
            fullWidth
            variant="standard"
            value={paymentInfo.cardType}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardType: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={4} md={4}>
          <TextField
            required
            id="expDate"
            label="Ngày hết hạn"
            fullWidth
            variant="standard"
            value={paymentInfo.expireDay}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, expireDay: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <TextField
            required
            id="cvv"
            label="Số CVV"
            helperText="3 số cuối mặt sau của thẻ"
            fullWidth
            variant="standard"
            value={paymentInfo.cvvNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cvvNumber: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveCard" value="yes" />}
            label="Lưu thông tin cho lần thanh toán tiếp theo"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
