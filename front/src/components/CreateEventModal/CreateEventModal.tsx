import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultEditor } from "react-simple-wysiwyg";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Unstable_Grid2";
import { TransitionProps } from "@mui/material/transitions";
import { VariantType } from "notistack";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { RModalImages } from "react-modal-images";
import LoadingButton from "@mui/lab/LoadingButton";
import { createEvent } from "../../utils/api/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  isCreateEventOpen: boolean;
  setIsCreateEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSnackBar: (variant: VariantType, message: string) => void;
  startDate: Date;
  endDate: Date;
  refreshEvents: () => void;
};
type image = {
  filename: string;
  base64: string;
};

export default function CreateEventModal({
  isCreateEventOpen,
  setIsCreateEventOpen,
  handleSnackBar,
  startDate,
  endDate,
  refreshEvents,
}: Props) {
  const [inputStartDate, setInputStartDate] = React.useState<Date>();
  const [inputEndDate, setInputEndDate] = React.useState<Date>();
  const [html, setHtml] = React.useState("Description de l'événement");
  const [requestIsLoading, setRequestIsLoading] = React.useState(false);

  function onChange(e: any) {
    setHtml(e.target.value);
  }
  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    var files = event.target.files;
    let filesb64 = [];
    if (files) {
      // for each file console log test
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await toBase64(file);
        // if file already in array replace it
        let index = imagesBase64.findIndex((img) => img.filename === file.name);
        if (index !== -1) {
          imagesBase64.splice(index, 1);
        }

        filesb64.push({ filename: file.name, base64: result });
      }
      setImagesBase64([...imagesBase64, ...(filesb64 as image[])]);
    }
  }
  const [imagesBase64, setImagesBase64] = React.useState<image[]>([]);
  const handleCreate = async () => {
    // format start date to yyy-mm-dd hh:mm:ss
    let startDate = inputStartDate;
    let endDate = inputEndDate;
    let description = html;
    setRequestIsLoading(true);
    if (startDate && endDate) {
      let startDateTime = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()}`;
      let endDateTime = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;

      let postBody = {
        title: newEventName,
        images: imagesBase64,
        start: startDateTime,
        end: endDateTime,
        description: description,
      };
      console.log(postBody);
      const result = await createEvent(postBody);
      if (result === 201) {
        setRequestIsLoading(false);
        handleSnackBar("success", "Evenement crée");
        refreshEvents();
        setIsCreateEventOpen(false);
      } else if (result === 401) {
        handleSnackBar(
          "error",
          "Vous devez etre connecté pour créer un événement"
        );
        setRequestIsLoading(false);
        setIsCreateEventOpen(false);
      } else {
        handleSnackBar(
          "error",
          "Une erreur est survenue, le formulaire est-il complet ?"
        );
        setRequestIsLoading(false);
      }
    }
  };
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const removeImage = (index: number) => {
    let newImages = [...imagesBase64];
    newImages.splice(index, 1);
    setImagesBase64(newImages);
  };
  React.useEffect(() => {
    setInputStartDate(startDate);
    setInputEndDate(endDate);
  }, [startDate, endDate]);
  const [newEventName, setNewEventName] = React.useState("");
  return (
    <Dialog
      open={isCreateEventOpen}
      TransitionComponent={Transition}
      onClose={() => setIsCreateEventOpen(false)}
    >
      <DialogTitle>
        <>{"Nouvel Evenement..."}</>
      </DialogTitle>
      <DialogContent>
        <Grid
          sx={{
            padding: "10px",
          }}
          container
          spacing={2}
        >
          <Grid xs={12}>
            <TextField
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
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
              value={dayjs(inputStartDate)}
              onChange={(newValue) => {
                if (newValue && inputEndDate) {
                  // check if the new date is after the end date
                  if (newValue.toDate() <= inputEndDate) {
                    console.log(newValue.toDate());
                    setInputStartDate(newValue.toDate());
                  } else {
                    handleSnackBar(
                      "error",
                      "la date de début doit être avant la date de fin"
                    );
                  }
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
              value={dayjs(inputStartDate)}
              onChange={(newValue) => {
                if (newValue && inputEndDate) {
                  // check if the new date is after the end date
                  if (newValue.toDate() <= inputEndDate) {
                    setInputStartDate(newValue.toDate());
                  } else {
                    handleSnackBar(
                      "error",
                      "la date de début doit être avant la date de fin"
                    );
                  }
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
              value={dayjs(inputEndDate)}
              onChange={(newValue) => {
                if (newValue && inputStartDate) {
                  // check if the new date is after the end date
                  if (newValue.toDate() >= inputStartDate) {
                    setInputEndDate(newValue.toDate());
                  } else {
                    handleSnackBar(
                      "error",
                      "la date de fin doit être après la date de début"
                    );
                  }
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
              value={dayjs(inputEndDate)}
              onChange={(newValue) => {
                if (newValue && inputStartDate) {
                  // check if the new date is after the end date
                  if (newValue.toDate() >= inputStartDate) {
                    setInputEndDate(newValue.toDate());
                  } else {
                    handleSnackBar(
                      "error",
                      "la date de fin doit être après la date de début"
                    );
                  }
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
            <List>
              {imagesBase64.map((image, index) => (
                <>
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          removeImage(index);
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
                      small={image.base64}
                      medium={image.base64}
                      large={image.base64}
                      alt={image.filename}
                      hideRotateButton
                      hideZoomButton
                    />
                    <span
                      style={{
                        // align text to the right
                        textAlign: "right",
                      }}
                    >
                      {image.filename}
                    </span>
                  </ListItem>
                </>
              ))}
            </List>
            <DefaultEditor value={html} onChange={onChange} />
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "white" }}
          onClick={() => setIsCreateEventOpen(false)}
        >
          Annuler
        </Button>
        <Button
          onClick={() => {
            console.log(inputStartDate);
          }}
        >
          Debug
        </Button>
        <LoadingButton
          sx={{ color: "white", width: "fit-content" }}
          onClick={() => handleCreate()}
          loading={requestIsLoading}
          loadingPosition="end"
          endIcon={<SendIcon />}
        >
          Valider
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
