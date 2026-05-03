export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.CALENDAR_ID;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const events = (data.items || []).map((event) => ({
    summary: event.summary,
    start: event.start?.dateTime || event.start?.date,
    end: event.end?.dateTime || event.end?.date
  }));

  res.json({
    rawEvents: events
  });
}
