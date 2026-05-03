export default async function handler(req, res) {
  try {
    // 🔐 GET FROM VERCEL ENV
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return res.status(500).json({
        error: "Missing environment variables"
      });
    }

    const now = new Date();
    const future = new Date();
    future.setFullYear(now.getFullYear() + 1);

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events` +
      `?key=${apiKey}&timeMin=${now.toISOString()}&timeMax=${future.toISOString()}`;

    const response = await fetch(url);

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "Google did not return JSON",
        raw: text
      });
    }

    if (!response.ok) {
      return res.status(500).json({
        error: "Google Calendar API failed",
        data
      });
    }

    const events = (data.items || []).map(e => ({
      summary: e.summary || "",
      description: e.description || "",
      start: e.start?.dateTime || e.start?.date
    }));

    let total = 0;
    let deposits = 0;
    let count = {};
    let filtered = [];

    events.forEach(e => {
      const date = new Date(e.start);

      // 📅 ONLY MAY
      if (date.getMonth() !== 4) return;

      const text = (e.summary + " " + e.description).toLowerCase();
      const lines = text.split("\n");

      lines.forEach(line => {
        const match = line.match(/£\s?(\d+)/);
        if (!match) return;

        const value = parseInt(match[1]);

        if (line.includes("deposit")) {
          deposits += value;
        } else {
          total += value;
        }
      });

      // 🔑 KEYWORDS
      const keywords = [
        "castle","obstacle","candyfloss","blue","purple",
        "white","kpop","lego","building","mermaid",
        "dino","fun run","slush","soft play","didi cars"
      ];

      keywords.forEach(k => {
        if (text.includes(k)) {
          count[k] = (count[k] || 0) + 1;
        }
      });

      filtered.push(e);
    });

    return res.status(200).json({
      events: filtered,
      total,
      deposits,
      totalBookings: filtered.length,
      count
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
