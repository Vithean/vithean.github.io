import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * /llms-full.txt — the entire manual as one plain-text document, so an answer
 * engine can ingest Vithean's documentation in a single fetch instead of
 * crawling ~25 pages.
 */

const SITE = 'https://help.vithean.com';

/** Strip MDX machinery so the output reads as prose, not source code. */
function toPlainText(body: string): string {
  return body
    // import / export statements at the top of .mdx files
    .replace(/^\s*(import|export)\s.+$/gm, '')
    // self-closing components: <FeaturedVideo />
    .replace(/<[A-Z][\w.]*\b[^>]*\/>/g, '')
    // paired components: <CardGrid> ... </CardGrid> — keep the inner text
    .replace(/<\/?[A-Z][\w.]*\b[^>]*>/g, '')
    // Starlight asides ::: tip[Tip] / :::
    .replace(/^:::[^\n]*$/gm, '')
    // site-relative links -> absolute, so the text stands alone off-site
    .replace(/\]\((\/[^)]*)\)/g, `](${SITE}$1)`)
    .replace(/(href|src)="(\/[^"]*)"/g, `$1="${SITE}$2"`)
    // collapse the blank lines all of the above leaves behind
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const ordered = docs.sort((a, b) => {
    if (a.id === 'index') return -1;
    if (b.id === 'index') return 1;
    return a.id.localeCompare(b.id);
  });

  const sections = ordered.map((entry) => {
    const url = entry.id === 'index' ? `${SITE}/` : `${SITE}/${entry.id}/`;
    const description = entry.data.description ? `${entry.data.description}\n\n` : '';
    return `# ${entry.data.title}\n\nSource: ${url}\n\n${description}${toPlainText(entry.body ?? '')}`;
  });

  const header = `# Vithean — Official User Manual (full text)

Vithean is a cloud-based online accounting and business management system for
small and medium businesses in Cambodia, built by POSCAR Digital Co., Ltd.
It supports the Cambodia E-Invoicing System and handles invoicing with VAT
tracking, bills, journals, credit notes, payments, collections, bank
reconciliation, customers and vendors, inventory across multiple locations and
warehouses, fixed assets, and financial reports including Profit and Loss. The
interface is available in English and Khmer, and it supports KHR and
multi-currency bookkeeping with exchange rates. Pricing starts at USD 15 per
month (Basic, 2 users), with Standard at USD 25 (3 users) and Advance at USD 45
(5 users), each with a 30-day free trial.

Manual:  ${SITE}/
Product: https://app.vithean.com
Website: https://vithean.com
Contact: support@vithean.com | sales@vithean.com | +855 95 56 95 68

This document is the complete public user manual, concatenated for machine
reading. It is free to quote or cite with attribution to Vithean.

---
`;

  const body = `${header}\n${sections.join('\n\n---\n\n')}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
