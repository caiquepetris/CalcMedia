// Constantes para pesos e limites
const PESOS = {
    P1: 0.4,
    P2: 0.4,
    ATIVIDADE: 0.2
};

const NOTA_MAXIMA = 10;
const LIMIAR_ARREDONDAMENTO = 0.75;

/**
 * Arredonda a nota para cima se a parte decimal for >= 0.75
 * @param {number} nota - A nota a ser arredondada
 * @return {number} A nota arredondada
 */
function arredondarNota(nota) {
    return (nota % 1 >= LIMIAR_ARREDONDAMENTO) ? Math.ceil(nota) : nota;
}

/**
 * Limita o valor de uma nota ao máximo permitido
 * @param {number} nota - A nota a ser limitada
 * @param {HTMLElement} inputElement - O elemento de input para atualizar (opcional)
 * @return {number} A nota limitada
 */
function limitarNota(nota, inputElement = null) {
    if (nota > NOTA_MAXIMA) {
        nota = NOTA_MAXIMA;
        if (inputElement) {
            inputElement.value = NOTA_MAXIMA;
        }
    }
    return nota;
}

/**
 * Obtém o valor numérico de um input
 * @param {string} id - O ID do elemento input
 * @return {number|null} O valor numérico ou null se inválido
 */
function obterValorInput(id) {
    const valor = parseFloat(document.getElementById(id).value);
    return isNaN(valor) ? null : valor;
}

/**
 * Exibe uma mensagem no elemento de resultado
 * @param {string} mensagem - A mensagem a ser exibida
 */
function exibirResultado(mensagem) {
    document.getElementById('resultado').innerText = mensagem;
}

/**
 * Mostra ou esconde o campo de prova integrada com base na seleção
 */
function toggleProvaIntegrada() {
    const tipoCalculo = document.getElementById('tipoCalculo').value;
    const provaIntegradaContainer = document.getElementById('provaIntegradaContainer');
    
    provaIntegradaContainer.style.display = tipoCalculo === 'comPI' ? 'block' : 'none';
}

/**
 * Calcula a nota final de atividade com base no tipo de cálculo
 * @param {number} atividade - A nota de atividade
 * @param {string} tipoCalculo - O tipo de cálculo selecionado
 * @return {number|null} A nota final de atividade ou null se dados inválidos
 */
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
        
        // 50% da atividade normal e 50% da prova integrada
        return (atividade * 0.5) + (provaIntegradaLimitada * 0.5);
    }
    
    // Sem prova integrada, retorna a própria atividade
    return atividade;
}

/**
 * Calcula a média final com base nas notas informadas
 */
function calcularMedia() {
    // Obter valores dos inputs
    const p1 = obterValorInput('p1');
    const p2 = obterValorInput('p2');
    const atividade = obterValorInput('atividade');
    
    // Verificar se todos os valores obrigatórios são válidos
    if (p1 === null || p2 === null || atividade === null) {
        exibirResultado('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Arredondar P1 e P2
    const p1Arredondado = arredondarNota(p1);
    const p2Arredondado = arredondarNota(p2);
    
    // Limitar a nota de atividade
    const atividadeLimitada = limitarNota(
        atividade, 
        document.getElementById('atividade')
    );
    
    // Calcular nota de atividade final com base no tipo de cálculo
    const tipoCalculo = document.getElementById('tipoCalculo').value;
    const notaAtividadeFinal = calcularNotaAtividade(atividadeLimitada, tipoCalculo);
    
    // Se a nota de atividade for null, houve um erro que já foi exibido
    if (notaAtividadeFinal === null) {
        return;
    }
    
    // Calcular média final
    let media = (p1Arredondado * PESOS.P1) + 
                (p2Arredondado * PESOS.P2) + 
                (notaAtividadeFinal * PESOS.ATIVIDADE);
    
    // Limitar a média ao valor máximo
    media = Math.min(media, NOTA_MAXIMA);
    
    // Exibir o resultado
    exibirResultado(`Média Final: ${media.toFixed(2)}`);
}

// Inicializar a interface quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    toggleProvaIntegrada();
});
