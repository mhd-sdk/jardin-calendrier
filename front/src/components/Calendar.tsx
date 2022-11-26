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
  padding: "20px 0px",
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
}));
