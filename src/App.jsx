// src/App.jsx
import { useState } from "react";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import InputNota from "./components/InputNota";
import ResultadoFinal from "./components/ResultadoFinal";
import { calcularMedia } from "./utils/calcularMedia";

function App() {
  const [tipoCalculo, setTipoCalculo] = useState("semPI");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [atividade, setAtividade] = useState("");
  const [provaIntegrada, setProvaIntegrada] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    const camposBase = [p1, p2, atividade];
    const camposTodos =
      tipoCalculo === "comPI" ? [...camposBase, provaIntegrada] : camposBase;

    if (camposTodos.some((n) => n === "")) {
      setResultado(" Preencha todos os campos para calcular a média.");
      return;
    }

    if (camposTodos.some((n) => Number(n) < 0 || Number(n) > 10)) {
      setResultado(" As notas devem estar entre 0 e 10");
      return;
    }

    const { media, situacao } = calcularMedia({
      p1,
      p2,
      atividade,
      provaIntegrada,
      comPI: tipoCalculo === "comPI",
    });

    setResultado(`Média Final: ${media} — ${situacao}`);
  };

  return (
    <div
      className="calculadora-container"
      role="main"
      aria-label="Calculadora de Média Final"
    >
      <h1>
        Calcule sua <strong>Média Final</strong>
      </h1>

      {/* Tipo de cálculo */}
      <section className="select-container">
        <label htmlFor="tipoCalculo">Tipo de cálculo:</label>
        <select
          id="tipoCalculo"
          value={tipoCalculo}
          onChange={(e) => setTipoCalculo(e.target.value)}
          aria-label="Tipo de cálculo"
        >
          <option value="semPI">Sem Prova Integrada</option>
          <option value="comPI">Com Prova Integrada</option>
        </select>
      </section>

      {/* Notas P1 e P2 */}
      <section className="notas-row">
        <InputNota id="p1" label="P1" value={p1} onChange={(e) => setP1(e.target.value)} />
        <InputNota id="p2" label="P2" value={p2} onChange={(e) => setP2(e.target.value)} />
      </section>

      {/* Atividade */}
      <InputNota
        id="atividade"
        label="Atividade"
        value={atividade}
        onChange={(e) => setAtividade(e.target.value)}
      />

      {/* Prova Integrada com animação */}
      <AnimatePresence>
        {tipoCalculo === "comPI" && (
          <motion.section
            className="pi-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <InputNota
              id="provaIntegrada"
              label="Prova Integrada"
              value={provaIntegrada}
              onChange={(e) => setProvaIntegrada(e.target.value)}
            />
            <p className="info-text">
              Nota: Com Prova Integrada, a nota de atividade será composta por
              50% da atividade normal e 50% da prova integrada.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Botão de calcular */}
      <button type="button" onClick={handleCalcular}>
        Calcule a Média Final
      </button>

      {/* Resultado */}
      <AnimatePresence>
        {resultado && <ResultadoFinal resultado={resultado} />}
      </AnimatePresence>
    </div>
  );
}

export default App;