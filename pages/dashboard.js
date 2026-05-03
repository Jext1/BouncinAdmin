import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() =>
        setData({ total: 0, totalBookings: 0, count: {} })
      );
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bouncin Dashboard</h1>

      <h2>Total Bookings: {data.totalBookings || 0}</h2>
      <h2>Total Revenue: £{data.total || 0}</h2>

      <h3>Breakdown:</h3>

      {Object.entries(data.count || {}).length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        Object.entries(data.count || {}).map(([k, v]) => (
          <p key={k}>
            {k}: {v}
          </p>
        ))
      )}
    </div>
  );
}
