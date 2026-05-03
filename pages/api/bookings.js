import { parseBooking } from "../../lib/parser";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // ✅ safer
    const calendarId = process.env.CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return res.status(500).json({ error: "Missing env variables" });
    }

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const items = data.items || [];

    let total = 0;
    let totalBookings = 0;
    let count = {};

    items.forEach((event) => {
      const text =
        (event.summary || "") + " " + (event.description || "");

      const parsed = parseBooking(text);

      total += parsed.price || 0;
      totalBookings++;

      (parsed.keywords || []).forEach((k) => {
        count[k] = (count[k] || 0) + 1;
      });
    });

    return res.status(200).json({ total, totalBookings, count });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
