import { parseBooking } from "../../lib/parser";

export default async function handler(req, res) {
  try {
    // 🔴 YOUR API KEY GOES HERE
    const apiKey = "AIzaSyCQiICbQrKFRbr9c80_-7XNlfwhScpqYO4";

    const calendarId = "primary";

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch calendar events" });
    }

    const data = await response.json();

    let total = 0;
    let totalBookings = 0;
    let count = {};

    (data.items || []).forEach((event) => {
      const text =
        (event.summary || "") + " " + (event.description || "");

      const parsed = parseBooking(text);

      total += parsed.price || 0;
      totalBookings++;

      (parsed.keywords || []).forEach((k) => {
        count[k] = (count[k] || 0) + 1;
      });
    });

    return res.status(200).json({
      total,
      totalBookings,
      count,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
