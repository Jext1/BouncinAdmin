import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "API failed");
        }

        return json;
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  // 🔴 Show error clearly on screen
  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h1>❌ Error Loading Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bouncin Dashboard</h1>

      <h2>Total Bookings: {data.totalBookings || 0}</h2>
      <h2>Total Revenue: £{data.total || 0}</h2>

      <h3>Breakdown:</h3>

      {Object.entries(data.count || {}).length === 0 ? (
        <p>No bookings found</p>
      ) : (
        Object.entries(data.count || {}).map(([k, v]) => (
          <p key={k}>{k}: {v}</p>
        ))
      )}
    </div>
  );
}
