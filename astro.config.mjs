// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vithean.github.io',

  integrations: [
    starlight({
      title: 'Vithean',
      description: 'Official user manual for Vithean — smart, cloud-based accounting for small and medium businesses.',
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
          attrs: { property: 'og:image', content: 'https://vithean.github.io/og-image.png' },
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
