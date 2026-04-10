// src/utils/calcularMedia.js

const PESOS = {
  P1: 0.4,
  P2: 0.4,
  ATIVIDADE: 0.2,
};

export function calcularMedia({ p1, p2, atividade, provaIntegrada, comPI }) {
  const notaAtividadeFinal = comPI
    ? (Number(atividade) + Number(provaIntegrada)) / 2
    : Number(atividade);

  const media =
    Number(p1) * PESOS.P1 +
    Number(p2) * PESOS.P2 +
    notaAtividadeFinal * PESOS.ATIVIDADE;

  const situacao = media >= 5 ? "✅ Aprovado" : "❌ Reprovado";

  return { media: media.toFixed(2), situacao };
}