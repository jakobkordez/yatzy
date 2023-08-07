'use client';

import { YatzyGameApp } from '@/app/app';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  return isHydrated ? <YatzyGameApp /> : null;
}
