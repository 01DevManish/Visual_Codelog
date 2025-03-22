import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const arrayElementVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  highlighted: { scale: 1.2, backgroundColor: "#FFD700", transition: { duration: 0.3 } },
  searched: { scale: 1.2, backgroundColor: "#00FF00", transition: { duration: 0.3 } },
  sorted: { backgroundColor: "#87CEEB", transition: { duration: 0.3 } },
  inserted: { scale: 1.2, backgroundColor: "#32CD32", transition: { duration: 0.3 } },
  deleted: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  updated: { scale: 1.2, backgroundColor: "#FF69B4", transition: { duration: 0.3 } },
  rotated: { rotate: 360, backgroundColor: "#FFA500", transition: { duration: 0.7 } },
  merged: { backgroundColor: "#FF6347", transition: { duration: 0.5 } },
  split: { x: 20, backgroundColor: "#DC143C", transition: { duration: 0.5 } },
};