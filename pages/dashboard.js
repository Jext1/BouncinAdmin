import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enGB from "date-fns/locale/en-GB";

const locales = { "en-GB": enGB };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.rawEvents || []).map((e) => ({
          title: e.summary || "Booking",
          start: new Date(e.start),
          end: new Date(e.end)
        }));

        setEvents(formatted);
      });
  }, []);

  return (
    <div style={{ height: "100vh", padding: 10 }}>
      <h2>Bouncin Llanelli Calendar</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh" }}
      />
    </div>
  );
}
