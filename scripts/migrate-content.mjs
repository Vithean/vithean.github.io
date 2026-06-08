// One-time migration: docs/**/*.md (Docsify) -> src/content/docs/**/*.md (Starlight)
// Run with:  node scripts/migrate-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'docs');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'docs');

// (file relative path in docs/, output relative path in src/content/docs/, title, description)
const MAP = [
  ['get-started/subscription.md',           'get-started/subscription.md',            'Subscription',              'Vithean subscription plans and free trial.'],
  ['get-started/signup.md',                  'get-started/signup.md',                   'How to sign up',            'Create your Vithean account in a few minutes.'],
  ['get-started/initial-company-setup.md',   'get-started/initial-company-setup.md',    'Initial company setup',     'Set up your company in Vithean after registering.'],
  ['system-setup/company-setting.md',        'system-setup/company-setting.md',         'Company Setting',           'Configure your company information.'],
  ['system-setup/advance-setting.md',        'system-setup/advance-setting.md',         'Advance Setting',           'Advanced configuration options.'],
  ['system-setup/user-administration.md',    'system-setup/user-administration.md',     'User Administration',       'Manage users, roles, and permissions.'],
  ['system-setup/change-language.md',        'system-setup/change-language.md',         'Change Language',           'Switch the interface language.'],
  ['process-flow/bill.md',                   'process-flow/bill.md',                    'Bill',                      'Record bills from vendors.'],
  ['process-flow/invoice.md',                'process-flow/invoice.md',                 'Invoice',                   'Create and manage customer invoices.'],
  ['process-flow/journal.md',                'process-flow/journal.md',                 'Journal',                   'Record manual journal entries.'],
  ['process-flow/creditnote.md',             'process-flow/creditnote.md',              'Credit Note',               'Issue and track credit notes.'],
  ['process-flow/start-reconciliation.md',   'process-flow/start-reconciliation.md',    'Start Reconciliation',      'Reconcile your bank accounts.'],
  ['process-flow/transfer.md',               'process-flow/transfer.md',                'Transfer',                  'Move funds between accounts.'],
  ['process-flow/payment.md',                'process-flow/payment.md',                 'Payment',                   'Record payments to vendors.'],
  ['process-flow/collection.md',             'process-flow/collection.md',              'Collection',                'Record collections from customers.'],
  ['data/vendors.md',                        'data/vendors.md',                         'Vendors',                   'Manage your vendor list.'],
  ['data/customers.md',                      'data/customers.md',                       'Customers',                 'Manage your customer list.'],
  ['reports/profit-and-loss.md',             'reports/profit-and-loss.md',              'Profit and Loss Report',    'Generate the P&L report.'],
  ['troubleshoot/README.md',                 'troubleshoot/faq.md',                     'FAQ',                       'Frequently asked questions.'],
  ['CHANGELOG.md',                           'changelog.md',                            'Changelog',                 'Release notes and version history.'],
  ['contact.md',                             'contact.md',                              'Contact Us',                'Get in touch with the Vithean team.'],
];

// folder of the source file -> prefix to apply to bare "images/..." paths
function imagePrefixFor(srcRelPath) {
  const folder = path.posix.dirname(srcRelPath.replaceAll('\\', '/'));
  if (folder === '.' || folder === '') return '/images';
  return `/images/${folder}`;
}

function transform(content, srcRelPath, title, description) {
  let out = content;

  // 1) Strip the inline logo <img> blocks that appear at the top
  out = out.replace(/^<img[^>]*logo\.png[^>]*>(\s*<br\/?>)?\s*\n+/i, '');

  // 2) Rewrite ../assets/images/...  -> /images/...
  out = out.replace(/\.\.\/assets\/images\//g, '/images/');
  out = out.replace(/assets\/images\//g, '/images/');

  // 3) Rewrite ../<section>/images/... -> /images/<section>/...
  out = out.replace(/\.\.\/(get-started|process-flow|system-setup|data|reports|troubleshoot)\/images\//g,
                    '/images/$1/');

  // 4) Rewrite local "images/foo.png" (no leading slash) -> "/images/<currentSection>/foo.png"
  const imgPrefix = imagePrefixFor(srcRelPath);
  out = out.replace(/(\s|^|"|\()(images\/)/g, `$1${imgPrefix}/`);

  // 5) Rewrite cross-page links: contact.md -> /contact, README.md -> /, etc.
  out = out.replace(/\]\(contact\.md\)/g, '](/contact/)');
  out = out.replace(/\]\(\.\.\/contact\.md\)/g, '](/contact/)');
  out = out.replace(/\]\(README\.md\)/g, '](/)');
  out = out.replace(/\]\(\.\.\/README\.md\)/g, '](/)');
  out = out.replace(/\]\(CHANGELOG\.md\)/g, '](/changelog/)');

  // 6) Remove the first H1 (Starlight uses the frontmatter title for the H1)
  out = out.replace(/^#\s+\*?\*?(.+?)\*?\*?\s*$/m, '').replace(/^\n+/, '');

  // 7) Build frontmatter
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    '---',
    '',
  ].join('\n');

  return fm + out;
}

let migrated = 0;
for (const [src, dst, title, description] of MAP) {
  const srcPath = path.join(SRC_DIR, src);
  const dstPath = path.join(OUT_DIR, dst);
  if (!fs.existsSync(srcPath)) {
    console.warn(`SKIP (missing): ${src}`);
    continue;
  }
  const content = fs.readFileSync(srcPath, 'utf8');
  const transformed = transform(content, src, title, description);
  fs.mkdirSync(path.dirname(dstPath), { recursive: true });
  fs.writeFileSync(dstPath, transformed, 'utf8');
  migrated++;
  console.log(`OK  ${src}  ->  ${dst}`);
}
console.log(`\nMigrated ${migrated} files.`);
