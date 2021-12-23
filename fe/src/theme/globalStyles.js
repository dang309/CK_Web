import { withStyles } from "@mui/styles";

// ----------------------------------------------------------------------

const GlobalStyles = withStyles((theme) => ({
  "@global": {
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      "-ms-text-size-adjust": "100%",
      "-webkit-overflow-scrolling": "touch",
    },
    body: {
      width: "100vw",
      height: "100vh",
      overflowX: "hidden",
      backgroundColor: "#f5f5f5",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },
    input: {
      "&[type=number]": {
        MozAppearance: "textfield",
        "&::-webkit-outer-spin-button": {
          margin: 0,
          WebkitAppearance: "none",
        },
        "&::-webkit-inner-spin-button": {
          margin: 0,
          WebkitAppearance: "none",
        },
      },
    },
    textarea: {
      "&::-webkit-input-placeholder": {
        color: theme.palette.text.disabled,
      },
      "&::-moz-placeholder": {
        opacity: 1,
        color: theme.palette.text.disabled,
      },
      "&:-ms-input-placeholder": { color: theme.palette.text.disabled },
      "&::placeholder": { color: theme.palette.text.disabled },
    },
    a: { color: theme.palette.primary.main },
    img: { display: "block", maxWidth: "100%" },
    ".slick-track": {
      display: "flex",
      gap: "16px",
    },
    ".slick-active button::before": {
      color: "#d32f2f !important",
      fontSize: "16px !important",
    },
  },
}))(() => null);

export default GlobalStyles;
