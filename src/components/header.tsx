'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 p-4 text-xl font-medium text-white">
      <nav className="flex">
        <Link className="mr-auto" href="/">
          <h1>Yatzy</h1>
        </Link>
      </nav>
    </header>
  );
}
