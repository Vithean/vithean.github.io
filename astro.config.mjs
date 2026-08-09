// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

/**
 * Schema.org JSON-LD describing the product this manual documents.
 * Consumed by Google (AI Overviews / knowledge panel), Bing/Copilot and the
 * retrieval layer of AI answer engines, which prefer explicit machine-readable
 * facts over prose inference.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://vithean.com/#software',
      name: 'Vithean',
      alternateName: 'Vithean Accounting',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Accounting Software',
      operatingSystem: 'Web browser (cloud-based)',
      url: 'https://vithean.com',
      sameAs: ['https://app.vithean.com', 'https://linktr.ee/Vithean'],
      description:
        'Vithean is a cloud-based online accounting and business management system for small and medium businesses in Cambodia. It covers invoicing with VAT, bills, journals, credit notes, payments, collections, bank reconciliation, items and warehouses, and financial reports such as Profit and Loss, in English and Khmer.',
      inLanguage: ['en', 'km'],
      areaServed: { '@type': 'Country', name: 'Cambodia' },
      countriesSupported: 'KH',
      featureList: [
        'Sales invoicing with VAT and customisable invoice templates',
        'Supplier bills and payments',
        'Customer collections and credit notes',
        'Double-entry journal entries',
        'Bank reconciliation and account transfers',
        'Customer and vendor master data',
        'Item, stock and multi-warehouse management with goods transfers',
        'Class and Job dimensions for segment and project reporting',
        'Profit and Loss and other financial reports',
        'Multi-currency bookkeeping including KHR with exchange rates',
        'Multi-user access with roles and permissions',
        'English and Khmer interface',
      ],
      offers: {
        '@type': 'AggregateOffer',
        url: 'https://vithean.com/en/pricing/',
        priceCurrency: 'USD',
        offerCount: 3,
        offers: [
          { '@type': 'Offer', name: 'Basic Package', category: 'subscription' },
          { '@type': 'Offer', name: 'Standard Package', category: 'subscription' },
          { '@type': 'Offer', name: 'Advanced Package', category: 'subscription' },
        ],
      },
      softwareHelp: { '@id': 'https://help.vithean.com/#manual' },
      publisher: { '@id': 'https://poscardigital.com/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://poscardigital.com/#organization',
      name: 'POSCAR Digital Co., Ltd.',
      url: 'https://poscardigital.com',
      address: { '@type': 'PostalAddress', addressCountry: 'KH' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@vithean.com',
          telephone: '+855-95-56-95-68',
          availableLanguage: ['English', 'Khmer'],
          areaServed: 'KH',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'sales@vithean.com',
          availableLanguage: ['English', 'Khmer'],
          areaServed: 'KH',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://help.vithean.com/#manual',
      name: 'Vithean User Manual',
      url: 'https://help.vithean.com',
      inLanguage: 'en',
      description:
        'Official user manual for Vithean, the cloud accounting system for businesses in Cambodia.',
      publisher: { '@id': 'https://poscardigital.com/#organization' },
      about: { '@id': 'https://vithean.com/#software' },
      license: 'https://help.vithean.com/about/',
    },
  ],
};

export default defineConfig({
  site: 'https://help.vithean.com',

  integrations: [
    starlight({
      title: 'Vithean',
      description:
        'Official user manual for Vithean — cloud-based online accounting and business management software for small and medium businesses in Cambodia. Invoicing, bills, inventory, bank reconciliation and reports, in English and Khmer.',
      logo: {
        light: './src/assets/logo.png',
        dark: './src/assets/logo.png',
        replacesTitle: true,
      },
      favicon: '/favicon.ico',
      head: [
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        },
        // Fonts: Inter for Latin, Kantumruy Pro for Khmer (unicode-range fallback)
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap',
          },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://help.vithean.com/og-image.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: 'Vithean User Manual' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: 'The official user manual for Vithean — guides, screenshots, and video tutorials for the cloud-based accounting platform.' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        // Machine-readable product facts for search and AI answer engines.
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify(structuredData),
        },
        // Explicit crawl/index permission (some AI crawlers read the meta tag,
        // not just robots.txt).
        {
          tag: 'meta',
          attrs: { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' },
        },
        {
          tag: 'link',
          attrs: { rel: 'alternate', type: 'text/plain', href: 'https://help.vithean.com/llms.txt', title: 'llms.txt' },
        },
      ],
      customCss: ['./src/styles/custom.css'],
      social: {
        facebook: 'https://facebook.com/vithean_official',
        telegram: 'https://t.me/vithean_support',
        email: 'mailto:contact@vithean.com',
      },
      editLink: {
        baseUrl: 'https://github.com/Vithean/vithean.github.io/edit/main/',
      },
      lastUpdated: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },

      components: {
        Footer: './src/components/Footer.astro',
      },

      sidebar: [
        {
          label: 'What is Vithean?',
          link: '/about/',
        },
        {
          label: 'Getting Started',
          items: [
            { label: 'Subscription', slug: 'get-started/subscription' },
            { label: 'How to sign up', slug: 'get-started/signup' },
            { label: 'Initial company setup', slug: 'get-started/initial-company-setup' },
          ],
        },
        {
          label: 'System Setup',
          items: [
            { label: 'Company Setting', slug: 'system-setup/company-setting' },
            { label: 'Advance Setting', slug: 'system-setup/advance-setting' },
            { label: 'User Administration', slug: 'system-setup/user-administration' },
            { label: 'Change Language', slug: 'system-setup/change-language' },
          ],
        },
        {
          label: 'Process Flow for Recording',
          items: [
            { label: 'Bill', slug: 'process-flow/bill' },
            { label: 'Invoice', slug: 'process-flow/invoice' },
            { label: 'Journal', slug: 'process-flow/journal' },
            { label: 'Credit Note', slug: 'process-flow/creditnote' },
            { label: 'Start Reconciliation', slug: 'process-flow/start-reconciliation' },
            { label: 'Transfer', slug: 'process-flow/transfer' },
            { label: 'Payment', slug: 'process-flow/payment' },
            { label: 'Collection', slug: 'process-flow/collection' },
          ],
        },
        {
          label: 'Vendors & Customers',
          items: [
            { label: 'Vendors', slug: 'data/vendors' },
            { label: 'Customers', slug: 'data/customers' },
          ],
        },
        {
          label: 'Reports',
          items: [
            { label: 'Profit and Loss Report', slug: 'reports/profit-and-loss' },
          ],
        },
        {
          label: 'Video Tutorials',
          link: '/tutorials/',
          badge: { text: 'New', variant: 'tip' },
        },
        {
          label: 'Troubleshooting',
          items: [{ label: 'FAQ', slug: 'troubleshoot/faq' }],
        },
        {
          label: 'Changelog',
          link: '/changelog/',
        },
        {
          label: 'Contact Us',
          link: '/contact/',
        },
      ],
    }),
    mdx(),
  ],
});
