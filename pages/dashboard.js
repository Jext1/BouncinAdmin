import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok || json.error) {
          throw new Error(json.error || "Calendar not found");
        }

        return json;
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  // 🔴 ERROR SCREEN
  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h1>📅 Calendar Not Found</h1>
        <p>We couldn’t load your bookings.</p>
        <p><b>Reason:</b> {error}</p>

        <hr />

        <p>Check:</p>
        <ul>
          <li>API key is correct</li>
          <li>Calendar ID is correct</li>
          <li>Google Calendar API is enabled</li>
        </ul>
      </div>
    );
  }

  // ⏳ LOADING
  if (!data) return <p>Loading calendar...</p>;

  // ✅ NORMAL VIEW
  return (
    <div style={{ padding: 20 }}>
      <h1>Bouncin Dashboard</h1>

      <h2>Total Bookings: {data.totalBookings || 0}</h2>
      <h2>Total Revenue: £{data.total || 0}</h2>

      <h3>Breakdown</h3>

      {Object.entries(data.count || {}).map(([k, v]) => (
        <p key={k}>{k}: {v}</p>
      ))}
    </div>
  );
}
