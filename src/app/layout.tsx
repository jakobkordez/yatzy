import Header from '@/components/header';
import './globals.scss';
import { Inter } from 'next/font/google';
import { Modal } from '@/components/modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yatzy Scorecard',
  description: 'A fully customizable Yatzy scorecard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <Header />

        <div className="flex-1 bg-sky-100 py-10">
          <main className="mx-auto max-w-3xl">{children}</main>
        </div>

        <Modal />
      </body>
    </html>
  );
}
