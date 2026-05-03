import jwt from "jsonwebtoken";

const USER = {
  username: "BouncinLlanelliAdmin",
  password: "ElioFina1921"
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    if (
      username !== USER.username ||
      password !== USER.password
    ) {
      return res.status(401).json({ error: "Invalid login" });
    }

    const token = jwt.sign(
      { user: username },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
