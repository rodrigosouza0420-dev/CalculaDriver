function mostrarTela(nome) {

    const telas =
        document.querySelectorAll(".tela");


    telas.forEach(
        tela =>
            tela.classList.add("hidden")
    );


    const telaSelecionada =
        document.getElementById(
            "tela-" + nome
        );


    if (telaSelecionada) {

        telaSelecionada
            .classList.remove("hidden");

    }


    const botoes =
        document.querySelectorAll(".menu-btn");


    botoes.forEach(
        botao =>
            botao.classList.remove("active")
    );


    const botoesMenu =
        document.querySelectorAll(
            ".menu-btn"
        );


    const indice = {

        inicio: 0,
        analisar: 1,
        corridas: 2,
        configuracao: 3

    };


    if (
        botoesMenu[indice[nome]]
    ) {

        botoesMenu[indice[nome]]
            .classList.add("active");

    }


    if (nome === "corridas") {

        mostrarCorridas();

    }

}


/*
    ==========================================
    ATUALIZAR DASHBOARD
    ==========================================
*/

function atualizarDashboard() {

    const corridas =
        carregarCorridas();


    const hoje =
        obterDataAtual();


    /*
        ==========================================
        CORRIDAS DE HOJE
        ==========================================
    */

    const corridasHoje =
        corridas.filter(corrida => {

            if (!corrida.data) {
                return false;
            }


            const dataCorrida =
                new Date(corrida.data);


            const ano =
                dataCorrida.getFullYear();


            const mes =
                String(
                    dataCorrida.getMonth() + 1
                ).padStart(2, "0");


            const dia =
                String(
                    dataCorrida.getDate()
                ).padStart(2, "0");


            const dataFormatada =
                `${ano}-${mes}-${dia}`;


            return dataFormatada === hoje;

        });


    /*
        ==========================================
        STATUS DAS CORRIDAS
        ==========================================
    */

    const corridasFinalizadas =
        corridasHoje.filter(
            corrida =>
                corrida.status === "Finalizada"
        );


    const corridasAceitas =
        corridasHoje.filter(
            corrida =>
                corrida.status === "Aceita"
        );


    const corridasAndamento =
        corridasHoje.filter(
            corrida =>
                corrida.status === "Em andamento"
        );


    const corridasCanceladas =
        corridasHoje.filter(
            corrida =>
                corrida.status === "Cancelada"
        );


    /*
        ==========================================
        FATURAMENTO
        ==========================================
    */

    const faturamento =
        corridasFinalizadas.reduce(
            (total, corrida) =>
                total +
                Number(corrida.valor),
            0
        );


    /*
        ==========================================
        KM TOTAL
        ==========================================
    */

    const km =
        corridasFinalizadas.reduce(
            (total, corrida) =>
                total +
                Number(corrida.distancia),
            0
        );


    /*
        ==========================================
        LUCRO
        ==========================================
    */

    const lucro =
        corridasFinalizadas.reduce(
            (total, corrida) =>
                total +
                Number(corrida.lucro),
            0
        );


    /*
        ==========================================
        R$ POR KM
        ==========================================
    */

    const valorPorKm =
        km > 0
            ? faturamento / km
            : 0;


    /*
        ==========================================
        TEMPO TOTAL
        ==========================================
    */

    let minutosTotal = 0;


    corridasFinalizadas.forEach(
        corrida => {

            minutosTotal +=
                Number(corrida.tempo) || 0;

        }
    );


    const horasTotal =
        minutosTotal / 60;


    /*
        ==========================================
        R$ POR HORA
        ==========================================
    */

    const valorPorHora =
        horasTotal > 0
            ? faturamento / horasTotal
            : 0;


    /*
        ==========================================
        PAINEL PRINCIPAL
        ==========================================
    */

    const elementoFaturamento =
        document.getElementById(
            "faturamento"
        );


    if (elementoFaturamento) {

        elementoFaturamento.textContent =
            dinheiro(faturamento);

    }


    const elementoCorridas =
        document.getElementById(
            "corridas"
        );


    if (elementoCorridas) {

        elementoCorridas.textContent =
            corridasFinalizadas.length;

    }


    const elementoKm =
        document.getElementById(
            "kmTotal"
        );


    if (elementoKm) {

        elementoKm.textContent =
            km.toFixed(1) + " km";

    }


    const elementoLucro =
        document.getElementById(
            "lucroTotal"
        );


    if (elementoLucro) {

        elementoLucro.textContent =
            dinheiro(lucro);

    }


    /*
        ==========================================
        R$ POR KM
        ==========================================
    */

    const elementoPorKm =
        document.getElementById(
            "porKmTotal"
        );


    if (elementoPorKm) {

        elementoPorKm.textContent =
            dinheiro(valorPorKm);

    }


    /*
        ==========================================
        R$ POR HORA
        ==========================================
    */

    const elementoPorHora =
        document.getElementById(
            "porHoraTotal"
        );


    if (elementoPorHora) {

        elementoPorHora.textContent =
            dinheiro(valorPorHora);

    }


    /*
        ==========================================
        CONTADORES DE STATUS
        ==========================================
    */

    const elementoFinalizadas =
        document.getElementById(
            "finalizadas"
        );


    if (elementoFinalizadas) {

        elementoFinalizadas.textContent =
            corridasFinalizadas.length;

    }


    const elementoAceitas =
        document.getElementById(
            "aceitas"
        );


    if (elementoAceitas) {

        elementoAceitas.textContent =
            corridasAceitas.length;

    }


    const elementoAndamento =
        document.getElementById(
            "emAndamento"
        );


    if (elementoAndamento) {

        elementoAndamento.textContent =
            corridasAndamento.length;

    }


    const elementoCanceladas =
        document.getElementById(
            "canceladas"
        );


    if (elementoCanceladas) {

        elementoCanceladas.textContent =
            corridasCanceladas.length;

    }


    /*
        ==========================================
        META DIÁRIA
        ==========================================
    */

    const config =
        carregarConfiguracao();


    const elementoMeta =
        document.getElementById(
            "metaValor"
        );


    if (elementoMeta) {

        elementoMeta.textContent =
            dinheiro(
                config.metaDiaria
            );

    }


    /*
        Evita divisão por zero
    */

    const percentual =
        config.metaDiaria > 0
            ? Math.min(
                (
                    faturamento /
                    config.metaDiaria
                ) * 100,
                100
            )
            : 0;


    const elementoProgressBar =
        document.getElementById(
            "progressBar"
        );


    if (elementoProgressBar) {

        elementoProgressBar.style.width =
            percentual + "%";

    }


    const elementoProgressText =
        document.getElementById(
            "progressText"
        );


    if (elementoProgressText) {

        elementoProgressText.textContent =
            dinheiro(faturamento) +
            " de " +
            dinheiro(
                config.metaDiaria
            );

    }

}


/*
    ==========================================
    MOSTRAR DATA
    ==========================================
*/

function mostrarData() {

    const agora =
        new Date();


    const texto =
        agora.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    const elemento =
        document.getElementById(
            "dataAtual"
        );


    if (elemento) {

        elemento.textContent =
            texto;

    }

}


/*
    ==========================================
    OBTER DATA ATUAL
    ==========================================
*/

function obterDataAtual() {

    const agora =
        new Date();


    const ano =
        agora.getFullYear();


    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");


    return `${ano}-${mes}-${dia}`;

}


/*
    ==========================================
    INICIAR APLICAÇÃO
    ==========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        preencherFormularioConfiguracao();

        mostrarData();

        atualizarDashboard();

        mostrarCorridas();

    }
);
