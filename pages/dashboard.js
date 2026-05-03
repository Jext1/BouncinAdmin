import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error);
        return json;
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h2>📅 Calendar not found</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bouncin Calendar Dashboard</h1>

      {/* SUMMARY */}
      <div style={{ marginBottom: 20 }}>
        <h3>Total Bookings: {data.totalBookings}</h3>
        <h3>Total Revenue: £{data.total}</h3>
      </div>

      {/* SIMPLE CALENDAR PLACEHOLDER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 10,
          textAlign: "center"
        }}
      >
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
          <div key={d} style={{ fontWeight: "bold" }}>{d}</div>
        ))}

        {/* FAKE GRID (just to show layout works) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              minHeight: 50
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* BREAKDOWN */}
      <h3 style={{ marginTop: 30 }}>Items</h3>

      {Object.entries(data.count || {}).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}
    </div>
  );
}
