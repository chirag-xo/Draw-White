'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface ProjectTransitionRef {
  start: (x: number, y: number, href: string) => void;
}

export const ProjectTransition = forwardRef<ProjectTransitionRef>((_, ref) => {
  const [transition, setTransition] = useState<{ x: number; y: number; href: string } | null>(null);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    start: (x, y, href) => {
      setTransition({ x, y, href });
      // Pre-fetch the route for faster navigation
      router.prefetch(href);
    },
  }));

  useEffect(() => {
    if (transition) {
      // Small timeout to allow animation to cover screen before navigation
      // or we can use onAnimationComplete on the motion.div
    }
  }, [transition]);

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          initial={{ clipPath: `circle(0% at ${transition.x}px ${transition.y}px)`, opacity: 1 }}
          animate={{ clipPath: `circle(150% at ${transition.x}px ${transition.y}px)` }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            // Once the circle has expanded, we navigate
            router.push(transition.href);
            // We keep the overlay for a split second or let the new page handle its own entry
            // but for now we'll just clear it after a short delay to allow the new page to load
            setTimeout(() => setTransition(null), 1500);
          }}
          transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#F2F2F2', // Match the global background color
            pointerEvents: 'auto',
          }}
        />
      )}
    </AnimatePresence>
  );
});

ProjectTransition.displayName = 'ProjectTransition';
