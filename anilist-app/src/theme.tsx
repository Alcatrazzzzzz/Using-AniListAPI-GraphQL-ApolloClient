import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    mBlack: "#2C2C2C",
    mRed: "#FF5F5F",
    mCyian: "#83FFE6",
    mGray: "#B5B5B5",
    mLightGray: "rgb(236, 236, 236)",
  },
  fonts,
  breakpoints,
});

export default theme;
