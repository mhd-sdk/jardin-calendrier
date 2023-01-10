import "./App.css";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SwipeableViews from "react-swipeable-views";
import { Menu as MenuIcon } from "@mui/icons-material";
import "dayjs/locale/fr";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  styled,
  alpha,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  ThemeProvider,
  Tooltip,
  StyledEngineProvider,
} from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import React from "react";
import { Calendar } from "./components/Calendar";
import { theme } from "./components/Theme";
import LoginModal from "./components/LoginModal/LoginModal";
import { getEvents } from "./utils/api/api";
import CreateEventModal from "./components/CreateEventModal/CreateEventModal";
import EventsList from "./components/EventsList";

function App() {
  const eventsFetched = React.useRef(false);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  // ###############- events -############### //
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    if (eventsFetched.current) {
      return;
    }
    function fetchEvents() {
      getEvents()
        .then((args) => {
          let eventCopy = [...events];
          setEvents(eventCopy.concat(args.data));
        })
        .catch((error) => {
          handleSnackBar(
            "error",
            "erreur lors de la récupération des événements"
          );
        });
    }
    fetchEvents();
    eventsFetched.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isCreateEventOpen, setIsCreateEventOpen] = React.useState(false);

  // ###############- profile icon menu -############### //
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // ###############- tabs -############### //
  const [activeTab, setActiveTab] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };
  // ###############- snackbar -############### //
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackBar = (variant: VariantType, message: string) => {
    enqueueSnackbar(message, { variant, color: "blue" });
  };

  // ###############- authentication -############### //
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    handleMenuClose();
    handleSnackBar("success", "Déconnexion...");
  };
  // on first render, check if token is present in local storage, if so, set isAuthenticated to FALSE and remove token from local storage
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    }
  }, []);
  const refreshEvents = () => {
    getEvents()
      .then((args) => {
        let eventCopy = [...events];
        setEvents(args.data);
        handleSnackBar("success", "Calendrier rechargé");
      })
      .catch((error) => {
        handleSnackBar(
          "error",
          "erreur lors de la récupération des événements"
        );
      });
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
            height: "20",

            zIndex: 10,
          }}
          position="static"
        >
          <Toolbar variant="dense">
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
                value={activeTab}
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
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Rechercher..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
              <Tooltip
                title={
                  isAuthenticated
                    ? "connecté en tant qu'administrateur"
                    : "Se connecter en tant qu'administrateur"
                }
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 2 }}
                  onClick={(event) => {
                    if (isAuthenticated) {
                      handleMenuOpen(event);
                    } else {
                      setIsLoginOpen(true);
                    }
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </AppBarActions>
          </Toolbar>
        </AppBar>
        <SwipeableViews
          containerStyle={{
            height: "90vh",
            transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
          }}
          index={activeTab}
          onChangeIndex={handleChangeIndex}
        >
          <EventsList
            isAuthenticated={isAuthenticated}
            refreshEvents={refreshEvents}
            events={events}
            handleSnackBar={handleSnackBar}
          />
          <Calendar
            setActiveTab={setActiveTab}
            handleSnackBar={handleSnackBar}
            events={events}
            setEvents={setEvents}
            setIsCreateEventOpen={setIsCreateEventOpen}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </SwipeableViews>
      </div>
      <LoginModal
        setIsAuthenticating={setIsAuthenticating}
        isAuthenticating={isAuthenticating}
        handleSnackBar={handleSnackBar}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsAuthenticated={setIsAuthenticated}
      />
      <CreateEventModal
        handleSnackBar={handleSnackBar}
        isCreateEventOpen={isCreateEventOpen}
        setIsCreateEventOpen={setIsCreateEventOpen}
        startDate={startDate}
        endDate={endDate}
        refreshEvents={refreshEvents}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
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
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <StyledEngineProvider injectFirst={false}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <App />
        </LocalizationProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
}
