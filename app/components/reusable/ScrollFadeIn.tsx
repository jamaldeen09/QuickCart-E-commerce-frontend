"use client"
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollFadeIn = ({ children }: {
  children: React.ReactNode
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [inView, animation]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animation}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn