import {
  DialogContent,
  Grid,
  TextField,
  List,
  ListItem,
  IconButton,
  Button,
  Paper,
  AppBar,
  Typography,
} from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import OnImagesLoaded from "react-on-images-loaded";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { RModalImages } from "react-modal-images";
import { DefaultEditor, Toolbar } from "react-simple-wysiwyg";
import { EventType, Image } from "../../types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { API_BASE, editEvent } from "../../utils/api/api";
import CloseIcon from "@mui/icons-material/Close";

interface EditEventProps {
  event: EventType;
  handleClose: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editedEvent: EventType;
  setEditedEvent: React.Dispatch<React.SetStateAction<EventType>>;
}
export default function EditEvent({
  event,
  handleClose,
  isEditing,
  setIsEditing,
  editedEvent,
  setEditedEvent,
}: EditEventProps): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const saveEditedEvent = async () => {
    // for each editedEvent.images, if it has not a filename, then set it to "old filee"
    const newImages = editedEvent.images.map((image) => {
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
    setEditedEvent({
      ...editedEvent,
      images: newImages,
    } as EventType);
  };

  React.useEffect(() => {
    const newImagesPromise = editedEvent.images.map((image) => {
      if (!image.id) {
        return image;
      } else {
        return getBase64FromUrl(API_BASE.BASE + "image/" + image?.id).then(
          (base64) => {
            return {
              base64: base64,
            };
          }
        );
      }
    });
    Promise.all(newImagesPromise).then((newImages) => {
      setEditedEvent({
        ...editedEvent,
        // @ts-ignore
        images: newImages,
      });
    });
  }, []);

  const onImageRemove = (index: number) => {
    const newImages = [...editedEvent.images];
    newImages.splice(index, 1);
    setEditedEvent({
      ...editedEvent,
      images: newImages,
    });
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getBase64FromUrl = (url: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };

  // function that transforms File to base4 string

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    var files = event.target.files;
    let filesb64 = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await toBase64(file);
        filesb64.push({
          filename: file.name,
          base64: result,
          url: "",
        } as Image);
      }
      setEditedEvent({
        ...editedEvent,
        images: [...editedEvent.images, ...filesb64],
      });
    }
  }
  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            zIndex: 10,
            top: 0,
            left: 0,
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <Paper
        hidden={isLoading}
        style={{
          padding: "20px 20px 20px 20px ",
          margin: "auto",
          backgroundColor: "#005849",
          color: "white",
          width: "50%",
        }}
      >
        <Grid
          sx={{
            padding: "10px",
          }}
          container
          spacing={2}
        >
          <Grid xs={12}>
            <TextField
              value={editedEvent.title}
              onChange={(e) => {
                setEditedEvent({ ...editedEvent, title: e.target.value });
              }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              margin="dense"
              id="username"
              label="nom de l'evenement"
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid xs={8}>
            <DatePicker
              label="Date de début"
              value={dayjs(editedEvent.start)}
              onChange={(newValue) => {
                if (newValue && editedEvent.start) {
                  setEditedEvent({ ...editedEvent, start: newValue.toDate() });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{
                    "& .MuiFilledInput-root": {
                      color: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={4}>
            <TimePicker
              label="Heure de début"
              value={dayjs(editedEvent.start)}
              onChange={(newValue) => {
                if (newValue && editedEvent.start) {
                  setEditedEvent({ ...editedEvent, start: newValue.toDate() });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{
                    "& .MuiFilledInput-root": {
                      color: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={8}>
            <DatePicker
              label="Date de fin"
              value={dayjs(editedEvent.end)}
              onChange={(newValue) => {
                if (newValue && editedEvent.end) {
                  setEditedEvent({ ...editedEvent, end: newValue.toDate() });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{
                    "& .MuiFilledInput-root": {
                      color: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={4}>
            <TimePicker
              label="Heure de fin"
              value={dayjs(editedEvent.end)}
              onChange={(newValue) => {
                if (newValue && editedEvent.end) {
                  setEditedEvent({ ...editedEvent, end: newValue.toDate() });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{
                    "& .MuiFilledInput-root": {
                      color: "white",
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={16}>
            <DefaultEditor
              value={editedEvent.description}
              onChange={(e) => {
                setEditedEvent({ ...editedEvent, description: e.target.value });
              }}
            />
            <List>
              {editedEvent.images?.map((image, index) => (
                <OnImagesLoaded
                  onLoaded={() => setIsLoading(false)}
                  timeout={15000}
                  onTimeout={() => console.log("timeout")}
                >
                  <>
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          onClick={() => {
                            console.log("remove :" + index);
                            onImageRemove(index);
                          }}
                          edge="end"
                          aria-label="comments"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <RModalImages
                        className="modal"
                        small={image.base64 ?? ""}
                        medium={image.base64 ?? ""}
                        large={image.base64 ?? ""}
                        alt={image.url ?? ""}
                        hideRotateButton
                        hideZoomButton
                      />
                      <span
                        style={{
                          // align text to the right
                          textAlign: "right",
                        }}
                      ></span>
                    </ListItem>
                  </>
                </OnImagesLoaded>
              ))}
            </List>
          </Grid>
          <Grid xs={16}>
            <Button
              component="label"
              variant="contained"
              fullWidth
              endIcon={<CloudUploadIcon />}
            >
              Upload des images
              <input
                onChange={handleUpload}
                hidden
                accept="image/*"
                multiple={true}
                type="file"
              />
            </Button>
          </Grid>
          <Grid xs={16}></Grid>
        </Grid>
        {/* debug button */}
      </Paper>
    </>
  );
}
