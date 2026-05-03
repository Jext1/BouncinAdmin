import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USER = {
  username: "BouncinLlanelliAdmin",
  passwordHash: "$2a$10$WqJYqE9Q9nFzWz5XH9cYKuP6lZ9q7yYpQ1zZ6k7YxU6b2R9GZpX8K"
};

export default async function handler(req, res) {
  const { username, password } = req.body;

  if (username !== USER.username) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const valid = await bcrypt.compare(password, USER.passwordHash);

  if (!valid) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const token = jwt.sign({ user: username }, "SECRET_KEY", {
    expiresIn: "1d"
  });

  res.json({ token });
}
