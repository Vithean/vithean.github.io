import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import videosData from '../data/videos.json';

/**
 * /llms.txt — a link index of the whole manual, in the llmstxt.org format.
 * Generated from the docs collection so it can never drift from the sidebar.
 */

const SITE = 'https://help.vithean.com';

/** Sidebar-ish grouping. Anything unmatched lands in "Other pages". */
const SECTIONS: { title: string; prefix: string }[] = [
  { title: 'About Vithean', prefix: 'about' },
  { title: 'Getting started', prefix: 'get-started/' },
  { title: 'System setup', prefix: 'system-setup/' },
  { title: 'Recording transactions', prefix: 'process-flow/' },
  { title: 'Vendors & customers', prefix: 'data/' },
  { title: 'Reports', prefix: 'reports/' },
  { title: 'Troubleshooting', prefix: 'troubleshoot/' },
];

function urlFor(id: string): string {
  return id === 'index' ? `${SITE}/` : `${SITE}/${id}/`;
}

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const pages = docs
    .filter((entry) => entry.id !== 'index')
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      description: entry.data.description ?? '',
      url: urlFor(entry.id),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const line = (p: (typeof pages)[number]) =>
    `- [${p.title}](${p.url})${p.description ? `: ${p.description}` : ''}`;

  const used = new Set<string>();
  const blocks: string[] = [];

  for (const section of SECTIONS) {
    const items = pages.filter((p) => p.id === section.prefix || p.id.startsWith(section.prefix));
    if (items.length === 0) continue;
    items.forEach((p) => used.add(p.id));
    blocks.push(`## ${section.title}\n\n${items.map(line).join('\n')}`);
  }

  const videos = videosData.videos ?? [];
  if (videos.length > 0) {
    blocks.push(
      `## Video tutorials\n\n` +
        videos
          .map((v) => `- [${v.title}](${SITE}/tutorials/${v.slug}/): video walkthrough`)
          .join('\n')
    );
  }

  const rest = pages.filter((p) => !used.has(p.id));
  if (rest.length > 0) {
    blocks.push(`## Other pages\n\n${rest.map(line).join('\n')}`);
  }

  blocks.push(
    `## Optional\n\n` +
      [
        `- [Vithean product website](https://vithean.com/): pricing, plans and company information`,
        `- [Vithean web app](https://app.vithean.com/): sign in or start the 30-day free trial`,
        `- [Full manual as plain text](${SITE}/llms-full.txt): every page of this manual in one file`,
      ].join('\n')
  );

  const body = `# Vithean — cloud accounting software for businesses in Cambodia

> Vithean is a cloud-based online accounting and business management system built
> by POSCAR Digital Co., Ltd. for small and medium businesses operating in Cambodia.
> It covers invoicing with VAT, bills, journals, credit notes, payments, collections,
> bank reconciliation, customer and vendor records, and financial reports such as
> Profit and Loss. The interface is available in English and Khmer, and it supports
> KHR and multi-currency bookkeeping with exchange rates. Companies record their
> registration number and Tax Identification Number during setup. Vithean is offered
> as a subscription (Basic, Standard and Advanced plans) with a 30-day free trial.

This file indexes help.vithean.com, the official Vithean user manual. Everything
listed here is public documentation and free to quote or cite.

Product: https://app.vithean.com — Website: https://vithean.com
Support: support@vithean.com — Sales: sales@vithean.com — Phone/Telegram: +855 95 56 95 68

${blocks.join('\n\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
