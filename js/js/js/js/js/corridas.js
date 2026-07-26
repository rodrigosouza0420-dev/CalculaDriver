/* ==========================================
   CORRIDAS
========================================== */


/*
    ==========================================
    ACEITAR CORRIDA
    ==========================================
*/

function aceitarCorrida() {

    if (!corridaAtual) {

        alert(
            "Primeiro analise uma corrida."
        );

        return;
    }


    /*
        Estado inicial:
        ACEITA
    */

    corridaAtual.status = "Aceita";


    /*
        Salva a corrida
    */

    adicionarCorrida(
        corridaAtual
    );


    alert(
        "Corrida aceita e registrada!"
    );


    /*
        Atualiza tudo
    */

    atualizarDashboard();

    mostrarCorridas();


    /*
        Esconde resultado
    */

    document
        .getElementById("resultado")
        .classList.add("hidden");


    limparFormularioCorrida();


    /*
        Limpa corrida temporária
    */

    corridaAtual = null;
}


/*
    ==========================================
    INICIAR CORRIDA
    ==========================================
*/

function iniciarCorrida(id) {

    atualizarCorrida(
        id,
        {
            status: "Em andamento",
            inicio: new Date().toISOString()
        }
    );


    mostrarCorridas();

    atualizarDashboard();
}


/*
    ==========================================
    FINALIZAR CORRIDA
    ==========================================
*/

function finalizarCorrida(id) {

    atualizarCorrida(
        id,
        {
            status: "Finalizada",
            finalizadaEm: new Date().toISOString()
        }
    );


    alert(
        "Corrida finalizada com sucesso!"
    );


    mostrarCorridas();

    atualizarDashboard();
}


/*
    ==========================================
    CANCELAR CORRIDA
    ==========================================
*/

function cancelarCorrida(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja cancelar esta corrida?"
        );


    if (!confirmar) {
        return;
    }


    atualizarCorrida(
        id,
        {
            status: "Cancelada",
            canceladaEm: new Date().toISOString()
        }
    );


    mostrarCorridas();

    atualizarDashboard();
}


/*
    ==========================================
    IGNORAR ANÁLISE
    ==========================================
*/

function ignorarCorrida() {

    corridaAtual = null;


    document
        .getElementById("resultado")
        .classList.add("hidden");


    limparFormularioCorrida();
}


/*
    ==========================================
    LIMPAR FORMULÁRIO
    ==========================================
*/

function limparFormularioCorrida() {

    document.getElementById("valor").value = "";

    document.getElementById("distancia").value = "";

    document.getElementById("tempo").value = "";
}


/*
    ==========================================
    MOSTRAR CORRIDAS
    ==========================================
*/

function mostrarCorridas() {

    const lista =
        document.getElementById(
            "listaCorridas"
        );


    const corridas =
        carregarCorridas();


    /*
        Nenhuma corrida
    */

    if (corridas.length === 0) {

        lista.innerHTML = `

            <div class="vazia">

                <h3>
                    Nenhuma corrida registrada
                </h3>

                <p>
                    Quando você aceitar uma corrida,
                    ela aparecerá aqui.
                </p>

            </div>

        `;

        return;
    }


    /*
        Data atual
    */

    const hoje =
        obterDataAtual();


    /*
        Somente corridas de hoje
    */

    const corridasHoje =
        corridas.filter(
            corrida => {

                if (!corrida.data) {
                    return false;
                }


                const dataCorrida =
                    new Date(
                        corrida.data
                    );


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


                return (
                    dataFormatada === hoje
                );

            }
        );


    /*
        Nenhuma corrida hoje
    */

    if (corridasHoje.length === 0) {

        lista.innerHTML = `

            <div class="vazia">

                <h3>
                    Nenhuma corrida hoje
                </h3>

                <p>
                    As corridas dos dias anteriores
                    continuam salvas.
                </p>

            </div>

        `;

        return;
    }


    /*
        Desenha as corridas
    */

    lista.innerHTML =
        corridasHoje
            .slice()
            .reverse()
            .map(
                corrida =>
                    criarCardCorrida(corrida)
            )
            .join("");
}


/*
    ==========================================
    CRIAR CARD
    ==========================================
*/

function criarCardCorrida(corrida) {

    const horario =
        new Date(
            corrida.data
        ).toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    /*
        Define texto do status
    */

    let statusTexto = "";

    let statusClasse = "";


    if (
        corrida.status === "Aceita"
    ) {

        statusTexto =
            "🟡 Aceita";

        statusClasse =
            "status-aceita";

    }


    else if (
        corrida.status === "Em andamento"
    ) {

        statusTexto =
            "🔵 Em andamento";

        statusClasse =
            "status-andamento";

    }


    else if (
        corrida.status === "Finalizada"
    ) {

        statusTexto =
            "🟢 Finalizada";

        statusClasse =
            "status-finalizada";

    }


    else if (
        corrida.status === "Cancelada"
    ) {

        statusTexto =
            "🔴 Cancelada";

        statusClasse =
            "status-cancelada";

    }


    /*
        Botões
    */

    let botoes = "";


    /*
        Corrida aceita
    */

    if (
        corrida.status === "Aceita"
    ) {

        botoes = `

            <button
                class="corrida-btn iniciar"
                onclick="iniciarCorrida(${corrida.id})"
            >
                ▶️ INICIAR CORRIDA
            </button>


            <button
                class="corrida-btn cancelar"
                onclick="cancelarCorrida(${corrida.id})"
            >
                ❌ CANCELAR
            </button>

        `;

    }


    /*
        Corrida em andamento
    */

    else if (
        corrida.status === "Em andamento"
    ) {

        botoes = `

            <button
                class="corrida-btn finalizar"
                onclick="finalizarCorrida(${corrida.id})"
            >
                🏁 FINALIZAR CORRIDA
            </button>


            <button
                class="corrida-btn cancelar"
                onclick="cancelarCorrida(${corrida.id})"
            >
                ❌ CANCELAR
            </button>

        `;

    }


    return `

        <div class="corrida-card">

            <div class="corrida-topo">

                <div class="corrida-app">

                    ${corrida.aplicativo}
                    • ${horario}

                </div>


                <div
                    class="corrida-status ${statusClasse}"
                >

                    ${statusTexto}

                </div>

            </div>


            <div class="corrida-info">

                <div>

                    <small>
                        Valor
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.valor
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        Distância
                    </small>

                    <strong>
                        ${Number(
                            corrida.distancia
                        ).toFixed(1)} km
                    </strong>

                </div>


                <div>

                    <small>
                        R$/KM
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.porKm
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        R$/hora
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.porHora
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        Combustível
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.combustivel
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        Manutenção
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.manutencao
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        Custo
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.custoTotal
                        )}
                    </strong>

                </div>


                <div>

                    <small>
                        Lucro
                    </small>

                    <strong>
                        ${dinheiro(
                            corrida.lucro
                        )}
                    </strong>

                </div>

            </div>


            <div class="corrida-acoes">

                ${botoes}

            </div>

        </div>

    `;
}
