 /* ==================================================
    KYNENCE LAB
    SISTEMA DE CATEGORIAS
    V1.1
    ================================================== */


/*
    Cada categoria possui:

    - slug
    - nome
    - descricao

    O slug é utilizado nas URLs.

    Exemplo:

    categoria.html?categoria=economia
*/


/* ==================================================
   1. CATÁLOGO DE CATEGORIAS
================================================== */

const categorias = [

    {
        slug: "financas",

        nome: "Finanças",

        descricao:
            "Conteúdos para compreender melhor o dinheiro, orçamento, poupança e organização financeira."
    },


    {
        slug: "economia",

        nome: "Economia",

        descricao:
            "Entenda inflação, preços, moeda, mercados e os principais conceitos da economia."
    },


    {
        slug: "investimentos",

        nome: "Investimentos",

        descricao:
            "Conheça conceitos fundamentais sobre investimentos, risco, retorno e diversificação."
    },


    {
        slug: "educacao",

        nome: "Educação Financeira",

        descricao:
            "Conceitos, explicações e guias para desenvolver conhecimentos sobre dinheiro e economia."
    },


    {
        slug: "trabalho",

        nome: "Trabalho & Renda",

        descricao:
            "Conteúdos sobre trabalho, carreira, empreendedorismo e diferentes formas de gerar renda."
    }

];


/* ==================================================
   2. EXPORTAÇÃO OFICIAL KYNENCE
================================================== */

/*
    O sistema do KYNENCE LAB utiliza:

    window.KYNENCE_CATEGORIAS

    para acessar o catálogo em qualquer página.

    Isso evita depender diretamente da variável
    "categorias" e mantém a mesma arquitetura
    utilizada pelo artigos.js.
*/

window.KYNENCE_CATEGORIAS =
    categorias;


/* ==================================================
   3. COMPATIBILIDADE
================================================== */

/*
    Mantemos também:

    window.categorias

    para compatibilidade com versões anteriores
    do sistema.
*/

window.categorias =
    categorias;


/* ==================================================
   4. LOG DE DESENVOLVIMENTO
================================================== */

console.log(
    "[KYNENCE] Catálogo de categorias carregado:",
    categorias.length
);


/* ==================================================
   FIM DO CATÁLOGO
================================================== */