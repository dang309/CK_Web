import React from "react";

import Router from "./routes";

import { Snackbar, Alert } from "@mui/material";

import { HIDE_NOTI } from "src/reducers/noti";

import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const noti = useSelector((state) => state.noti);
  const handleCloseSnackbar = () => {
    dispatch(HIDE_NOTI());
  };
  return (
    <>
      <Router />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={noti.show}
        autoHideDuration={500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={noti.status || "info"}>{noti.message}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
