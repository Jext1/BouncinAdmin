import { parseBooking } from "../../lib/parser";

...

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

  // 📅 MAY ONLY
  if (date.getMonth() !== 4) return;

  const text = e.summary + " " + e.description;
  const parsed = parseBooking(text);

  total += parsed.price;
  deposits += parsed.deposit;

  parsed.keywords.forEach(k => {
    count[k] = (count[k] || 0) + 1;
  });

  filtered.push(e);
});

return res.status(200).json({
  events: filtered,
  total,
  deposits,
  count,
  totalBookings: filtered.length
});
