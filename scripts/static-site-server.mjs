import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist/site');
const port = Number(process.env.PORT ?? process.argv[3] ?? 4173);
const host = process.env.HOST ?? '127.0.0.1';
const config = JSON.parse(await readFile(join(root, 'staticwebapp.config.json'), 'utf8'));
const notFoundPath = config.responseOverrides?.['404']?.rewrite;

if (config.navigationFallback || notFoundPath !== '/404.html') {
  throw new Error('The static route contract requires no navigation fallback and a /404.html response override.');
}

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.vsix': 'application/zip',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.zip': 'application/zip'
};

function candidatePaths(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return [];
  const requested = resolve(root, `.${decoded}`);
  if (requested !== root && !requested.startsWith(`${root}/`)) return [];
  return [requested, join(requested, 'index.html')];
}

async function firstFile(pathname) {
  for (const candidate of candidatePaths(pathname)) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Keep looking; the configured 404 is served after every static lookup fails.
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${host}:${port}`);
    const file = await firstFile(url.pathname);
    const isNotFound = !file;
    const target = file ?? join(root, notFoundPath);
    const body = await readFile(target);
    response.writeHead(isNotFound ? 404 : 200, {
      'Content-Type': types[extname(target).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Static site server error.');
  }
});

server.listen(port, host, () => {
  console.log(`Static site route-contract server listening on http://${host}:${port}`);
});
