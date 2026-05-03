import { parseBooking } from "../../lib/parser";

export default async function handler(req, res) {
  const calendarId = "YOUR_CALENDAR_ID";
  const apiKey = "AIzaSyCQiICbQrKFRbr9c80_-7XNlfwhScpqYO4";

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  let total = 0;
  let totalBookings = 0;
  let count = {};

  (data.items || []).forEach((event) => {
    const text = (event.summary || "") + " " + (event.description || "");

    const parsed = parseBooking(text);

    total += parsed.price;
    totalBookings++;

    parsed.keywords.forEach((k) => {
      count[k] = (count[k] || 0) + 1;
    });
  });

  res.json({
    total,
    totalBookings,
    count
  });
}
