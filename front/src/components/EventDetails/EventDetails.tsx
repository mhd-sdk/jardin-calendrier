import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { EventType } from "../../types";
import ReactFullscreenSlideshow from "react-fullscreen-slideshow";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";
import { API_BASE, editEvent } from "../../utils/api/api";
import { RModalImages } from "react-modal-images";
import dayjs from "dayjs";
import EditEvent from "../EditEvent/EditEvent";
import { VariantType } from "notistack";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export interface FullScreenDialogProps {
  event: EventType;
  setEvent: React.Dispatch<React.SetStateAction<EventType>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  handleSnackbar: (variant: VariantType, message: string) => void;
  refreshEvents: () => void;
}
export default function FullScreenDialog({
  event,
  setEvent,
  refreshEvents,
  open,
  setOpen,
  isAuthenticated,
  handleSnackbar,
}: FullScreenDialogProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };
  const saveEditedEvent = async () => {
    if (!isAuthenticated) {
      handleSnackbar(
        "error",
        "Vous devez être connecté pour modifier un evenement"
      );
      return;
    }
    // for each editedEvent.images, if it has not a filename, then set it to "old filee"
    const newImages = event.images.map((image) => {
      // @ts-ignore
      if (!image.filename) {
        return {
          ...image,
          filename: "old file",
        };
      } else {
        return image;
      }
    });
    const editedEvent = {
      ...event,
      images: newImages,
    };

    await editEvent(editedEvent);
    setIsEditing(false);
    setOpen(false);
    refreshEvents();
  };

  const start = dayjs(event?.start);
  const images = event?.images.map((image) => {
    return {
      image: API_BASE.BASE + "image/" + image.id,
      caption: "",
      description: "",
    };
  });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{ marginLeft: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              {event?.title}
            </Typography>
            {isAuthenticated &&
              (!isEditing ? (
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier l'evenement
                </Button>
              ) : (
                <Button autoFocus color="inherit" onClick={saveEditedEvent}>
                  Enregistrer les modifications
                </Button>
              ))}
          </Toolbar>
        </AppBar>
        {!isEditing ? (
          <Paper
            style={{
              padding: "20px",
              margin: "20px",
              backgroundColor: "#005849",
              color: "white",
            }}
          >
            {/* <img
          src={API_BASE.BASE + "image/" + image.id}
          srcSet={API_BASE.BASE + "image/" + image.id}
          loading="lazy"
        /> */}

            <Typography variant="h4" style={{ marginTop: "10px" }}>
              {event?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "10px",
              }}
            >
              {start.format("dddd DD MMMM YYYY")}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: event?.description }}></div>

            {images?.length > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <ReactFullscreenSlideshow
                  images={images}
                  title={"Example Image slideshow"}
                  // @ts-ignore
                  height={400}
                />
              </div>
            )}
          </Paper>
        ) : (
          <EditEvent
            event={event}
            handleClose={handleClose}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedEvent={event}
            setEditedEvent={setEvent}
          ></EditEvent>
        )}
      </>
    </Dialog>
  );
}
