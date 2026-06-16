import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.argv[3] ?? process.env.PORT ?? 3000);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function resolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0] ?? '/');
  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const requestedPath = resolve(join(root, normalizedPath));

  if (!requestedPath.startsWith(root)) {
    return null;
  }

  const candidates = [
    requestedPath,
    join(requestedPath, 'index.html'),
    `${requestedPath}.html`,
    join(root, '404.html'),
  ];

  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

const server = createServer((request, response) => {
  const filePath = resolveStaticPath(request.url ?? '/');

  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const statusCode = filePath.endsWith('404.html') ? 404 : 200;
  const contentType = contentTypes[extname(filePath)] ?? 'application/octet-stream';

  response.writeHead(statusCode, { 'Content-Type': contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
