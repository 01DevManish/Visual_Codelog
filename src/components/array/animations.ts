// animations.ts
import { Variants } from "framer-motion";

export const arrayElementVariants: Variants = {
  initial: { y: 0, scale: 1, opacity: 1, backgroundColor: "#93c5fd" },
  highlighted: {
    y: -15,
    scale: 1.1,
    backgroundColor: "#facc15",
    transition: { duration: 0.3 },
  },
  inserted: {
    y: [50, 0],
    opacity: [0, 1],
    scale: [0.8, 1],
    backgroundColor: "#3b82f6",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  deleted: {
    y: 50,
    opacity: 0,
    scale: 0.8,
    backgroundColor: "#ef4444",
    transition: { duration: 0.5, ease: "easeIn" },
  },
  updated: {
    scale: [1, 1.2, 1],
    backgroundColor: "#8b5cf6",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  sorted: {
    backgroundColor: "#22c55e",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  searched: {
    y: [-15, 0],
    scale: [1.1, 1],
    backgroundColor: "#10b981",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  rotated: {
    rotate: 360,
    backgroundColor: "#f97316",
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  merged: {
    opacity: [0, 1],
    scale: [0.9, 1],
    backgroundColor: "#d946ef",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  split: {
    opacity: [1, 0],
    scale: [1, 0.9],
    backgroundColor: "#f43f5e",
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export const containerVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};