import { parseBooking } from "../../lib/parser";

export default async function handler(req, res) {
  try {
    // 🧪 FAKE TEST DATA (so your dashboard works)
    const fakeEvents = [
      {
        summary: "Mermaid Castle",
        description: "12.30-3 Canolfan Gwili Centre £120 £20 deposit received"
      },
      {
        summary: "Lego Castle Party",
        description: "Birthday booking £150 soft play lego building"
      },
      {
        summary: "Candy Floss & Slush",
        description: "Fun run event £80 candy floss slush blue disco"
      },
      {
        summary: "Obstacle Course Hire",
        description: "School event £200 obstacle dino fun run"
      }
    ];

    let total = 0;
    let totalBookings = fakeEvents.length;
    let count = {};

    fakeEvents.forEach((event) => {
      const text = event.summary + " " + event.description;

      const parsed = parseBooking(text);

      total += parsed.price || 0;

      parsed.keywords.forEach((k) => {
        count[k] = (count[k] || 0) + 1;
      });
    });

    res.json({
      total,
      totalBookings,
      count,
      testMode: true
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
