'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { onReveal } from '@/lib/reveal';

export function MainSiteFadeIn({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    return onReveal(() => setRevealed(true));
  }, []);

  return (
    <motion.main
      className="flex flex-col w-full"
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: revealed || reduce ? 1 : 0 }}
      transition={{ duration: 1.2, delay: reduce ? 0 : 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
