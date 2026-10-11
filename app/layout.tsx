import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://brcpartner.brcstar.in'),
  alternates: {
    canonical: 'https://brcpartner.brcstar.in',
  },
  title: 'BRC STAR • Full-Stack Digital Technology Partner',
  description: 'Expert full-stack technology development partner for businesses. We design, architect, build, and scale modern web applications, mobile platforms, enterprise systems, and AI solutions.',
  keywords: [
    'BRC STAR',
    'Full-Stack Technology Partner',
    'Custom Web Application Development',
    'Enterprise Software Engineering',
    'Mobile App Development',
    'AI Solutions Architecture',
    'Next.js Development Partner',
    'Scalable Cloud Systems'
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
    description: 'Build digital products that move your business forward. Specialist engineering for web applications, mobile platforms, enterprise systems, and AI solutions.',
    type: 'website',
    siteName: 'BRC STAR',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRC STAR • Full-Stack Digital Technology Partner',
    description: 'Build digital products that move your business forward. Specialist engineering for web applications, mobile platforms, enterprise systems, and AI solutions.',
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

import { ThemeProvider } from '@/lib/theme-context';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
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
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#060911] dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
