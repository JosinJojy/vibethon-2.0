'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MicroSlats = dynamic(() => import('@/components/effects/MicroSlats'), {
  ssr: false,
});

export function SiteAtmosphere() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="site-atmosphere" aria-hidden="true">
      {enabled && (
        <MicroSlats
          preset="swell"
          color="#c33748"
          glintColor="#ffaaa0"
          backgroundColor="transparent"
          slatWidth={4}
          slatHeight={18}
          gap={18}
          roundness={0}
          scale={1.9}
          speed={0.26}
          perspective={0.34}
          fog={0.3}
          glint={0.72}
          interactive
          cursorStrength={0.7}
          cursorSize={70}
          trail={1}
          intro={false}
        />
      )}
    </div>
  );
}
