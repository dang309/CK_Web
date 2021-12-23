import React from "react";
import PropTypes from "prop-types";

import { Stack, CircularProgress } from "@mui/material";

function Loading(props) {
  return (
    <Stack
      sx={{ width: "100%", p: 2, backgroundColor: "transparent" }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress {...props} />
    </Stack>
  );
}

Loading.propTypes = {};

export default Loading;
