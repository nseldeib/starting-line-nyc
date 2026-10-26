import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Starting Line: races around New York, and when to enter',
  description:
    'Road and trail races around New York City, with registration dates in Eastern Time and how many weeks you have to train.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
