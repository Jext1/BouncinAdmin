import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
  }, []);

  // group events by date
  const grouped = {};

  events.forEach(e => {
    const date = new Date(e.start).toDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(e);
  });

  // build a simple month grid
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 Bouncin Calendar</h1>

      <h3>
        {today.toLocaleString("default", { month: "long" })} {year}
      </h3>

      {/* Week headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", fontWeight: "bold" }}>
        <div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dateObj = new Date(year, month, i + 1);
          const key = dateObj.toDateString();
          const dayEvents = grouped[key] || [];

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                minHeight: 80,
                padding: 5,
                background: "#fff"
              }}
            >
              <b>{i + 1}</b>

              {dayEvents.map((e, idx) => (
                <div key={idx} style={{ fontSize: 12, marginTop: 3 }}>
                  • {e.summary}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
