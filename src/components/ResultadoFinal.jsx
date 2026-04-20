import { motion } from "framer-motion";

const anim = { opacity: 1, y: 0 };
const init = { opacity: 0, y: -10 };

const ResultadoFinal = ({ resultado }) => (
  <motion.p id="resultado" role="status" aria-live="polite" initial={init} animate={anim} exit={init} transition={{ duration: 0.3 }}>
    {resultado}
  </motion.p>
);

export default ResultadoFinal;