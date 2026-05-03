export function parseBooking(text) {
  const lower = text.toLowerCase();

  // 🔍 find ALL £ values
  const moneyMatches = [...text.matchAll(/£\s?(\d+)/g)].map(m => parseInt(m[1]));

  let price = 0;
  let deposit = 0;

  // 🧠 rule:
  // if "deposit" is mentioned → that value is deposit
  // otherwise assume £20 is deposit (your standard)
  moneyMatches.forEach(val => {
    if (lower.includes("deposit") && deposit === 0) {
      deposit = val;
    } else if (val === 20 && deposit === 0) {
      deposit = 20;
    } else {
      price += val;
    }
  });

  // 🔑 keywords
  const keywords = [
    "castle","obstacle","candyfloss","blue","purple",
    "white","kpop","lego","building","mermaid",
    "dino","fun run","slush","soft play","didi cars"
  ];

  const found = keywords.filter(k => lower.includes(k));

  return {
    price,
    deposit,
    keywords: found
  };
}
