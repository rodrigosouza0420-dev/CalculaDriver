const CHAVE_CONFIGURACAO = "calculadriver_configuracao";
const CHAVE_CORRIDAS = "calculadriver_corridas";

/* ================================
   CONFIGURAÇÕES
================================ */

function salvarConfiguracao(configuracao) {
    localStorage.setItem(
        CHAVE_CONFIGURACAO,
        JSON.stringify(configuracao)
    );
}

function carregarConfiguracao() {
    const dados = localStorage.getItem(CHAVE_CONFIGURACAO);

    if (!dados) {
        return {
            metaKm: 2.00,
            metaHora: 40.00,
            metaDiaria: 250.00,
            combustivel: "Gasolina",
            precoLitro: 6.20,
            consumo: 10.00,
            manutencaoKm: 0.30
        };
    }

    return JSON.parse(dados);
}

/* ================================
   CORRIDAS
================================ */

function salvarCorridas(corridas) {
    localStorage.setItem(
        CHAVE_CORRIDAS,
        JSON.stringify(corridas)
    );
}

function carregarCorridas() {
    const dados = localStorage.getItem(CHAVE_CORRIDAS);

    if (!dados) {
        return [];
    }

    return JSON.parse(dados);
}

function adicionarCorrida(corrida) {
    const corridas = carregarCorridas();

    corridas.push(corrida);

    salvarCorridas(corridas);
}

function atualizarCorrida(id, novosDados) {
    const corridas = carregarCorridas();

    const indice = corridas.findIndex(
        corrida => corrida.id === id
    );

    if (indice === -1) {
        return;
    }

    corridas[indice] = {
        ...corridas[indice],
        ...novosDados
    };

    salvarCorridas(corridas);
}

function removerCorrida(id) {
    const corridas = carregarCorridas();

    const novasCorridas = corridas.filter(
        corrida => corrida.id !== id
    );

    salvarCorridas(novasCorridas);
}
