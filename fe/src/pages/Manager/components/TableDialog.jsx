import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Stack,
  Avatar,
  Input,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";

import Cropper from "react-cropper";

import { CustomerService, ProductService } from "@services";

import { CONSTANT } from "@utils";

import { useDispatch } from "react-redux";
import { SHOW_NOTI } from "src/reducers/noti";

function TaskDialog(props) {
  const dispatch = useDispatch();
  const { openDialog, setOpenDialog, type, action, row } = props;

  const [currentAvatar, setCurrentAvatar] = useState("");
  const [cropper, setCropper] = useState("");
  const [openDialogCropImg, setOpenDialogCropImg] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: row?.name || "",
    avatar: row?.avatar || "",
    email: row?.email || "",
    bio: row?.bio || "",
    gender: row?.gender || "0",
    birthday: row?.birthday || new Date(),
    isAdmin: row?.isAdmid || "0",
  });

  const [productInfo, setProductInfo] = useState({
    name: row?.name || "",
    thumbUrl: row?.thumbUrl || "",
    unitPrice: row?.unitPrice || 0,
    quantity: row?.quantity || 0,
    discount: row?.discount || 0,
    category: row?.category || "all",
  });

  const getActionBtnText = (action) => {
    switch (action) {
      case "add":
        return "Thêm";
      case "edit":
        return "Sửa";
      case "delete":
        return "Xóa";
    }
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setOpenDialogCropImg(true);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCustomerInfo((prev) => ({
        ...prev,
        avatar: cropper.getCroppedCanvas().toDataURL(),
      }));
    }
    handleCloseDialogCropImg();
  };

  const handleCloseDialogCropImg = () => {
    setOpenDialogCropImg(false);
  };

  const handleRemoveAvatar = () => {
    setCustomerInfo((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleDoAction = (type, action) => {
    let data = null;
    if (type === "customer") {
      if (action === "edit") {
        data = {
          name: customerInfo.name || (row && row.name),
          email: customerInfo.email || (row && row.email),
          avatar: customerInfo.avatar || (row && row.avatar),
          bio: customerInfo.bio || (row && row.bio),
          gender: !!parseInt(customerInfo.gender || (row && row.gender)),
          birthday: customerInfo.birthday || (row && row.birthday),
          isAdmin: !!parseInt(customerInfo.isAdmin || (row && row.isAdmin)),
        };
        CustomerService.UPDATE_CUSTOMER(row && row.id, data)
          .then(() => {
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: "Cập nhật thành công!",
              })
            );
          })
          .catch((err) => console.log(err))
          .finally(() => setOpenDialog(false));
      }
    }

    if (type === "product") {
      if (action === "add") {
        data = {
          name: productInfo.name,
          thumbUrl:
            productInfo.thumbUrl ||
            "https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Free-Image.png",
          unitPrice: parseInt(productInfo.unitPrice),
          quantity: parseInt(productInfo.quantity),
          discount: parseFloat(productInfo.discount),
          category: productInfo.category,
        };

        ProductService.CREATE_PRODUCT(data)
          .then(() => {
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: "Thêm thành công!",
              })
            );
          })
          .catch((err) => console.log(err));
      }

      if (action === "edit") {
        data = {
          name: productInfo.name || (row && row.name),
          thumbUrl:
            productInfo.thumbUrl ||
            (row && row.thumbUrl) ||
            "https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Free-Image.png",
          unitPrice: parseInt(productInfo.unitPrice || (row && row.unitPrice)),
          quantity: parseInt(productInfo.quantity || (row && row.quantity)),
          discount: parseFloat(productInfo.discount || (row && row.discount)),
          category: productInfo.category || (row && row.category),
        };
        ProductService.UPDATE_PRODUCT(row.id, data)
          .then(() => {
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: "Cập nhật thành công!",
              })
            );
          })
          .catch((err) => console.log(err));
      }

      if (action === "delete") {
        ProductService.DELETE_PRODUCT(row.id)
          .then(() => {
            dispatch(
              SHOW_NOTI({
                status: "success",
                message: "Xóa thành công!",
              })
            );
          })
          .catch((err) => console.log(err));
      }

      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogContent>
        {type === "customer" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    sx={{
                      width: 128,
                      height: 128,
                      fontSize: "56px",
                    }}
                    src={customerInfo.avatar || (row && row.avatar)}
                    alt=""
                  />

                  <div
                    className="img-preview"
                    sx={{ width: "100%", height: "100%" }}
                  />

                  <Input
                    accept="image/*"
                    id="avatar"
                    multiple
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleChangeAvatar}
                  />

                  <Stack direction="column">
                    <IconButton component="label" htmlFor="avatar">
                      <CameraAltIcon />
                    </IconButton>

                    <IconButton onClick={handleRemoveAvatar}>
                      <ClearIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Dialog
                  open={openDialogCropImg}
                  onClose={handleCloseDialogCropImg}
                >
                  <DialogContent>
                    <Cropper
                      style={{ height: "100%", width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={currentAvatar}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button variant="contained" onClick={getCropData}>
                      Lưu
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCloseDialogCropImg}
                    >
                      Hủy
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                label="Tên"
                fullWidth
                variant="standard"
                value={customerInfo.name || (row && row.name)}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Email"
                fullWidth
                variant="standard"
                value={customerInfo.email || (row && row.email)}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={5} md={5}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  row
                  value={customerInfo.gender || (row && row.gender ? "1" : "0")}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel value="0" control={<Radio />} label="Nam" />
                  <FormControlLabel value="1" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={7} md={7}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Phân quyền</FormLabel>
                <RadioGroup
                  row
                  value={
                    customerInfo.isAdmin || (row && row.isAdmin ? "1" : "0")
                  }
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      isAdmin: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Khách hàng"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Quản trị viên"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={8}>
              <TextField
                label="Tự bạch"
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                maxRows={10}
                value={customerInfo.bio || (row && row.bio)}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  orientation="portrait"
                  label="Ngày sinh"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  value={customerInfo.birthday || (row && row.birthday)}
                  onChange={(newDate) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      birthday: newDate || (row && row.birthday),
                    }))
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}

        {type === "product" && action !== "delete" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    sx={{
                      width: 128,
                      height: 128,
                      fontSize: "56px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      borderRadius: "16px",
                      filter:
                        !productInfo.thumbUrl && !row?.thumbUrl
                          ? "grayscale(2)"
                          : "none",
                    }}
                    src={
                      productInfo.thumbUrl ||
                      "https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Free-Image.png"
                    }
                    alt=""
                  />

                  <div
                    className="img-preview"
                    sx={{ width: "100%", height: "100%" }}
                  />

                  <Input
                    accept="image/*"
                    id="avatar"
                    multiple
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleChangeAvatar}
                  />

                  <Stack direction="column">
                    <IconButton component="label" htmlFor="avatar">
                      <CameraAltIcon />
                    </IconButton>

                    <IconButton onClick={handleRemoveAvatar}>
                      <ClearIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Dialog
                  open={openDialogCropImg}
                  onClose={handleCloseDialogCropImg}
                >
                  <DialogContent>
                    <Cropper
                      style={{ height: "100%", width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={currentAvatar}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button variant="contained" onClick={getCropData}>
                      Lưu
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCloseDialogCropImg}
                    >
                      Hủy
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Tên sản phẩm"
                fullWidth
                variant="standard"
                value={productInfo.name}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                label="Đơn giá(đ)"
                fullWidth
                variant="standard"
                value={productInfo.unitPrice}
                onChange={(e) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    unitPrice: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                label="Số lượng"
                fullWidth
                variant="standard"
                value={productInfo.quantity}
                onChange={(e) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
            </Grid>{" "}
            <Grid item xs={3} md={3}>
              <TextField
                label="Khuyến mãi(%)"
                fullWidth
                variant="standard"
                value={productInfo.discount}
                onChange={(e) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <FormControl fullWidth>
                <InputLabel id="category-select">Loại</InputLabel>
                <Select
                  labelId="category-select"
                  value={productInfo.category}
                  label="Loại"
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  {CONSTANT.CATEGORIES.map((item) => {
                    return (
                      <MenuItem key={item.code} value={item.code}>
                        {item.displayName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {type === "product" && action === "delete" && (
          <Stack>
            <Typography variant="h4">Bạn muốn xóa sản phẩm này ?</Typography>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
        <Button onClick={() => handleDoAction(type, action)}>
          {getActionBtnText(action)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TaskDialog.propTypes = {};

export default TaskDialog;
