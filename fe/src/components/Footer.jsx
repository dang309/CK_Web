import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  Stack,
  Typography,
  TextField,
  Box,
  Grid,
  Link,
  Divider,
} from "@mui/material";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer(props) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ pt: 4, backgroundColor: "#fff" }}
    >
      <Container maxWidth="sm">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">Liên hệ</Typography>
          <TextField fullWidth label="Email" />
        </Stack>
      </Container>
      <Container sx={{ py: 4 }}>
        <Grid container>
          <Grid item md={3} lg={3}>
            <Stack direction="column" spacing={1}>
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
              <Stack direction="row" spacing={1}>
                <LocalPhoneIcon />
                <Typography sx={{ fontWeight: "bold" }}>
                  0836 404 231
                </Typography>
              </Stack>
              <Typography>TP.HCM, Viet Nam</Typography>
            </Stack>
          </Grid>

          <Grid item md={2.25} lg={2.25}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Thông tin</Typography>
              <Stack direction="column" spacing={1}>
                <Link underline="hover">Giới thiệu</Link>
                <Link underline="hover">Blog</Link>
                <Link underline="hover">Thanh toán</Link>
                <Link underline="hover">Liên lạc</Link>
                <Link underline="hover">Dịch vụ</Link>
              </Stack>
            </Stack>
          </Grid>

          <Grid item md={2.25} lg={2.25}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Tài khoản</Typography>
              <Stack direction="column" spacing={1}>
                <Link underline="hover">Tài khoản cá nhân</Link>
                <Link underline="hover">Liên lạc</Link>
                <Link underline="hover">Giỏ hàng</Link>
                <Link underline="hover">Mua hàng</Link>
              </Stack>
            </Stack>
          </Grid>

          <Grid item md={2.25} lg={2.25}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Thực đơn</Typography>
              <Stack direction="column" spacing={1}>
                <Link underline="hover">Đồ ăn</Link>
                <Link underline="hover">Đồ uống</Link>
                <Link underline="hover">Đồ chay</Link>
                <Link underline="hover">Bánh kem</Link>
                <Link underline="hover">Mỳ</Link>
                <Link underline="hover">Đồ ăn nhanh</Link>
              </Stack>
            </Stack>
          </Grid>

          <Grid item md={2.25} lg={2.25}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Theo dõi chúng tôi</Typography>
              <Stack direction="row" spacing={2}>
                <FacebookRoundedIcon
                  color="primary"
                  sx={{ fontSize: "32px" }}
                />
                <GoogleIcon color="primary" sx={{ fontSize: "32px" }} />
                <InstagramIcon color="primary" sx={{ fontSize: "32px" }} />
              </Stack>
              <Box sx={{ width: "256px" }}>
                <Box
                  component="img"
                  src="https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/footer_01.png"
                  alt=""
                  sx={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 4, borderTop: "1px solid #f3f3f3" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Copyright © 2021. All Rights Reserved.</Typography>
          <Typography>Designer by M12.</Typography>
        </Stack>
      </Container>
    </Stack>
  );
}

Footer.propTypes = {};

export default Footer;
