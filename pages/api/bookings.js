import { parseBooking } from "../../lib/parser";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return res.status(500).json({ error: "Missing API config" });
    }

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const items = data.items || [];

    let total = 0;
    let totalBookings = items.length;
    let count = {};

    items.forEach(event => {
      const text = (event.summary || "") + " " + (event.description || "");

      const parsed = parseBooking(text);

      total += parsed.price || 0;

      parsed.keywords.forEach(k => {
        count[k] = (count[k] || 0) + 1;
      });
    });

    res.json({ total, totalBookings, count });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
