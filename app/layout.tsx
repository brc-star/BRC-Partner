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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#060911] text-slate-100 antialiased selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
