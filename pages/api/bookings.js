const now = new Date();
const future = new Date();
future.setFullYear(now.getFullYear() + 1);

const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now.toISOString()}&timeMax=${future.toISOString()}`;

const response = await fetch(url);
const data = await response.json();

// 🔥 DEBUG HERE (THIS IS THE RIGHT PLACE)
console.log("CALENDAR ID:", calendarId);
console.log("RAW DATA:", data);
