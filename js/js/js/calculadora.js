let corridaAtual = null;


function dinheiro(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


function calcularCorrida() {

    const aplicativo =
        document.getElementById("aplicativo").value;

    const valor =
        Number(document.getElementById("valor").value);

    const distancia =
        Number(document.getElementById("distancia").value);

    const tempo =
        Number(document.getElementById("tempo").value);


    const config =
        carregarConfiguracao();


    if (
        valor <= 0 ||
        distancia <= 0 ||
        tempo <= 0
    ) {

        alert(
            "Preencha valor, distância e tempo corretamente."
        );

        return;
    }


    /*
        ==============================
        CÁLCULOS
        ==============================
    */


    // Ganho por KM

    const porKm =
        valor / distancia;


    // Ganho por hora

    const horas =
        tempo / 60;

    const porHora =
        valor / horas;


    // Combustível

    const litros =
        distancia / config.consumo;

    const custoCombustivel =
        litros * config.precoLitro;


    // Manutenção

    const custoManutencao =
        distancia * config.manutencaoKm;


    // Custo total

    const custoTotal =
        custoCombustivel +
        custoManutencao;


    // Lucro

    const lucro =
        valor - custoTotal;


    /*
        ==============================
        COMPARAÇÃO COM META
        ==============================
    */


    const bateMetaKm =
        porKm >= config.metaKm;

    const bateMetaHora =
        porHora >= config.metaHora;


    let nota = 0;
    let avaliacao = "";


    if (bateMetaKm && bateMetaHora) {

        nota = 10;

        avaliacao =
            "🟢 EXCELENTE CORRIDA";

    }

    else if (
        bateMetaKm ||
        bateMetaHora
    ) {

        nota = 7;

        avaliacao =
            "🟡 CORRIDA REGULAR";

    }

    else {

        nota = 3;

        avaliacao =
            "🔴 ABAIXO DA SUA META";

    }


    /*
        ==============================
        SALVAR CORRIDA TEMPORÁRIA
        ==============================
    */


    corridaAtual = {

        id: Date.now(),

        aplicativo,

        valor,

        distancia,

        tempo,

        porKm,

        porHora,

        combustivel:
            custoCombustivel,

        manutencao:
            custoManutencao,

        custoTotal,

        lucro,

        nota,

        avaliacao,

        status: "Analisada",

        data:
            new Date().toISOString()

    };


    /*
        ==============================
        MOSTRAR RESULTADO
        ==============================
    */


    document
        .getElementById("resultado")
        .classList.remove("hidden");


    document
        .getElementById("avaliacao")
        .textContent =
        avaliacao;


    document
        .getElementById("nota")
        .textContent =
        nota;


    document
        .getElementById("porKm")
        .textContent =
        dinheiro(porKm);


    document
        .getElementById("porHora")
        .textContent =
        dinheiro(porHora);


    document
        .getElementById("combustivelResultado")
        .textContent =
        dinheiro(custoCombustivel);


    document
        .getElementById("manutencaoResultado")
        .textContent =
        dinheiro(custoManutencao);


    document
        .getElementById("custoTotal")
        .textContent =
        dinheiro(custoTotal);


    document
        .getElementById("lucro")
        .textContent =
        dinheiro(lucro);


    document
        .getElementById("metaKmResultado")
        .textContent =
        "Meta: " +
        dinheiro(config.metaKm) +
        "/km";


    document
        .getElementById("metaHoraResultado")
        .textContent =
        "Meta: " +
        dinheiro(config.metaHora) +
        "/h";

}
