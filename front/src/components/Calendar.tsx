import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import { styled } from "@mui/material";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { theme } from "./Theme";
import React from "react";
import { VariantType } from "notistack";
import { getEvents } from "../utils/api/api";

type Props = {
  handleSnackBar: (variant: VariantType, message: string) => void;
  events: any;
  setEvents: React.Dispatch<React.SetStateAction<any>>;
  setIsCreateEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};
export const Calendar = ({
  setActiveTab,
  handleSnackBar,
  events,
  setEvents,
  setIsCreateEventOpen,
  setStartDate,
  setEndDate,
}: Props) => {
  const onSelect = (arg: DateSelectArg) => {
    const start = new Date(arg.startStr);
    start.setHours(8, 0, 0);
    const end = new Date(arg.endStr);
    end.setHours(18, 0, 0);
    end.setDate(end.getDate() - 1);
    setIsCreateEventOpen(true);
    setStartDate(start);
    setEndDate(end);
  };
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
  return (
    <CalendarContainer>
      <FullCalendar
        customButtons={{
          Reload: {
            text: "Actualiser",
            click: () => {
              refreshEvents();
            },
          },
        }}
        height={"100%"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        }}
        timeZone={"Europe/Paris"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "Reload dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={frLocale}
        editable={false}
        selectMirror={true}
        dayMaxEvents={true}
        select={(arg) => {
          onSelect(arg);
        }}
      />
    </CalendarContainer>
  );
};
const CalendarContainer = styled("div")((props) => ({
  padding: "20px 20px",
  margin: "20px 80px 0 80px",
  backgroundColor: theme.palette.primary.main,
  height: "80%",
  ".fc .fc-col-header-cell-cushion": {
    color: "white",
  },
  ".fc-toolbar-title": {
    color: "white",
  },
  ".fc-daygrid-day-number": {
    color: "white",
  },
  ".fc-button-primary": {
    backgroundColor: theme.palette.primary.light + " !important",
    border: theme.palette.primary.light + " 1px solid !important",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      border: theme.palette.primary.dark + " 1px solid",
    },
  },
  ".fc-button-active": {
    backgroundColor: theme.palette.primary.dark + " !important",
    border: theme.palette.primary.dark + " 1px solid !important",
  },
  ".fc-highlight": {
    backgroundColor: theme.palette.primary.dark,
  },
  ".fc-day-today ": {
    backgroundColor: theme.palette.primary.light + " !important",
  },
  ".fc-today-button": {
    color: "white",
    backgroundColor: theme.palette.primary.light,
  },
}));
