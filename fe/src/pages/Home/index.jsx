import React from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

import BannerContainer from "./components/BannerContainer";
import ProductContainer from "./components/ProductContainer";
import BrandContainer from "./components/BrandContainer";

function Homepage(props) {
  return (
    <Box id="myId">
      <BannerContainer />

      <ProductContainer />

      <BrandContainer />
    </Box>
  );
}

Homepage.propTypes = {};

export default Homepage;
