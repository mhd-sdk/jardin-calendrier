import FullCalendar from "@fullcalendar/react";
import { styled } from "@mui/material";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { theme } from "./Theme";
export const Calendar = () => {
  return (
    <CalendarContainer>
      <FullCalendar
        height={"100%"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={frLocale}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={(arg) => {
          alert(arg.startStr);
        }}
      />
    </CalendarContainer>
  );
};
const CalendarContainer = styled("div")((props) => ({
  padding: "20px 20px",
  backgroundColor: theme.palette.primary.main,
  width: "80%",
  maxHeight: "100%",
  position: "relative",
  height: "calc(100% - 40px)",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
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
