import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddressForm(props) {
  const { shippingInfo, setShippingInfo } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Địa chỉ giao hàng"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Lưu thông tin cho lần thanh toán tiếp theo"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
