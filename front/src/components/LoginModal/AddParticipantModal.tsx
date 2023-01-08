import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import SendIcon from "@mui/icons-material/Send";
import { TransitionProps } from "@mui/material/transitions";
import { VariantType } from "notistack";
import React from "react";
import { addParticipant, loginRequest } from "../../utils/api/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { EventType } from "../../types";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  isAddParticipantOpen: boolean;
  setIsAddParticipantOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSnackBar: (variant: VariantType, message: string) => void;
  selectedEvent: EventType | null | undefined;
  refreshEvents: () => void;
};

export default function AddParticipantModal({
  isAddParticipantOpen,
  setIsAddParticipantOpen,
  handleSnackBar,
  refreshEvents,
  selectedEvent,
}: Props) {
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState("1e année");
  const [autre, setAutre] = React.useState("");

  const handleRequest = async () => {
    if (selectedEvent !== null && selectedEvent !== undefined) {
      setLoading(true);
      if (
        (await addParticipant(
          selectedEvent.id,
          email,
          fullname,
          currentYear === "autre" ? autre : currentYear.toString()
        )) === 201
      ) {
        setIsAddParticipantOpen(false);
        handleSnackBar("success", "Participant ajouté");
        refreshEvents();
      } else {
        handleSnackBar(
          "error",
          "Erreur lors de l'ajout du participant, ce mail est deja utilisé"
        );
      }
      setLoading(false);
    }
  };
  const handleChangeYear = (event: SelectChangeEvent) => {
    setCurrentYear(event.target.value as string);
  };
  return (
    <Dialog
      open={isAddParticipantOpen}
      TransitionComponent={Transition}
      onClose={() => {
        setIsAddParticipantOpen(false);
        setFullname("");
        setEmail("");
      }}
    >
      <DialogTitle>{"S'inscrire a un evenement"}</DialogTitle>
      <DialogContent>
        <TextField
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="dense"
          id="nom complet"
          label="nom complet"
          fullWidth
          variant="filled"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="dense"
          id="password"
          label="e-mail"
          fullWidth
          variant="filled"
        />
        <Select
          variant="filled"
          fullWidth
          onChange={(event) => handleChangeYear(event as SelectChangeEvent)}
          value={currentYear}
          sx={{
            marginTop: "10px",
            // childs
            "& .MuiSelect-select": {
              color: "white",
              paddingTop: "15px",
              paddingBottom: "15px",
            },
          }}
        >
          <MenuItem value={"1e année"}>
            <em>1e année</em>
          </MenuItem>
          <MenuItem value={"2e année"}>
            <em>2e année</em>
          </MenuItem>
          <MenuItem value={"3e année"}>
            <em>3e année</em>
          </MenuItem>
          <MenuItem value={"autre"}>
            <em>Autre</em>
          </MenuItem>
        </Select>
        {currentYear === "autre" && (
          <TextField
            value={autre}
            onChange={(e) => setAutre(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            margin="dense"
            id="autre"
            fullWidth
            variant="filled"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            setIsAddParticipantOpen(false);
            setFullname("");
            setEmail("");
          }}
        >
          Annuler
        </Button>
        <LoadingButton
          sx={{ color: "white", width: "fit-content" }}
          onClick={() => handleRequest()}
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
        >
          Valider
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
