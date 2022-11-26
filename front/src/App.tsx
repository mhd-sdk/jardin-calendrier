import "./App.css";
import FullCalendar, { Theme } from "@fullcalendar/react";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SwipeableViews from "react-swipeable-views";
import { Menu } from "@mui/icons-material";
import {
  styled,
  alpha,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  createTheme,
  ThemeProvider,
  css,
} from "@mui/material";
import React from "react";
import { Calendar } from "./components/Calendar";
import { theme } from "./components/Theme";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxHeight: "100vh",
          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <AppBar
          sx={{
            height: "6vh",
          }}
          position="static"
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Calendrier des événements jardin
            </Typography>
            <StyledTabs>
              <Tabs
                sx={{
                  borderTopLeftRadius: theme.shape.borderRadius,
                  borderTopRightRadius: theme.shape.borderRadius,
                  "& button": {
                    color: "white",
                    margin: "0",
                    fontFamily: "'Roboto','Helvetica','Arial','sans-serif'",
                    fontSize: "20px",
                    lineHeight: "1.6",
                    letterSpacing: "0.0075em",
                    textTransform: "none",
                    BorderRadius: 18,
                    transition: "all 0.2s",
                  },
                  "& button:hover": {
                    color: "white",
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="standard"
              >
                <Tab label="Activitées" />
                <Tab label="Calendrier" />
              </Tabs>
            </StyledTabs>

            <AppBarActions>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Rechercher..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
              >
                <AccountCircleIcon />
              </IconButton>
            </AppBarActions>
          </Toolbar>
        </AppBar>
        <SwipeableViews
          containerStyle={{
            height: "94vh",
            maxHeight: "94vh",
          }}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div>1</div>
          <Calendar />
        </SwipeableViews>
      </div>
    </ThemeProvider>
  );
}

const AppBarActions = styled("div")((props) => ({
  display: "flex",
  alignItems: "center",
}));

const StyledTabs = styled("div")((props) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
}));

const Search = styled("div")((props) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.dark, 0.55),
  transition: "all 2s smooth",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.75),
  },
  marginLeft: 0,
  width: "100%",
  [props.theme.breakpoints.up("sm")]: {
    marginLeft: props.theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "13ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default App;
