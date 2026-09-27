// ============================================================
// KYNENCE LAB
// KYNENCE API
// V1.7.2 — Correção KYNENCE_DATA
// ============================================================
//
// Este arquivo:
//
// 1. Busca dados atuais no Banco Mundial
// 2. Busca histórico
// 3. Busca metadados
// 4. Atualiza window.KYNENCE_DATA
// 5. Notifica o script.js
//
// IMPORTANTE:
//
// O arquivo indicadores.js utiliza:
//
//     window.KYNENCE_DATA
//
// Portanto este arquivo também utiliza KYNENCE_DATA.
//
// ============================================================


// ============================================================
// 1. CONFIGURAÇÃO
// ============================================================

const KYNENCE_API = {

    baseURL:
        "https://api.worldbank.org/v2",

    pais:
        "AGO",

    anosHistorico:
        6

};


// ============================================================
// 2. VERIFICAR RESPOSTA DO WORLD BANK
// ============================================================

function respostaWorldBankValida(dados) {

    return (

        Array.isArray(dados) &&

        dados.length >= 2 &&

        Array.isArray(dados[1]) &&

        dados[1].length > 0

    );

}


// ============================================================
// 3. BUSCAR DADOS ATUAIS
// ============================================================

async function buscarIndicadorWorldBank(
    codigoIndicador
) {

    const url =

        `${KYNENCE_API.baseURL}` +

        `/country/${KYNENCE_API.pais}` +

        `/indicator/${codigoIndicador}` +

        `?format=json` +

        `&mrnev=1` +

        `&per_page=10`;


    console.log(
        `[KYNENCE API] Dados atuais → ${codigoIndicador}`
    );


    const resposta =
        await fetch(url);


    if (!resposta.ok) {

        throw new Error(
            `HTTP ${resposta.status}`
        );

    }


    const dados =
        await resposta.json();


    if (
        !respostaWorldBankValida(dados)
    ) {

        throw new Error(
            "A API não devolveu dados válidos."
        );

    }


    const registro =
        dados[1][0];


    return {

        periodo:
            registro.date || null,

        valor:
            registro.value !== null
                ? Number(registro.value)
                : null,

        unidade:
            registro.unit || "",

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
            registro.obs_status ||
            "",

        decimal:
            registro.decimal ??
            null,

        escala:
            registro.scale ??
            null

    };

}


// ============================================================
// 4. BUSCAR HISTÓRICO
// ============================================================

async function buscarHistoricoWorldBank(
    codigoIndicador
) {

    const anoAtual =
        new Date().getFullYear();


    const anoInicial =
        anoAtual -
        (KYNENCE_API.anosHistorico - 1);


    const url =

        `${KYNENCE_API.baseURL}` +

        `/country/${KYNENCE_API.pais}` +

        `/indicator/${codigoIndicador}` +

        `?format=json` +

        `&date=${anoInicial}:${anoAtual}` +

        `&per_page=100`;


    console.log(
        `[KYNENCE API] Histórico → ${codigoIndicador}`
    );


    const resposta =
        await fetch(url);


    if (!resposta.ok) {

        throw new Error(
            `HTTP ${resposta.status}`
        );

    }


    const dados =
        await resposta.json();


    if (
        !respostaWorldBankValida(dados)
    ) {

        console.warn(
            `[KYNENCE API] Sem histórico: ${codigoIndicador}`
        );

        return [];

    }


    return dados[1]

        .filter(registro => {

            return (

                registro &&

                registro.date &&

                registro.value !== null

            );

        })

        .map(registro => {

            return {

                periodo:
                    registro.date,

                valor:
                    Number(registro.value),

                statusObservacao:
                    registro.obs_status ||
                    ""

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

    const url =

        `${KYNENCE_API.baseURL}` +

        `/indicator/${codigoIndicador}` +

        `?format=json&per_page=1`;


    console.log(
        `[KYNENCE API] Metadados → ${codigoIndicador}`
    );


    const resposta =
        await fetch(url);


    if (!resposta.ok) {

        throw new Error(
            `HTTP ${resposta.status}`
        );

    }


    const dados =
        await resposta.json();


    if (
        !respostaWorldBankValida(dados)
    ) {

        throw new Error(
            "Metadados inválidos."
        );

    }


    const registro =
        dados[1][0];


    return {

        id:
            registro.id ||
            codigoIndicador,

        nome:
            registro.name ||
            "",

        unidade:
            registro.unit ||
            "",

        descricao:
            registro.sourceNote ||
            "",

        organizacao:
            registro.sourceOrganization ||
            "",

        fonte:
            registro.source?.value ||
            "World Bank",

        fonteId:
            registro.source?.id ||
            "",

        topicos:
            Array.isArray(registro.topics)
                ? registro.topics
                : []

    };

}


// ============================================================
// 6. APLICAR DADOS ATUAIS
// ============================================================

function aplicarResultadoIndicador(
    indicador,
    resultado
) {

    if (
        !indicador ||
        !resultado
    ) {

        return;

    }


    indicador.valor =
        resultado.valor;


    indicador.periodo =
        resultado.periodo;


    indicador.pais =
        resultado.pais ||
        indicador.pais;


    indicador.codigoPais =
        resultado.codigoPais ||
        indicador.codigoPais;


    indicador.statusObservacao =
        resultado.statusObservacao ||
        "";


    indicador.decimal =
        resultado.decimal;


    indicador.escala =
        resultado.escala;


    /*
       Mantemos a unidade original do KYNENCE LAB.

       A unidade oficial ficará em:

       indicador.unidadeOficial
    */

    if (
        !indicador.unidade &&
        resultado.unidade
    ) {

        indicador.unidade =
            resultado.unidade;

    }


    indicador.ultimaAtualizacao =
        new Date().toISOString();

}


// ============================================================
// 7. APLICAR HISTÓRICO
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

}


// ============================================================
// 8. APLICAR METADADOS
// ============================================================

function aplicarMetadadosIndicador(
    indicador,
    metadados
) {

    if (
        !indicador ||
        !metadados
    ) {

        return;

    }


    indicador.codigoIndicador =

        metadados.id ||

        indicador.codigoIndicador;


    indicador.nomeOficial =

        metadados.nome ||

        "";


    indicador.unidadeOficial =

        metadados.unidade ||

        "";


    indicador.descricaoOficial =

        metadados.descricao ||

        "";


    indicador.organizacaoFonte =

        metadados.organizacao ||

        "";


    indicador.fonteOficial =

        metadados.fonte ||

        indicador.fonte ||

        "World Bank";


    indicador.fonteId =

        metadados.fonteId ||

        "";


    indicador.topicosOficiais =

        Array.isArray(metadados.topicos)

            ? metadados.topicos

            : [];

}


// ============================================================
// 9. ATUALIZAR UM INDICADOR
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


    const codigo =
        indicador.codigoIndicador;


    console.log(
        `[KYNENCE API] Atualizando → ${codigo}`
    );


    // ========================================================
    // 9.1 DADOS ATUAIS
    // ========================================================

    try {

        const resultadoAtual =

            await buscarIndicadorWorldBank(
                codigo
            );


        aplicarResultadoIndicador(

            indicador,

            resultadoAtual

        );


        console.log(
            `[KYNENCE API] ✓ Dados → ${codigo}`
        );


    } catch (erro) {

        console.error(
            `[KYNENCE API] ✗ Dados → ${codigo}`,
            erro
        );


        indicador.erroDados =

            erro.message ||

            "Erro ao buscar dados.";

    }


    // ========================================================
    // 9.2 HISTÓRICO
    // ========================================================

    try {

        const historico =

            await buscarHistoricoWorldBank(
                codigo
            );


        aplicarHistoricoIndicador(

            indicador,

            historico

        );


        console.log(

            `[KYNENCE API] ✓ Histórico → ` +

            `${codigo} (${historico.length} pontos)`

        );


    } catch (erro) {

        console.warn(

            `[KYNENCE API] ⚠ Histórico → ${codigo}`,

            erro

        );


        indicador.historico =

            indicador.historico || [];

    }


    // ========================================================
    // 9.3 METADADOS
    // ========================================================

    try {

        const metadados =

            await buscarMetadadosWorldBank(
                codigo
            );


        aplicarMetadadosIndicador(

            indicador,

            metadados

        );


        console.log(
            `[KYNENCE API] ✓ Metadados → ${codigo}`
        );


    } catch (erro) {

        console.warn(

            `[KYNENCE API] ⚠ Metadados → ${codigo}`,

            erro

        );

    }


    // ========================================================
    // RESULTADO
    // ========================================================

    console.log(

        `[KYNENCE API] Resultado → ${codigo}`,

        {

            valor:
                indicador.valor,

            periodo:
                indicador.periodo,

            historico:
                indicador.historico?.length || 0,

            fonte:
                indicador.fonteOficial ||

                indicador.fonte ||

                "World Bank"

        }

    );


    return indicador;

}


// ============================================================
// 10. ATUALIZAR KYNENCE DATA
// ============================================================

async function atualizarKynenceData() {


    // ========================================================
    // CORREÇÃO PRINCIPAL
    // ========================================================
    //
    // O indicadores.js cria:
    //
    // window.KYNENCE_DATA
    //
    // e não:
    //
    // window.KYNENCE_INDICADORES
    //
    // ========================================================


    if (
        !Array.isArray(
            window.KYNENCE_DATA
        )
    ) {

        console.error(

            "[KYNENCE API] " +

            "window.KYNENCE_DATA não encontrado."

        );


        return;

    }


    console.log(
        "=============================================="
    );


    console.log(
        "[KYNENCE API] " +
        "Iniciando atualização..."
    );


    console.log(

        "[KYNENCE API] Indicadores encontrados:",

        window.KYNENCE_DATA.length

    );


    // ========================================================
    // ATUALIZAR TODOS
    // ========================================================

    await Promise.all(

        window.KYNENCE_DATA.map(

            indicador =>

                atualizarIndicadorWorldBank(
                    indicador
                )

        )

    );


    // ========================================================
    // CONCLUÍDO
    // ========================================================

    console.log(

        "[KYNENCE API] " +

        "Atualização concluída."

    );


    // ========================================================
    // AVISAR O SCRIPT.JS
    // ========================================================

    document.dispatchEvent(

        new CustomEvent(

            "kynenceDataAtualizado"

        )

    );


    return window.KYNENCE_DATA;

}


// ============================================================
// 11. ATUALIZAÇÃO MANUAL
// ============================================================

async function atualizarKynenceDataManual() {

    console.log(
        "[KYNENCE API] Atualização manual iniciada."
    );


    return await atualizarKynenceData();

}


// ============================================================
// 12. EXPOR FUNÇÕES
// ============================================================

window.KYNENCE_API =
    KYNENCE_API;


window.buscarIndicadorWorldBank =
    buscarIndicadorWorldBank;


window.buscarHistoricoWorldBank =
    buscarHistoricoWorldBank;


window.buscarMetadadosWorldBank =
    buscarMetadadosWorldBank;


window.atualizarIndicadorWorldBank =
    atualizarIndicadorWorldBank;


window.atualizarKynenceData =
    atualizarKynenceData;


window.atualizarKynenceDataManual =
    atualizarKynenceDataManual;


// ============================================================
// FIM — KYNENCE API V1.7.2
// ============================================================
