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
  Grid,
  Box,
  Button,
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
import { Home } from "./Home";
import Association from "./Association";
import RgpdDialog from "./components/RgpdDialog/RgpdDialog";

function App() {
  document.title = "Activités jardin";
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
  const [activeTab, setActiveTab] = React.useState(0);

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

  const [isRgpdOpen, setIsRgpdOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        style={{
          backgroundColor: theme.palette.primary.dark,
          zIndex: 10,
        }}
      >
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            maxHeight: "100vh",
            backgroundColor: theme.palette.primary.dark,
          }}
        > */}
        <Box
          style={{
            zIndex: 10,
          }}
        >
          <AppBar
            sx={{
              zIndex: 10,
              height: "56px",
            }}
            position="static"
          >
            <Toolbar variant="dense">
              <Button
                sx={{
                  zIndex: 100,
                  color: "white",
                }}
                variant="text"
                onClick={() => setIsRgpdOpen(true)}
              >
                Politique de confidentialité
              </Button>
              <RgpdDialog
                isOpen={isRgpdOpen}
                onClose={() => setIsRgpdOpen(false)}
              />
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
                  <Tab label="Jardins d'Herbalistes" />
                  <Tab label="Association Graines et Nature" />
                  <Tab label="Activités" />
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
        </Box>

        <Box style={{}} flex={1}>
          <SwipeableViews
            style={{
              height: "calc(100vh - 56px)",
              overflow: "hidden",
            }}
            containerStyle={{
              transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
            }}
            index={activeTab}
            onChangeIndex={handleChangeIndex}
          >
            <Home activeTab={activeTab} setActiveTab={setActiveTab} />
            <Association />

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
          {/* </div> */}
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
        </Box>
      </Box>
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
