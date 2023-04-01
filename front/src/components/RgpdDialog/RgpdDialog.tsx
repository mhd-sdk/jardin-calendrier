import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RgpdDialog({ isOpen, onClose }: Props) {
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Politique de protection des données personnelles
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Nous sommes engagés à protéger la confidentialité de vos données
            personnelles conformément au Règlement Général sur la Protection des
            Données (RGPD) de l'Union européenne.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Quelles données collectons-nous et pourquoi ?
          </Typography>
          <Typography gutterBottom>
            Nous collectons les adresses e-mail des utilisateurs intéressés par
            nos événements. Nous utilisons ces adresses e-mail pour envoyer des
            informations sur les événements et pour permettre aux utilisateurs
            de s'inscrire aux événements.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Comment utilisons-nous les données ?
          </Typography>
          <Typography gutterBottom>
            Nous utilisons les adresses e-mail collectées pour envoyer des
            informations sur nos événements. Nous ne partagerons jamais ces
            données avec des tiers sans votre consentement explicite.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Comment protégeons-nous les données ?
          </Typography>
          <Typography gutterBottom>
            Nous prenons toutes les mesures nécessaires pour protéger vos
            données personnelles. Nous avons mis en place des mesures de
            sécurité techniques et organisationnelles appropriées pour empêcher
            la perte, l'utilisation abusive ou la modification non autorisée de
            vos données.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Comment pouvez-vous exercer vos droits ?
          </Typography>
          <Typography gutterBottom>
            Vous pouvez demander l'accès, la correction ou la suppression de vos
            données personnelles. Vous pouvez également vous opposer au
            traitement de vos données personnelles. Pour exercer vos droits,
            veuillez nous contacter à l'adresse e-mail fournie ci-dessous.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Comment nous contacter ?
          </Typography>
          <Typography gutterBottom>
            Si vous avez des questions ou des préoccupations concernant la
            protection de vos données personnelles, veuillez nous contacter à
            l'adresse e-mail suivante : Info.jardinherbaliste@elpmsn.fr . Nous
            nous engageons à répondre à toutes les demandes dans un délai
            raisonnable et à résoudre tous les problèmes liés à la protection
            des données de manière transparente et juste.
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
