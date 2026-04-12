import { readPosts } from './content-reader.js';
import { composeEmail, formatDate } from './email-composer.js';
import { send, getLastSentEmail, getSubscriberCount } from './providers/buttondown.js';
import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const args = process.argv.slice(2);
const isPreview = args.includes('--preview');
const isDryRun = args.includes('--dry-run');

if (!isPreview && !process.env.BUTTONDOWN_API_KEY) {
  console.error('Error: BUTTONDOWN_API_KEY is not set.');
  console.error('Run via: npm run send (or npm run send:dry-run)');
  process.exit(1);
}

function confirm(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  // 1. Read content
  const { latest, previous } = readPosts();
  console.log(`\nLatest post: "${latest.title}" (${formatDate(latest.date)})`);
  console.log(`Previous: ${previous.map(p => `"${p.title}"`).join(', ')}\n`);

  // 2. Compose email
  const html = composeEmail(latest, previous);
  const subject = latest.title;

  // 3. Write preview (always)
  const previewPath = path.join(process.cwd(), 'scripts/preview-email.html');
  fs.writeFileSync(previewPath, html);
  console.log(`Preview written to ${previewPath}`);

  // 4. Preview-only mode
  if (isPreview) {
    console.log(`Open in browser: file://${previewPath}`);
    return;
  }

  // 5. Duplicate check
  try {
    const lastEmail = await getLastSentEmail();
    if (lastEmail && lastEmail.subject.trim() === subject.trim()) {
      console.error(`\nAlready sent: "${subject}"`);
      console.error('The most recent email in Buttondown matches this post. Aborting.');
      process.exit(0);
    }
  } catch (err) {
    console.warn(`\nWarning: Could not check for duplicates — ${err.message}`);
    console.warn('Proceeding to confirmation.\n');
  }

  // 6. Subscriber count
  const count = await getSubscriberCount();
  const countDisplay = count !== null ? count : 'unknown';

  // 7. Confirmation
  console.log('Ready to send:');
  console.log(`  Post:        "${subject}"`);
  console.log(`  Subscribers: ${countDisplay}\n`);

  const answer = await confirm('Send? (y/n): ');
  if (answer !== 'y') {
    console.log('Send cancelled.');
    return;
  }

  // 8. Dry-run exit
  if (isDryRun) {
    console.log('\nDry run: skipping send.');
    return;
  }

  // 9. Send
  console.log('\nSending...');
  const result = await send(subject, html);

  if (result.ok) {
    console.log('Newsletter sent successfully!');
  } else {
    console.error(`Send failed: ${result.error}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
