import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error);

        return json;
      })
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h2>Calendar error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!events) return <p>Loading...</p>;

  // 🧠 group events by day
  const grouped = {};

  events.forEach((e) => {
    const date = new Date(e.start).toDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(e);
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Bouncin Calendar</h1>

      {Object.keys(grouped).length === 0 && (
        <p>No bookings found</p>
      )}

      {Object.entries(grouped).map(([date, list]) => (
        <div key={date} style={{ marginBottom: 20 }}>
          <h3>{date}</h3>

          {list.map((e, i) => (
            <div
              key={i}
              style={{
                padding: 10,
                border: "1px solid #ccc",
                marginBottom: 5
              }}
            >
              <b>{e.summary}</b>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
