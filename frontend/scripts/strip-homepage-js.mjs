import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const homepagePath = resolve(join('out', 'index.html'));

let html = readFileSync(homepagePath, 'utf8');

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<link\b(?=[^>]*\brel=["'](?:preload|modulepreload)["'])(?=[^>]*\bas=["']script["'])[^>]*>/gi, '')
  .replace(/<link\b(?=[^>]*\bas=["']script["'])(?=[^>]*\brel=["'](?:preload|modulepreload)["'])[^>]*>/gi, '');

writeFileSync(homepagePath, html);
