// Certificates and cost for one import. Run: node examples/resolve.mjs 72083900 IN 1000 2026
const [cn = "72083900", origin = "IN", tonnes = "1000", year = "2026"] = process.argv.slice(2);

const url = new URL("https://cbamdata.eu/v1/resolve");
url.search = new URLSearchParams({ cn, origin, tonnes, year }).toString();

const headers = process.env.CBAM_API_KEY ? { Authorization: `Bearer ${process.env.CBAM_API_KEY}` } : {};
const res = await fetch(url, { headers });
const body = await res.json();

if (!res.ok) {
  console.error(res.status, body.error ?? body);
  process.exit(1);
}

const { inScope, certificates, cost } = body.data;
console.log({ inScope, certificates, costEur: cost, dataVersion: body.meta.dataVersion });
