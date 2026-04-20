import { useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import InputNota from "./components/InputNota";
import ResultadoFinal from "./components/ResultadoFinal";
import { calcularMedia } from "./utils/calcularMedia";

const piAnim = { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.4 } };

function App() {
  const [tipoCalculo, setTipoCalculo] = useState("semPI");
  const [notas, setNotas] = useState({ p1: "", p2: "", atividade: "", provaIntegrada: "" });
  const [resultado, setResultado] = useState(null);

  const setNota = (campo) => (e) => setNotas(n => ({ ...n, [campo]: e.target.value }));

  const handleCalcular = () => {
    const campos = tipoCalculo === "comPI" ? Object.values(notas) : [notas.p1, notas.p2, notas.atividade];
    if (campos.some(n => n === "")) return setResultado("Preencha todos os campos para calcular a média.");
    if (campos.some(n => Number(n) < 0 || Number(n) > 10)) return setResultado("As notas devem estar entre 0 e 10.");

    const { media, situacao } = calcularMedia({ ...notas, comPI: tipoCalculo === "comPI" });
    setResultado(`Média Final: ${media} — ${situacao}`);
  };

  return (
    <div className="calculadora-container" role="main" aria-label="Calculadora de Média Final">
      <h1>Calcule sua <strong>Média Final</strong></h1>

      <section className="select-container">
        <label htmlFor="tipoCalculo">Tipo de cálculo:</label>
        <select id="tipoCalculo" value={tipoCalculo} onChange={(e) => setTipoCalculo(e.target.value)}>
          <option value="semPI">Sem Prova Integrada</option>
          <option value="comPI">Com Prova Integrada</option>
        </select>
      </section>

      <section className="notas-row">
        <InputNota id="p1" label="P1" value={notas.p1} onChange={setNota("p1")} />
        <InputNota id="p2" label="P2" value={notas.p2} onChange={setNota("p2")} />
      </section>

      <InputNota id="atividade" label="Atividade" value={notas.atividade} onChange={setNota("atividade")} />

      <AnimatePresence>
        {tipoCalculo === "comPI" && (
          <motion.section className="pi-container" {...piAnim}>
            <InputNota id="provaIntegrada" label="Prova Integrada" value={notas.provaIntegrada} onChange={setNota("provaIntegrada")} />
            <p className="info-text">Com Prova Integrada, a nota de atividade será 50% atividade + 50% prova integrada.</p>
          </motion.section>
        )}
      </AnimatePresence>

      <button type="button" onClick={handleCalcular}>Calcule a Média Final</button>

      <AnimatePresence>
        {resultado && <ResultadoFinal resultado={resultado} />}
      </AnimatePresence>
    </div>
  );
}

export default App;