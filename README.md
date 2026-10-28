# CBAM Data client examples

Example client for the CBAM Data API and MCP server: EU CBAM default values, certificate price and scope by CN code.

[CBAM Data](https://cbamdata.eu) is the EU Carbon Border Adjustment Mechanism (Reg (EU) 2023/956) as an API. A call takes a CN code, an origin country, a tonnage and a year. It returns whether the goods are in Annex I scope, the default emissions from Reg (EU) 2025/2621 as corrected by Reg (EU) 2026/1740, the certificates owed and the cost at the latest quarterly price.

This repo holds examples to copy. The API and the MCP server run at cbamdata.eu.

## Try it without a key

`/v1/resolve` answers 3 calls a day per address without a key.

```bash
curl "https://cbamdata.eu/v1/resolve?cn=72083900&origin=IN&tonnes=1000&year=2026"
```

1,000 t of Indian hot-rolled coil (CN 7208 39 00) on default values in 2026 comes back as 3,373 certificates, €277,665.36 at the Q3 2026 price of €82.32.

- [examples/resolve.sh](examples/resolve.sh): the same call with `curl` and `jq`
- [examples/resolve.mjs](examples/resolve.mjs): Node 18 or later, no dependencies

## Use it from an assistant (MCP)

The MCP server has 6 tools: `cbam_resolve`, `cbam_scope`, `cbam_defaults`, `cbam_changes`, `cbam_certificate_price` and `cbam_status`.

**Remote**, Streamable HTTP at `https://cbamdata.eu/mcp`. Send your key as `Authorization: Bearer <key>`. See [examples/mcp-remote.json](examples/mcp-remote.json).

**Local**, over stdio with [`@cbamdata/mcp`](https://www.npmjs.com/package/@cbamdata/mcp):

```bash
npx -y @cbamdata/mcp
```

See [examples/claude_desktop_config.json](examples/claude_desktop_config.json). Set `CBAM_API_KEY` to your key.

**Terminal**, with [`@cbamdata/cli`](https://www.npmjs.com/package/@cbamdata/cli):

```bash
npx -y @cbamdata/cli resolve --cn 72083900 --origin TR --tonnes 40 --year 2027
```

## Keys and limits

A key comes with the Developer plan at [cbamdata.eu/keys](https://cbamdata.eu/keys): 50,000 calls a month across up to 5 keys. With no key, `/v1/resolve` answers 3 times a day and `/v1/status` is open.

- API reference: [cbamdata.eu/docs](https://cbamdata.eu/docs) and [openapi.json](https://cbamdata.eu/openapi.json)
- What changed in each Commission update: [cbamdata.eu/changes](https://cbamdata.eu/changes)
- MCP Registry entry: `eu.cbamdata/cbam`

## License

MIT for the examples here. The data comes from the European Commission's published acts, cited in every answer.
