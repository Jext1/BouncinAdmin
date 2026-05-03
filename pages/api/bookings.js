export default async function handler(req, res) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return res.status(500).json({
        error: "Missing API key or Calendar ID in Vercel"
      });
    }

    const now = new Date();
    const future = new Date();
    future.setFullYear(now.getFullYear() + 1);

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now.toISOString()}&timeMax=${future.toISOString()}`;

    const response = await fetch(url);

    // 🔥 DEBUG RAW RESPONSE
    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Google did not return JSON",
        raw: text
      });
    }

    const events = (data.items || []).map(e => ({
      summary: e.summary || "No title",
      description: e.description || "",
      start: e.start?.dateTime || e.start?.date
    }));

    return res.status(200).json({
      events,
      count: events.length
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
