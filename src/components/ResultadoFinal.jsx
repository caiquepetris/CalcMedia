// src/components/ResultadoFinal.jsx
import { motion } from "framer-motion";

function ResultadoFinal({ resultado }) {
  return (
    <motion.p
      id="resultado"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {resultado}
    </motion.p>
  );
}

export default ResultadoFinal;