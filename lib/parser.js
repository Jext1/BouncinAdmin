const keywords = [
  "castle",
  "obstacle",
  "candyfloss",
  "blue disco",
  "purple",
  "white",
  "kpop",
  "lego",
  "building",
  "mermaid",
  "dino",
  "fun run",
  "slush",
  "candy floss",
  "soft play",
  "didi cars"
];

export function parseBooking(text) {
  const lower = text.toLowerCase();

  const found = keywords.filter((k) => lower.includes(k));

  const priceMatch = text.match(/£\d+/);
  const price = priceMatch
    ? parseInt(priceMatch[0].replace("£", ""))
    : 0;

  return {
    keywords: found,
    price
  };
}
