// ============================================================
// KYNENCE LAB
// KYNENCE API
// V1.8.0
// ============================================================
//
// FUNCIONALIDADES:
//
// 1. Dados atuais
// 2. Histórico económico
// 3. Metadados oficiais
// 4. Cálculo de variações
// 5. Estados dos indicadores
// 6. Tratamento de erros
// 7. Proteção contra atualizações simultâneas
// 8. Comunicação com script.js
//
// PAÍS: ANGOLA (AGO)
//
// ============================================================


// ============================================================
// 1. CONFIGURAÇÃO
// ============================================================

const KYNENCE_API = {

    baseURL: "https://api.worldbank.org/v2",

    pais: "AGO",

    anosHistorico: 6,

    formato: "json"

};


// Evita atualizações simultâneas.

let kynenceAtualizacaoEmAndamento = null;


// ============================================================
// 2. FUNÇÕES AUXILIARES
// ============================================================

function respostaWorldBankEstruturada(dados) {

    return (

        Array.isArray(dados) &&

        dados.length >= 2 &&

        Array.isArray(dados[1])

    );

}


function formatarNumeroKynence(valor) {

    return new Intl.NumberFormat(

        "pt-PT",

        {

            maximumFractionDigits: 2

        }

    ).format(valor);

}


function criarUrlWorldBank(caminho, parametros = {}) {

    const url = new URL(

        `${KYNENCE_API.baseURL}${caminho}`

    );

    Object.entries(parametros).forEach(

        ([chave, valor]) => {

            url.searchParams.set(chave, valor);

        }

    );

    return url.toString();

}


// ==========================================
// KYNENCE REQUEST MANAGER V1.0
// Fila de pedidos e recuperação automática
// ==========================================

let kynenceFilaRequisicoes = Promise.resolve();

function requisicaoWorldBank(url) {

    async function executarPedido() {

        const maxTentativas = 3;

        for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {

            try {

                console.log(
                    `[KYNENCE API] Pedido ${tentativa}/${maxTentativas}:`,
                    url
                );

                const resposta = await fetch(url);

                if (!resposta.ok) {
                    throw new Error(
                        `Erro HTTP ${resposta.status}`
                    );
                }

                const dados = await resposta.json();

                if (
                    !Array.isArray(dados) ||
                    !Array.isArray(dados[1])
                ) {
                    throw new Error(
                        "Resposta inválida do Banco Mundial."
                    );
                }

                console.log(
                    "[KYNENCE API] Pedido concluído:",
                    url
                );

                return dados[1];

            } catch (erro) {

                console.warn(
                    `[KYNENCE API] Tentativa ${tentativa} falhou:`,
                    erro.message
                );

                if (tentativa === maxTentativas) {
                    throw erro;
                }

                const espera = tentativa * 1000;

                await new Promise(resolve =>
                    setTimeout(resolve, espera)
                );
            }
        }
    }

    // Coloca o pedido na fila.
    const pedido = kynenceFilaRequisicoes.then(
        executarPedido,
        executarPedido
    );

    // Mantém a fila funcional mesmo quando um pedido falha.
    kynenceFilaRequisicoes = pedido.then(
        () => undefined,
        () => undefined
    );

    return pedido;
}


// ============================================================
// 3. BUSCAR DADOS ATUAIS
// ============================================================

async function buscarIndicadorWorldBank(

    codigoIndicador

) {

    const url = criarUrlWorldBank(

        `/country/${KYNENCE_API.pais}/indicator/${codigoIndicador}`,

        {

            format: KYNENCE_API.formato,

            mrnev: 1,

            per_page: 10

        }

    );


    console.log(

        `[KYNENCE API] Dados atuais → ${codigoIndicador}`

    );


    const registros = await requisicaoWorldBank(url);


    const registro = registros.find(

        item =>

            item &&

            item.value !== null &&

            item.value !== undefined

    );


    if (!registro) {

        return null;

    }


    return {

        periodo: registro.date || null,

        valor: Number(registro.value),

        unidade: registro.unit || "",

        pais:

            registro.country?.value ||

            "Angola",

        codigoPais:

            registro.countryiso3code ||

            KYNENCE_API.pais,

        indicadorId:

            registro.indicator?.id ||

            codigoIndicador,

        indicadorNome:

            registro.indicator?.value ||

            "",

        statusObservacao:

            registro.obs_status || "",

        decimal:

            registro.decimal ?? null,

        escala:

            registro.scale ?? null

    };

}


// ============================================================
// 4. BUSCAR HISTÓRICO
// ============================================================

async function buscarHistoricoWorldBank(

    codigoIndicador

) {

    const anoAtual = new Date().getFullYear();


    const anoInicial =

        anoAtual -

        (KYNENCE_API.anosHistorico - 1);


    const url = criarUrlWorldBank(

        `/country/${KYNENCE_API.pais}/indicator/${codigoIndicador}`,

        {

            format: KYNENCE_API.formato,

            date: `${anoInicial}:${anoAtual}`,

            per_page: 100

        }

    );


    console.log(

        `[KYNENCE API] Histórico → ${codigoIndicador}`

    );


    const registros = await requisicaoWorldBank(url);


    return registros

        .filter(registro => {

            return (

                registro &&

                registro.date &&

                registro.value !== null &&

                registro.value !== undefined

            );

        })

        .map(registro => {

            return {

                periodo: registro.date,

                valor: Number(registro.value),

                statusObservacao:

                    registro.obs_status || ""

            };

        })

        .sort((a, b) => {

            return (

                Number(a.periodo) -

                Number(b.periodo)

            );

        });

}


// ============================================================
// 5. BUSCAR METADADOS
// ============================================================

async function buscarMetadadosWorldBank(

    codigoIndicador

) {

    const url = criarUrlWorldBank(

        `/indicator/${codigoIndicador}`,

        {

            format: KYNENCE_API.formato,

            per_page: 1

        }

    );


    console.log(

        `[KYNENCE API] Metadados → ${codigoIndicador}`

    );


    const registros = await requisicaoWorldBank(url);


    const registro = registros[0];


    if (!registro) {

        throw new Error(

            "Metadados não encontrados."

        );

    }


    return {

        id:

            registro.id ||

            codigoIndicador,

        nome:

            registro.name || "",

        unidade:

            registro.unit || "",

        descricao:

            registro.sourceNote || "",

        organizacao:

            registro.sourceOrganization || "",

        fonte:

            registro.source?.value ||

            "World Bank",

        fonteId:

            registro.source?.id || "",

        topicos:

            Array.isArray(registro.topics)

                ? registro.topics

                : []

    };

}


// ============================================================
// 6. CALCULAR VARIAÇÃO
// ============================================================

function calcularVariacaoIndicador(indicador) {

    if (

        !indicador ||

        indicador.valor === null ||

        !Array.isArray(indicador.historico)

    ) {

        return;

    }


    const periodoAtual = Number(indicador.periodo);


    const registrosAnteriores =

        indicador.historico.filter(registro => {

            return (

                Number(registro.periodo) <

                periodoAtual

            );

        });


    if (!registrosAnteriores.length) {

        indicador.variacaoValor = null;

        indicador.variacaoPercentual = null;

        indicador.periodoAnterior = null;

        indicador.tendencia = "indisponivel";

        indicador.variacao = "Sem comparação";

        return;

    }


    const anterior =

        registrosAnteriores[

            registrosAnteriores.length - 1

        ];


    const diferenca =

        indicador.valor - anterior.valor;


    const variacaoPercentual =

        anterior.valor !== 0

            ? (diferenca / Math.abs(anterior.valor)) * 100

            : null;


    indicador.variacaoValor = diferenca;

    indicador.variacaoPercentual =

        variacaoPercentual;


    indicador.periodoAnterior =

        anterior.periodo;


    indicador.tendencia =

        diferenca > 0

            ? "alta"

            : diferenca < 0

                ? "baixa"

                : "estavel";


    const sinal =

        diferenca > 0

            ? "+"

            : "";


    const unidadeVariacao =

        indicador.unidade === "%"

            ? " pontos percentuais"

            : ` ${indicador.unidade}`;


    indicador.variacao =

        `${sinal}${formatarNumeroKynence(diferenca)}` +

        unidadeVariacao;


}


// ============================================================
// 7. APLICAR DADOS ATUAIS
// ============================================================

function aplicarResultadoIndicador(

    indicador,

    resultado

) {

    if (!indicador) {

        return;

    }


    if (!resultado) {

        indicador.estadoDados = "sem-dados";

        indicador.statusDados = "sem-dados";

        indicador.erroDados = null;

        return;

    }


    indicador.valor = resultado.valor;

    indicador.periodo = resultado.periodo;


    indicador.pais =

        resultado.pais ||

        indicador.pais;


    indicador.codigoPais =

        resultado.codigoPais ||

        indicador.codigoPais;


    indicador.statusObservacao =

        resultado.statusObservacao;


    indicador.decimal = resultado.decimal;

    indicador.escala = resultado.escala;


    indicador.unidadeOficial =

        resultado.unidade || "";


    indicador.estadoDados = "atualizado";

    indicador.statusDados = "atualizado";


    indicador.erroDados = null;


    // Momento em que o sistema obteve os dados.

    const agora = new Date().toISOString();


    indicador.ultimaAtualizacao = agora;

    indicador.dataConsulta = agora;

}


// ============================================================
// 8. APLICAR HISTÓRICO
// ============================================================

function aplicarHistoricoIndicador(

    indicador,

    historico

) {

    if (!indicador) {

        return;

    }


    indicador.historico =

        Array.isArray(historico)

            ? historico

            : [];


    indicador.estadoHistorico =

        indicador.historico.length

            ? "disponivel"

            : "sem-historico";

}


// ============================================================
// 9. APLICAR METADADOS
// ============================================================

function aplicarMetadadosIndicador(

    indicador,

    metadados

) {

    if (!indicador || !metadados) {

        return;

    }


    indicador.codigoIndicador =

        metadados.id ||

        indicador.codigoIndicador;


    indicador.nomeOficial =

        metadados.nome || "";


    indicador.unidadeOficial =

        metadados.unidade || "";


    indicador.descricaoOficial =

        metadados.descricao || "";


    indicador.organizacaoFonte =

        metadados.organizacao || "";


    indicador.fonteOficial =

        metadados.fonte ||

        indicador.fonte ||

        "World Bank";


    indicador.fonteId =

        metadados.fonteId || "";


    indicador.topicosOficiais =

        metadados.topicos || [];


    indicador.estadoMetadados = "disponivel";

}


// ============================================================
// 10. ATUALIZAR UM INDICADOR
// ============================================================

async function atualizarIndicadorWorldBank(

    indicador

) {

    if (

        !indicador ||

        !indicador.codigoIndicador

    ) {

        console.warn(

            "[KYNENCE API] Indicador inválido."

        );

        return indicador;

    }


    const codigo = indicador.codigoIndicador;


    indicador.estadoDados = "carregando";

    indicador.statusDados = "carregando";


    console.log(

        `[KYNENCE API] Atualizando → ${codigo}`

    );


    // --------------------------------------------------------
    // 10.1 DADOS ATUAIS
    // --------------------------------------------------------

    try {

        const resultado =

            await buscarIndicadorWorldBank(codigo);


        aplicarResultadoIndicador(

            indicador,

            resultado

        );


    } catch (erro) {

        console.error(

            `[KYNENCE API] Erro nos dados → ${codigo}`,

            erro

        );


        indicador.estadoDados = "erro";

        indicador.statusDados = "erro";

        indicador.erroDados =

            erro.message ||

            "Erro ao obter dados.";

    }


    // --------------------------------------------------------
    // 10.2 HISTÓRICO
    // --------------------------------------------------------

    try {

        const historico =

            await buscarHistoricoWorldBank(codigo);


        aplicarHistoricoIndicador(

            indicador,

            historico

        );


    } catch (erro) {

        console.warn(

            `[KYNENCE API] Erro no histórico → ${codigo}`,

            erro

        );


        indicador.historico =

            indicador.historico || [];


        indicador.estadoHistorico = "erro";

    }


    // --------------------------------------------------------
    // 10.3 METADADOS
    // --------------------------------------------------------

    try {

        const metadados =

            await buscarMetadadosWorldBank(codigo);


        aplicarMetadadosIndicador(

            indicador,

            metadados

        );


    } catch (erro) {

        console.warn(

            `[KYNENCE API] Erro nos metadados → ${codigo}`,

            erro

        );


        indicador.estadoMetadados = "erro";

    }


    // --------------------------------------------------------
    // 10.4 VARIAÇÃO
    // --------------------------------------------------------

    if (

        indicador.estadoDados === "atualizado"

    ) {

        calcularVariacaoIndicador(indicador);

    }


    // --------------------------------------------------------
    // 10.5 RESULTADO
    // --------------------------------------------------------

    console.log(

        `[KYNENCE API] Resultado → ${codigo}`,

        {

            valor: indicador.valor,

            periodo: indicador.periodo,

            variacao: indicador.variacao,

            historico:

                indicador.historico?.length || 0,

            estado: indicador.estadoDados

        }

    );


    return indicador;

}


// ============================================================
// 11. ATUALIZAR KYNENCE DATA
// ============================================================

async function atualizarKynenceData() {


    // Evita executar duas atualizações ao mesmo tempo.

    if (kynenceAtualizacaoEmAndamento) {

        console.warn(

            "[KYNENCE API] Atualização já em andamento."

        );

        return kynenceAtualizacaoEmAndamento;

    }


    if (!Array.isArray(window.KYNENCE_DATA)) {

        console.error(

            "[KYNENCE API] " +

            "window.KYNENCE_DATA não encontrado."

        );

        return [];

    }


    console.log(

        "=============================================="

    );


    console.log(

        "[KYNENCE API] Iniciando atualização..."

    );


    const indicadores = window.KYNENCE_DATA;


    console.log(

        "[KYNENCE API] Indicadores encontrados:",

        indicadores.length

    );


    kynenceAtualizacaoEmAndamento = (async () => {

        try {

            await Promise.all(

                indicadores.map(indicador =>

                    atualizarIndicadorWorldBank(

                        indicador

                    )

                )

            );


            console.log(

                "[KYNENCE API] Atualização concluída."

            );


            document.dispatchEvent(

                new CustomEvent(

                    "kynenceDataAtualizado"

                )

            );


            return indicadores;

        } finally {

            kynenceAtualizacaoEmAndamento = null;

        }

    })();


    return kynenceAtualizacaoEmAndamento;

}


// ============================================================
// 12. ATUALIZAÇÃO MANUAL
// ============================================================

async function atualizarKynenceDataManual() {

    console.log(

        "[KYNENCE API] Atualização manual iniciada."

    );


    return atualizarKynenceData();

}


// ============================================================
// 13. EXPOR FUNÇÕES
// ============================================================

window.KYNENCE_API = KYNENCE_API;


window.buscarIndicadorWorldBank =

    buscarIndicadorWorldBank;


window.buscarHistoricoWorldBank =

    buscarHistoricoWorldBank;


window.buscarMetadadosWorldBank =

    buscarMetadadosWorldBank;


window.calcularVariacaoIndicador =

    calcularVariacaoIndicador;


window.atualizarIndicadorWorldBank =

    atualizarIndicadorWorldBank;


window.atualizarKynenceData =

    atualizarKynenceData;


window.atualizarKynenceDataManual =

    atualizarKynenceDataManual;


// ============================================================
// FIM — KYNENCE API V1.8.0
// ============================================================