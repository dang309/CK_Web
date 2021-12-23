import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Stack,
  Avatar,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  Input,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Cropper from "react-cropper";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";

import { useSelector, useDispatch } from "react-redux";

import { CustomerService } from "@services";

import { UPDATE_USER } from "src/reducers/user";
import { SHOW_NOTI } from "src/reducers/noti";

import moment from "moment";

function PersonalProfile(props) {
  const dispatch = useDispatch();
  const cUser = useSelector((state) => state.user.user);

  const [currentAvatar, setCurrentAvatar] = useState("");
  const [cropper, setCropper] = useState();
  const [openDialog, setOpenDialog] = useState(false);

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
    setOpenDialog(true);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      dispatch(UPDATE_USER({ avatar: cropper.getCroppedCanvas().toDataURL() }));
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeUserInfo = (info) => {
    dispatch(UPDATE_USER(info));
  };

  const handleSaveInfo = () => {
    let data = {
      name: cUser.name,
      email: cUser.email,
      isAdmin: cUser.is_admin,
      gender: cUser.gender,
      avatar: cUser.avatar,
      bio: cUser.bio,
      birthday:
        (cUser.birthday &&
          moment(cUser.birthday).format("YYYY-MM-DD HH:mm:ss")) ||
        new Date(),
    };
    CustomerService.UPDATE_CUSTOMER(cUser.id, data)
      .then(() => {
        dispatch(
          SHOW_NOTI({
            status: "success",
            message: "Cập nhật thành công!",
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveAvatar = () => {
    dispatch(UPDATE_USER({ avatar: "" }));
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          {cUser.avatar ? (
            <Avatar
              sx={{
                width: 128,
                height: 128,
                fontSize: "56px",
              }}
              src={cUser.avatar}
              alt=""
            />
          ) : (
            <Avatar
              sx={{
                width: 128,
                height: 128,
                fontSize: "56px",
              }}
            >
              {cUser.name.split(" ")[cUser.name.split(" ").length - 1][0]}
            </Avatar>
          )}

          <div className="img-preview" sx={{ width: "100%", height: "100%" }} />

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

        <Dialog open={openDialog} onClose={handleCloseDialog}>
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
            <Button variant="outlined" onClick={handleCloseDialog}>
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ width: "512px" }}>
        <TextField
          fullWidth
          label="Tên"
          value={cUser.name}
          onChange={(e) => handleChangeUserInfo({ name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Email"
          value={cUser.email}
          onChange={(e) => handleChangeUserInfo({ email: e.target.value })}
        />

        <Stack direction="row" alignItems="center" spacing={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={cUser.gender ? "1" : "0"}
              onChange={(e) => handleChangeUserInfo({ gender: e.target.value })}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <FormControlLabel value="0" control={<Radio />} label="Nam" />
                <FormControlLabel value="1" control={<Radio />} label="Nữ" />
              </Stack>
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày sinh"
              value={cUser.birthday}
              onChange={(newDate) =>
                handleChangeUserInfo({ birthday: newDate })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Stack>

        <TextField
          fullWidth
          multiline
          maxRows={4}
          rows={4}
          label="Mô tả bản thân"
          value={cUser.bio}
          onChange={(e) => handleChangeUserInfo({ bio: e.target.value })}
        />

        <Button variant="contained" onClick={handleSaveInfo}>
          Lưu
        </Button>
      </Stack>
    </Stack>
  );
}

PersonalProfile.propTypes = {};

export default PersonalProfile;
