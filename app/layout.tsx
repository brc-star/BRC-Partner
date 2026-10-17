import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE } from '@/lib/site-config';
import { ThemeProvider } from '@/lib/theme-context';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NavratriPromoModal } from '@/components/NavratriPromoModal';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'BRC STAR • Full-Stack Digital Technology Partner',
    template: '%s | BRC STAR',
  },
  description:
    'Custom websites, web apps, mobile apps and AI solutions for Indian businesses. Transparent pricing, 100% code ownership.',
  keywords: [
    'BRC STAR',
    'Full-Stack Technology Partner',
    'Custom Web Application Development',
    'Enterprise Software Engineering',
    'Mobile App Development',
    'AI Solutions Architecture',
    'Next.js Development Partner',
    'Scalable Cloud Systems',
  ],
  authors: [{ name: 'BRC STAR Engineering Team' }],
  creator: 'BRC STAR',
  publisher: 'BRC STAR',
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    title: 'BRC STAR • Full-Stack Digital Technology Partner',
    description:
      'Custom websites, web apps, mobile apps and AI solutions for Indian businesses. Transparent pricing, 100% code ownership.',
    type: 'website',
    siteName: 'BRC STAR',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRC STAR • Full-Stack Digital Technology Partner',
    description:
      'Custom websites, web apps, mobile apps and AI solutions for Indian businesses. Transparent pricing, 100% code ownership.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.postalCode,
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('brc_theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <WhatsAppButton />
          <NavratriPromoModal />
        </ThemeProvider>

        {/* HubSpot CRM Tracking Code */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/247702711.js"
        />
      </body>
    </html>
  );
}
