import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { red } from "@mui/material/colors";

import {
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Stack,
  Box,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Truncate from "react-truncate";

import { COMMON } from "@utils";

import "react-lazy-load-image-component/src/effects/blur.css";

function ProductCard(props) {
  const { product, handleAddToCart } = props;
  const [favorite, setFavorite] = useState(false);

  const handleChangeFavorite = useCallback(() => {
    setFavorite((prev) => !prev);
  }, [favorite]);

  return (
    <Card sx={{ width: "100%" }}>
      {/* <CardMedia component="img" image={product.thumbUrl} alt="" /> */}
      <LazyLoadImage alt="" src={product.thumbUrl} width="100%" effect="blur" />
      <CardContent sx={{ p: 1 }}>
        <Stack direction="column" alignItems="center" spacing={1}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={
                ((Math.ceil(product.quantity / 2) + 3) / product.quantity) * 100
              }
              sx={{
                height: "12px",
                borderRadius: "16px",
              }}
            />
          </Box>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Đã bán
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {Math.ceil(product.quantity / 2) + 3} / {product.quantity}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="flex-start" spacing={1}>
          <Typography variant="h5" noWrap sx={{ maxWidth: "100%" }}>
            {product.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="subtitle2">
              {COMMON.formatterPrice(
                product.unitPrice - product.unitPrice * product.discount
              ) + "đ"}
            </Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textDecoration: "line-through" }}
            >
              {product.discount > 0 &&
                COMMON.formatterPrice(product.unitPrice) + "đ"}
            </Typography>
            <Typography variant="caption" sx={{ color: red[600] }}>
              {product.discount > 0 &&
                "-" + Math.floor(product.discount * 100) + "%"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating
              name="read-only"
              value={
                COMMON.randomInRange(2, 5) -
                [0, 0.5][COMMON.randomInRange(0, 1, props.seed)]
              }
              readOnly
              precision={0.5}
            />
            <Typography variant="subtitle2">
              ({COMMON.randomInRange(10, 100, props.seed)})
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing sx={{ p: 1 }}>
        <IconButton onClick={handleChangeFavorite}>
          {favorite ? (
            <FavoriteIcon sx={{ color: red[500] }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleAddToCart: PropTypes.func,
};

export default ProductCard;
