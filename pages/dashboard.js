import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <h2>Total Bookings: {data.totalBookings}</h2>
      <h2>Total Revenue: £{data.total}</h2>

      <h3>Breakdown:</h3>
      {Object.entries(data.count).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
}
