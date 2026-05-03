import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { username, password } = req.body;

  // ⚠️ SIMPLE LOGIN (NOT SECURE - TEMP ONLY)
  if (
    username === "BouncinLlanelliAdmin" &&
    password === "ElioFina1921"
  ) {
    const token = jwt.sign(
      { user: username },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid login" });
}
