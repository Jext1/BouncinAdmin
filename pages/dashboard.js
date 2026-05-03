import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const grouped = {};

  data.events.forEach(e => {
    const key = new Date(e.start).toDateString();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  const year = new Date().getFullYear();

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 Bouncin Dashboard (May)</h1>

      <h3>Total Bookings: {data.totalBookings}</h3>
      <h3>Total Revenue: £{data.total}</h3>
      <h3>Total Deposits: £{data.deposits}</h3>

      {/* CALENDAR */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 5
      }}>
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
          <div key={d}><b>{d}</b></div>
        ))}

        {Array.from({ length: 31 }).map((_, i) => {
          const date = new Date(year, 4, i + 1);
          const key = date.toDateString();
          const dayEvents = grouped[key] || [];

          return (
            <div key={i} style={{
              border: "1px solid #ccc",
              minHeight: 80,
              padding: 5
            }}>
              <b>{i + 1}</b>

              {dayEvents.map((e, idx) => (
                <div key={idx} style={{ fontSize: 12 }}>
                  • {e.summary}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* BREAKDOWN */}
      <h3 style={{ marginTop: 20 }}>Breakdown</h3>
      {Object.entries(data.count).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}
    </div>
  );
      }
