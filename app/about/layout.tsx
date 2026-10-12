import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us • Engineering Leadership & Company Story',
  description:
    'Learn about BRC STAR OPC PRIVATE LIMITED, our founder story, software engineering ethos, registered headquarters in Ahmedabad, and full-stack development values.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
