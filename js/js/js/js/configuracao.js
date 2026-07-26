function obterConfiguracaoFormulario() {

    return {
        metaKm: Number(
            document.getElementById("metaKm").value
        ),

        metaHora: Number(
            document.getElementById("metaHora").value
        ),

        metaDiaria: Number(
            document.getElementById("metaDiaria").value
        ),

        combustivel:
            document.getElementById("combustivel").value,

        precoLitro: Number(
            document.getElementById("precoLitro").value
        ),

        consumo: Number(
            document.getElementById("consumo").value
        ),

        manutencaoKm: Number(
            document.getElementById("manutencaoKm").value
        )
    };
}


function preencherFormularioConfiguracao() {

    const config = carregarConfiguracao();

    document.getElementById("metaKm").value =
        config.metaKm;

    document.getElementById("metaHora").value =
        config.metaHora;

    document.getElementById("metaDiaria").value =
        config.metaDiaria;

    document.getElementById("combustivel").value =
        config.combustivel;

    document.getElementById("precoLitro").value =
        config.precoLitro;

    document.getElementById("consumo").value =
        config.consumo;

    document.getElementById("manutencaoKm").value =
        config.manutencaoKm;
}


function salvarConfiguracaoMotorista() {

    const configuracao =
        obterConfiguracaoFormulario();

    if (
        configuracao.metaKm <= 0 ||
        configuracao.metaHora <= 0 ||
        configuracao.metaDiaria <= 0 ||
        configuracao.precoLitro <= 0 ||
        configuracao.consumo <= 0 ||
        configuracao.manutencaoKm < 0
    ) {
        alert("Confira os valores informados.");
        return;
    }

    salvarConfiguracao(configuracao);

    alert("Configuração salva com sucesso!");
}
