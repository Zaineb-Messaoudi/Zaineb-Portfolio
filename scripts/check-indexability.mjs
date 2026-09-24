const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error("Usage: node scripts/check-indexability.mjs <production-url> [additional-url...]");
  process.exit(1);
}

let failed = false;

for (const url of urls) {
  const response = await fetch(url, { redirect: "manual" });
  const contentType = response.headers.get("content-type") || "";
  const headerRobots = response.headers.get("x-robots-tag") || "";
  const html = contentType.includes("text/html") ? await response.text() : "";
  const metaRobots = [...html.matchAll(/<meta[^>]+name=["'](?:robots|googlebot)["'][^>]+content=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .join(", ");

  if (response.status >= 400 || /(^|[,\s])noindex([,\s]|$)/i.test(`${headerRobots}, ${metaRobots}`)) {
    console.error(`Indexability check failed for ${url}: status=${response.status}, x-robots-tag="${headerRobots}", meta="${metaRobots}"`);
    failed = true;
  } else {
    console.log(`Indexability OK: ${url}`);
  }
}

if (failed) process.exit(1);
