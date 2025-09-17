
const PESOS = {
    P1: 0.4,
    P2: 0.4,
    ATIVIDADE: 0.2
};

const NOTA_MAXIMA = 10;
const LIMIAR_ARREDONDAMENTO = 0.75;

function arredondarNota(nota) {
    return (nota % 1 >= LIMIAR_ARREDONDAMENTO) ? Math.ceil(nota) : nota;
}

function limitarNota(nota, inputElement = null) {
    if (nota > NOTA_MAXIMA) {
        nota = NOTA_MAXIMA;
        if (inputElement) {
            inputElement.value = NOTA_MAXIMA;
        }
    }
    return nota;
}

function obterValorInput(id) {
    const valor = parseFloat(document.getElementById(id).value);
    return isNaN(valor) ? null : valor;
}

function exibirResultado(mensagem) {
    document.getElementById('resultado').innerText = mensagem;
}


function toggleProvaIntegrada() {
    const tipoCalculo = document.getElementById('tipoCalculo').value;
    const provaIntegradaContainer = document.getElementById('provaIntegradaContainer');

    provaIntegradaContainer.style.display = tipoCalculo === 'comPI' ? 'block' : 'none';
}


function calcularNotaAtividade(atividade, tipoCalculo) {
    if (tipoCalculo === 'comPI') {
        const provaIntegrada = obterValorInput('provaIntegrada');

        if (provaIntegrada === null) {
            exibirResultado('Por favor, preencha a nota da Prova Integrada.');
            return null;
        }

        const provaIntegradaLimitada = limitarNota(
            provaIntegrada,
            document.getElementById('provaIntegrada')
        );


        return (atividade * 0.5) + (provaIntegradaLimitada * 0.5);
    }

    return atividade;
}


function calcularMedia() {

    const p1 = obterValorInput('p1');
    const p2 = obterValorInput('p2');
    const atividade = obterValorInput('atividade');


    if (p1 === null || p2 === null || atividade === null) {
        exibirResultado('Por favor, preencha todos os campos obrigatórios.');
        return;
    }


    const p1Arredondado = arredondarNota(p1);
    const p2Arredondado = arredondarNota(p2);


    const atividadeLimitada = limitarNota(
        atividade,
        document.getElementById('atividade')
    );


    const tipoCalculo = document.getElementById('tipoCalculo').value;
    const notaAtividadeFinal = calcularNotaAtividade(atividadeLimitada, tipoCalculo);


    if (notaAtividadeFinal === null) {
        return;
    }


    let media = (p1Arredondado * PESOS.P1) +
        (p2Arredondado * PESOS.P2) +
        (notaAtividadeFinal * PESOS.ATIVIDADE);


    exibirResultado(`Média Final: ${media.toFixed(2)}`);
}
document.getElementById("provaIntegradaContainer").classList.add("hidden");

document.addEventListener('DOMContentLoaded', () => {
    toggleProvaIntegrada();
});
