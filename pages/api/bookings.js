export default async function handler(req, res) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return res.status(500).json({
        error: "Missing GOOGLE_API_KEY or CALENDAR_ID in Vercel env"
      });
    }

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        error: "Google Calendar API failed",
        details: text
      });
    }

    const data = await response.json();

    const items = data.items || [];

    const events = items.map((e) => ({
      summary: e.summary || "No title",
      description: e.description || "",
      start: e.start?.dateTime || e.start?.date || null,
      end: e.end?.dateTime || e.end?.date || null
    }));

    return res.status(200).json({
      events,
      count: events.length
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server crashed",
      message: err.message
    });
  }
}
