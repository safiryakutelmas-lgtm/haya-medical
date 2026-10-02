'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-emerald-500 to-slate-900 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}