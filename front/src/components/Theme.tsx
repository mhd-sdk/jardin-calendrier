import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#005849",
      dark: "#003d2f",
      light: "#00856f",
    },
    secondary: {
      main: "#70BEC1",
      dark: "#4d9ba8",
      light: "#9edfe0",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#00856f",
          color: "#fff",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "#ffffff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});
