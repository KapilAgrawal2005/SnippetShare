import { Variants } from "framer-motion";
export const animateY: Variants = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      type: "spring",
    },
  },
};
