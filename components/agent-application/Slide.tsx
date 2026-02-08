import { motion } from "framer-motion";

export default function Slide({ children }) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {children}
    </motion.div>
  );
}
