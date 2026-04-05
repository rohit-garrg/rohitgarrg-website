import { readPosts } from './content-reader.js';
import { composeEmail, formatDate } from './email-composer.js';
import fs from 'fs';
import path from 'path';

const { latest, previous } = readPosts();

console.log(`Latest post: "${latest.title}" (${formatDate(latest.date)})`);
console.log(`Previous: ${previous.map(p => `"${p.title}"`).join(', ')}`);

const html = composeEmail(latest, previous);

const previewPath = path.join(process.cwd(), 'scripts/preview-email.html');
fs.writeFileSync(previewPath, html);
console.log(`Preview written to ${previewPath}`);
console.log(`Open in browser: file://${previewPath}`);
