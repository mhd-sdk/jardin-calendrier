import * as React from "react";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  styled,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import dayjs from "dayjs";
import { theme } from "./Theme";
import { EventType } from "../types";
import { red } from "chalk";
import { getImage } from "../utils/api/api";
import AddParticipantModal from "./LoginModal/AddParticipantModal";
import { VariantType } from "notistack";
dayjs.locale("fr");
interface EventsListProps {
  events: EventType[];
  handleSnackBar: (variant: VariantType, message: string) => void;
  refreshEvents: () => void;
}

export default function EventsList({
  events,
  handleSnackBar,
  refreshEvents,
}: EventsListProps) {
  const [isAddParticipantOpen, setIsAddParticipantOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {events.map((event: EventType) => {
            const start = dayjs(event.start);
            let miniature;
            if (event.images.length !== 0 && event.images[0].id !== null) {
              miniature =
                "http://127.0.0.1:8000/api/image/" + event.images[0].id;
            }

            return (
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 345,
                  height: "auto",
                  margin: "5px",
                  backgroundColor: "#005849",
                  color: "white",
                }}
              >
                <CardActionArea>
                  <CardHeader
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    sx={{ color: "white !important" }}
                    title={event.title}
                    subheaderTypographyProps={{ color: "#b1b1b1" }}
                    subheader={start.format("dddd DD MMMM YYYY")}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      miniature ??
                      "https://ain.sorsdetacoquille.fr/Images/pas-de-photo.png"
                    }
                    alt="Paella dish"
                  />
                  <CardActions
                    sx={{
                      flexDirection: "row-reverse",
                    }}
                    disableSpacing
                  >
                    <Tooltip title={"voir les participants"}>
                      <IconButton
                        aria-label="share"
                        onClick={(e) => {
                          handleClick(e);
                          setSelectedEvent(event);
                        }}
                      >
                        <PeopleAltIcon />
                      </IconButton>
                    </Tooltip>

                    {/* button to add people */}
                    <IconButton
                      onClick={() => {
                        setIsAddParticipantOpen(true);
                        setSelectedEvent(event);
                      }}
                      aria-label="PersonAddIcon"
                    >
                      <PersonAddIcon />
                    </IconButton>
                  </CardActions>
                </CardActionArea>
              </Card>
              // modal to add people
            );
          })}
        </div>
        <AddParticipantModal
          isAddParticipantOpen={isAddParticipantOpen}
          setIsAddParticipantOpen={setIsAddParticipantOpen}
          handleSnackBar={handleSnackBar}
          selectedEvent={selectedEvent}
          refreshEvents={refreshEvents}
        />
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
            },
          }}
        >
          {selectedEvent?.participants.map((participant, idx) => (
            <Tooltip title="copier l'email">
              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(participant.email);
                  handleSnackBar("success", "email copié");
                }}
                key={idx}
              >
                {participant.fullname +
                  " | " +
                  participant.email +
                  " | " +
                  participant.year}
              </MenuItem>
            </Tooltip>
          ))}
          {selectedEvent?.participants.length === 0 && (
            <MenuItem>Aucun participant</MenuItem>
          )}
        </Menu>
      </ThemeProvider>
    </>
  );
}
