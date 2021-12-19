import React from "react";
import PropTypes from "prop-types";

import { Box, Container, Stack, Typography } from "@mui/material";

import { CONSTANT } from "@utils";

function BrandContainer(props) {
  return (
    <Box sx={{ backgroundColor: "#F9F6F7", py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h4">Đối tác</Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            {CONSTANT.BRANDS.map((item, index) => {
              return (
                <Box key={index}>
                  <Box
                    component="img"
                    src={item}
                    alt=""
                    sx={{ filter: "grayscale(100%)" }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

BrandContainer.propTypes = {};

export default BrandContainer;
