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
import { API_BASE } from "../../utils/api/api";
import { RModalImages } from "react-modal-images";
import dayjs from "dayjs";

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
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
}
export default function FullScreenDialog({
  event,
  open,
  setOpen,
  isAuthenticated,
}: FullScreenDialogProps) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {isAuthenticated && (
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
        <div dangerouslySetInnerHTML={{ __html: event.description }}></div>

        {images?.length > 0 && (
          <ReactFullscreenSlideshow
            images={images}
            title={"Example Image slideshow"}
          />
        )}
      </Paper>
    </Dialog>
  );
}
