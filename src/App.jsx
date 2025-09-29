import { useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [tipoCalculo, setTipoCalculo] = useState("semPI");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [atividade, setAtividade] = useState("");
  const [provaIntegrada, setProvaIntegrada] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularMedia = () => {
    const PESOS = {
      P1: 0.4,
      P2: 0.4,
      ATIVIDADE: 0.2,
    };

    let notaAtividadeFinal = Number(atividade);

    if (tipoCalculo === "comPI") {
      notaAtividadeFinal = (Number(atividade) + Number(provaIntegrada)) / 2;
    }

    if (isNaN(notaAtividadeFinal)) {
      setResultado("Preencha todas as notas corretamente!");
      return;
    }

    const media =
      Number(p1) * PESOS.P1 +
      Number(p2) * PESOS.P2 +
      notaAtividadeFinal * PESOS.ATIVIDADE;

    setResultado(`Média Final: ${media.toFixed(2)}`);
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
        <div className="input-group">
          <label htmlFor="p1">P1:</label>
          <input
            type="number"
            id="p1"
            step="0.1"
            min="0"
            max="10"
            required
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            placeholder="Nota da P1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="p2">P2:</label>
          <input
            type="number"
            id="p2"
            step="0.1"
            min="0"
            max="10"
            required
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            placeholder="Nota da P2"
          />
        </div>
      </section>

      {/* Atividade */}
      <div className="input-group">
        <label htmlFor="atividade">Atividade:</label>
        <input
          type="number"
          id="atividade"
          step="0.1"
          min="0"
          max="10"
          required
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Nota da Atividade"
        />
      </div>

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
            <div className="input-group">
              <label htmlFor="provaIntegrada">Prova Integrada:</label>
              <input
                type="number"
                id="provaIntegrada"
                step="0.1"
                min="0"
                max="10"
                value={provaIntegrada}
                onChange={(e) => setProvaIntegrada(e.target.value)}
                placeholder="Nota da Prova Integrada"
              />
            </div>
            <p className="info-text">
              Nota: Com Prova Integrada, a nota de atividade será composta por
              50% da atividade normal e 50% da prova integrada.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Botão de calcular */}
      <button type="button" onClick={calcularMedia}>
        Calcule a Média Final
      </button>

      {/* Resultado */}
      <AnimatePresence>
        {resultado && (
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
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
