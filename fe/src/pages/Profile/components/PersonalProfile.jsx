import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Stack,
  Box,
  Avatar,
  Typography,
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
import EditIcon from "@mui/icons-material/Edit";

import { useSelector } from "react-redux";

function PersonalProfile(props) {
  const cUser = useSelector((state) => state.user.user);

  const [gender, setGender] = useState("female");
  const [date, setDate] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [cropData, setCropData] = useState("#");
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
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    handleCloseDialog();
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          {cUser.thumbUrl ? (
            <Avatar
              sx={{
                width: 128,
                height: 128,
                fontSize: "56px",
              }}
              src={cropData || cUser.thumbUrl}
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
              {cUser.name[0]}
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

          <IconButton component="label" htmlFor="avatar">
            <CameraAltIcon />
          </IconButton>
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
        <TextField fullWidth label="Tên" value={cUser.name} />

        <TextField fullWidth label="Email" value={cUser.email} />

        <Stack direction="row" alignItems="center" spacing={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={handleChangeGender}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày sinh"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
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
        />

        <Button variant="contained">Lưu</Button>
      </Stack>
    </Stack>
  );
}

PersonalProfile.propTypes = {};

export default PersonalProfile;
