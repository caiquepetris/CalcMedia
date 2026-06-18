import { useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import InputNota from "./components/InputNota";
import ResultadoFinal from "./components/ResultadoFinal";
import { calcularMedia } from "./utils/calcularMedia";

const piAnim = { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.4 },};

function App() {
  const [tipoCalculo, setTipoCalculo] = useState("semPI");
  const [notas, setNotas] = useState({
    p1: "",
    p2: "",
    atividade: "",
    provaIntegrada: "",
    ProvaFinal: "",
    MediaFinal: "",
  });
  const [resultado, setResultado] = useState(null);

  const setNota = (campo) => (e) =>
    setNotas((n) => ({ ...n, [campo]: e.target.value }));

  const handleCalcular = () => {
    let campos = [];

    // Valida APENAS os campos relevantes para cada tipo
    if (tipoCalculo === "comPI") {
      campos = [
        notas.p1,
        notas.p2,
        notas.atividade,
        notas.provaIntegrada,
      ];
    } else if (tipoCalculo === "PF") {
      campos = [notas.MediaFinal, notas.ProvaFinal];
    } else {
      // "semPI"
      campos = [notas.p1, notas.p2, notas.atividade];
    }

    // Valida campos vazios
    if (campos.some((n) => n === "")) {
      return setResultado(
        "Preencha todos os campos para calcular a média."
      );
    }

    // Valida intervalo 0-10
    if (campos.some((n) => Number(n) < 0 || Number(n) > 10)) {
      return setResultado("As notas devem estar entre 0 e 10.");
    }

    // Calcula a média
    const { media, situacao } = calcularMedia({
      ...notas,
      comPI: tipoCalculo === "comPI",
      tipoPF: tipoCalculo === "PF",
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

      <section className="select-container">
        <label htmlFor="tipoCalculo">Tipo de cálculo:</label>
        <select
          id="tipoCalculo"
          value={tipoCalculo}
          onChange={(e) => setTipoCalculo(e.target.value)}
        >
          <option value="semPI">Sem Prova Integrada</option>
          <option value="comPI">Com Prova Integrada</option>
          <option value="PF">Prova Final</option>
        </select>
      </section>

      {/* Campos para semPI e comPI */}
      {(tipoCalculo === "comPI" || tipoCalculo === "semPI") && (
        <section className="notas-row">
          <InputNota
            id="p1"
            label="P1"
            value={notas.p1}
            onChange={setNota("p1")}
          />
          <InputNota
            id="p2"
            label="P2"
            value={notas.p2}
            onChange={setNota("p2")}
          />
          <InputNota
            id="atividade"
            label="Atividade"
            value={notas.atividade}
            onChange={setNota("atividade")}
          />
        </section>
      )}

      {/* Campos específicos para comPI */}
      <AnimatePresence>
        {tipoCalculo === "comPI" && (
          <motion.section className="pi-container" {...piAnim}>
            <InputNota
              id="provaIntegrada"
              label="Prova Integrada"
              value={notas.provaIntegrada}
              onChange={setNota("provaIntegrada")}
            />
            <p className="info-text">
              Com Prova Integrada, a nota de atividade será 50% atividade + 50%
              prova integrada.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Campos para PF */}
      {tipoCalculo === "PF" && (
        <section className="pf-container">
          <InputNota
            id="MediaFinal"
            label="Média Final"
            value={notas.MediaFinal}
            onChange={setNota("MediaFinal")}
          />
          <InputNota
            id="ProvaFinal"
            label="Prova Final"
            value={notas.ProvaFinal}
            onChange={setNota("ProvaFinal")}
          />
        </section>
      )}

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