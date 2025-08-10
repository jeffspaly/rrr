// Simple mock API for sold prices on eBay
// This serverless function is designed for deployment on platforms like Vercel.
// It returns a list of random prices for a given query along with the average.

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function rnd(n = 6) {
  const base = 100 + Math.random() * 100;
  return Array.from({ length: n }, () => {
    // Generate values around the base within a +/-30 range
    return Math.round((base + (Math.random() - 0.5) * 60) * 100) / 100;
  });
}

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res);
    return res.status(200).end();
  }
  cors(res);
  // Grab query parameters
  const q = req.query && (req.query.q || req.query.query) ? String(req.query.q || req.query.query) : 'test';
  const site = req.query && req.query.site ? String(req.query.site) : 'US';
  const prices = rnd(6);
  const avg = Number((prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2));
  res.status(200).json({ ok: true, site, query: q, prices, avg });
};