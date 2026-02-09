"use client";

import {motion} from "framer-motion";

export default function AnimatedSection({children, className = ""}) {
  return (
    <motion.section
      className={className}
      initial={{opacity: 0, y: 16}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.45, ease: "easeOut"}}
    >
      {children}
    </motion.section>
  );
}