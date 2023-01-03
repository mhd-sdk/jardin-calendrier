import * as React from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  styled,
  ThemeProvider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
dayjs.locale("fr");
interface EventsListProps {
  events: EventType[];
}

export default function EventsList({ events }: EventsListProps) {
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
            let miniature = "https://picsum.photos/200/300";
            if (event.images.length !== 0 && event.images[0].id !== null) {
              miniature =
                "http://127.0.0.1:8000/api/image/" + event.images[0].id;
            }

            return (
              <Card
                sx={{
                  maxWidth: 345,
                  flex: "1 0 21%",
                  margin: "5px",
                  backgroundColor: "#005849",
                }}
              >
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={event.title}
                  subheader={start.format("dddd DD MMMM YYYY")}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={miniature}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </ThemeProvider>
    </>
  );
}
