/* =========================================================
   KYNENCE LAB
   BASE DE INDICADORES ECONÓMICOS
   V1.2

   Este arquivo define os indicadores utilizados
   pelo sistema KYNENCE DATA.

   Fonte principal atual:
   Banco Mundial

   País:
   Angola (AGO)

   IMPORTANTE:

   Este arquivo NÃO busca os dados sozinho.

   Ele apenas define a estrutura.

   A atualização é feita por:

       dados/kynence-api.js

   e apresentada por:

       script.js

   Futuramente:

       Supabase
           ↓
       Histórico
           ↓
       KYNENCE DATA
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO GERAL
   ========================================================= */

const KYNENCE_PAIS = {

    nome: "Angola",

    codigo: "AGO"

};


/* =========================================================
   2. INDICADORES
   ========================================================= */

/*
   Cada indicador possui:

   id
   nome
   unidade
   valor
   variacao
   tipo
   periodo
   pais
   codigoPais
   codigoIndicador
   fonte
   urlFonte
   ultimaAtualizacao
   descricao

   O campo codigoIndicador corresponde ao código
   utilizado pela fonte de dados.
*/


window.KYNENCE_DATA = [

    /* =====================================================
       1. INFLAÇÃO
       ===================================================== */

    {

        id: "inflacao",

        nome: "Inflação",

        unidade: "%",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        /*
           Consumer price inflation.
        */

        codigoIndicador: "FP.CPI.TOTL.ZG",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG",

        ultimaAtualizacao: null,

        descricao:
            "Variação percentual anual dos preços ao consumidor."

    },


    /* =====================================================
       2. CRESCIMENTO DO PIB
       ===================================================== */

    {

        id: "crescimento-pib",

        nome: "Crescimento do PIB",

        unidade: "%",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        codigoIndicador:
            "NY.GDP.MKTP.KD.ZG",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG",

        ultimaAtualizacao: null,

        descricao:
            "Variação anual do produto interno bruto real."

    },


    /* =====================================================
       3. PIB PER CAPITA
       ===================================================== */

    {

        id: "pib-per-capita",

        nome: "PIB per capita",

        unidade: "US$",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        codigoIndicador:
            "NY.GDP.PCAP.CD",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD",

        ultimaAtualizacao: null,

        descricao:
            "Produto interno bruto dividido pela população."

    },


    /* =====================================================
       4. POPULAÇÃO
       ===================================================== */

    {

        id: "populacao",

        nome: "População",

        unidade: "pessoas",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        codigoIndicador:
            "SP.POP.TOTL",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/SP.POP.TOTL",

        ultimaAtualizacao: null,

        descricao:
            "Estimativa da população total de Angola."

    },


    /* =====================================================
       5. DESEMPREGO
       ===================================================== */

    {

        id: "desemprego",

        nome: "Desemprego",

        unidade: "%",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        codigoIndicador:
            "SL.UEM.TOTL.ZS",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS",

        ultimaAtualizacao: null,

        descricao:
            "Percentagem da força de trabalho sem emprego."

    },


    /* =====================================================
       6. PIB
       ===================================================== */

    {

        id: "pib",

        nome: "PIB",

        unidade: "US$",

        valor: null,

        variacao: "Aguardando dados",

        tipo: "neutro",

        periodo: null,

        pais: KYNENCE_PAIS.nome,

        codigoPais: KYNENCE_PAIS.codigo,

        codigoIndicador:
            "NY.GDP.MKTP.CD",

        fonte: "Banco Mundial",

        urlFonte:
            "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",

        ultimaAtualizacao: null,

        descricao:
            "Valor do produto interno bruto de Angola em dólares correntes."

    }

];


/* =========================================================
   FIM DO ARQUIVO
   ========================================================= */

