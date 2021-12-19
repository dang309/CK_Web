import React from "react";
import PropTypes from "prop-types";

import Slider from "react-slick";

import { Box, Container } from "@mui/material";

import { CONSTANT } from "@utils";

function BannerContainer(props) {
  return (
    <Container
      sx={{
        maxWidth: "none !important",
        px: "0px !important",
        backgroundColor: "#F4F4F2",
        mb: 4,
      }}
    >
      <Slider {...CONSTANT.SLICK_SETTINGS}>
        {CONSTANT.BANNERS.map((item, index) => {
          return (
            <Box key={index}>
              <Box
                component="img"
                src={item}
                alt=""
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>
          );
        })}
      </Slider>
    </Container>
  );
}

BannerContainer.propTypes = {};

export default BannerContainer;
