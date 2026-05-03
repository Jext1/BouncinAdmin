import { useState } from "react";

export default function Home() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert("Wrong login");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Bouncin Llanelli Admin</h1>

      <input placeholder="Username" onChange={e => setU(e.target.value)} />
      <br />

      <input type="password" placeholder="Password" onChange={e => setP(e.target.value)} />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}
