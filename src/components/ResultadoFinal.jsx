import { motion } from "framer-motion";

const anim = { opacity: 1, y: 0, scale: 1 };
const init = { opacity: 0, y: -12, scale: 0.96 };
const exit = { opacity: 0, y: 12, scale: 0.96 };

const ResultadoFinal = ({ resultado }) => (
  <motion.p
    key={resultado}
    id="resultado"
    role="status"
    aria-live="polite"
    initial={init}
    animate={anim}
    exit={exit}
    transition={{
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.8
    }}
  >
    {resultado}
  </motion.p>
);

export default ResultadoFinal;