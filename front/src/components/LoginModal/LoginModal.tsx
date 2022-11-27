import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { VariantType } from "notistack";
import React from "react";
import { loginRequest } from "../../utils/api/api";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSnackBar: (variant: VariantType, message: string) => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  handleSnackBar,
  setIsAuthenticated,
}: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLoginPressed = async () => {
    if ((await loginRequest(username, password)) === 200) {
      setIsLoginOpen(false);
      handleSnackBar("success", "Connexion réussie");
      setIsAuthenticated(true);
    } else {
      handleSnackBar(
        "error",
        "Connexion échouée, mot de passe ou nom d'utilisateur incorrect"
      );
      setIsAuthenticated(false);
    }
  };
  return (
    <Dialog
      open={isLoginOpen}
      TransitionComponent={Transition}
      onClose={() => setIsLoginOpen(false)}
    >
      <DialogTitle>{"Connexion"}</DialogTitle>
      <DialogContent>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="dense"
          id="username"
          label="nom d'utilisateur"
          fullWidth
          variant="filled"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="dense"
          id="password"
          label="mot de passe"
          fullWidth
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "white", marginRight: "auto" }}
          onClick={() => setIsLoginOpen(false)}
        >
          Nouvel utilisateur ?
        </Button>
        <Button sx={{ color: "white" }} onClick={() => setIsLoginOpen(false)}>
          Annuler
        </Button>
        <Button sx={{ color: "white" }} onClick={() => handleLoginPressed()}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
