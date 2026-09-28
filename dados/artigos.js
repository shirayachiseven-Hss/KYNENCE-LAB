/* =========================================================
   KYNENCE LAB
   CATÁLOGO DE ARTIGOS
   V2.0 — ESTRUTURA EDITORIAL

   Sistema:
   window.KYNENCE_ARTIGOS

   NOVA ESTRUTURA:
   - Metadados do artigo
   - SEO
   - Publicação
   - Tags
   - Fontes
   - Conteúdo editorial em blocos

   TIPOS DE BLOCOS SUPORTADOS:
   - introducao
   - titulo
   - paragrafo
   - destaque
   - lista
   - citacao
   - tabela
   - imagem
   - conclusao
   - aviso

   IMPORTANTE:
   Os campos antigos são mantidos para garantir
   compatibilidade com o restante do KYNENCE LAB.
   ========================================================= */


window.KYNENCE_ARTIGOS = [

    /* =====================================================
       ARTIGO 1 — INFLAÇÃO
       ===================================================== */

        {
            /* =================================================
               IDENTIFICAÇÃO
               ================================================= */
        
            id: "inflacao",
        
            titulo: "O que é inflação?",
        
            slug: "o-que-e-inflacao",
        
            /* =================================================
               RESUMO
               ================================================= */
        
            resumo:
                "Entenda de forma simples o que é inflação, como ela funciona e por que pode afetar o poder de compra.",
        
            /* =================================================
               CATEGORIA
               ================================================= */
        
            categoria: "Economia",
        
            categoriaSlug: "economia",
        
            /* =================================================
               AUTORIA
               ================================================= */
        
            autor: "KYNENCE LAB",
        
            /* =================================================
               DATAS
               ================================================= */
        
            data: "23 Setembro 2026",
        
            dataISO: "2026-09-23",
        
            dataAtualizacao: "23 Setembro 2026",
        
            dataAtualizacaoISO: "2026-09-23",
        
            /* =================================================
               LEITURA
               ================================================= */
        
            leitura: "6 min",
        
            tempoLeitura: "6 min",
        
            /* =================================================
               IMAGEM
               ================================================= */
        
            imagem: "",
        
            /* =================================================
               TAGS
               ================================================= */
        
            tags: [
                "inflação",
                "economia",
                "preços",
                "poder de compra",
                "educação financeira"
            ],
        
            /* =================================================
               SEO
               ================================================= */
        
            seoTitulo:
                "O que é inflação? Entenda de forma simples",
        
            seoDescricao:
                "Entenda o que é inflação, por que os preços podem subir e como a inflação pode afetar o poder de compra.",
        
            /* =================================================
               DESTAQUE
               ================================================= */
        
            destaque: true,
        
            /* =================================================
               PUBLICAÇÃO
               ================================================= */
        
            publicado: true,
        
            /* =================================================
               URL
               ================================================= */
        
            url: "artigos/o-que-e-inflacao.html",
        
            /* =================================================
               CONTEÚDO EDITORIAL
               ================================================= */
        
            conteudo: [
        
                /* =================================================
                   1 — INTRODUÇÃO
                   ================================================= */
        
                {
                    tipo: "introducao",
        
                    texto:
                        "A inflação é um dos conceitos mais importantes para compreender a economia e a vida financeira. Ela está relacionada à evolução dos preços de bens e serviços ao longo do tempo e pode influenciar quanto conseguimos comprar com o nosso dinheiro."
                },
        
        
                /* =================================================
                   2 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "O que é inflação?"
                },
        
        
                /* =================================================
                   3 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "De forma simples, inflação é um aumento generalizado dos preços de bens e serviços durante determinado período. Quando os preços aumentam de forma persistente, a mesma quantidade de dinheiro pode deixar de comprar a mesma quantidade de produtos e serviços."
                },
        
        
                /* =================================================
                   4 — DESTAQUE
                   ================================================= */
        
                {
                    tipo: "destaque",
        
                    titulo: "Em poucas palavras",
        
                    texto:
                        "Inflação significa que, em geral, os preços estão aumentando. Quando isso acontece, o poder de compra do dinheiro pode diminuir."
                },
        
        
                /* =================================================
                   5 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "Como a inflação funciona?"
                },
        
        
                /* =================================================
                   6 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "A inflação não significa necessariamente que todos os preços aumentam ao mesmo tempo ou na mesma proporção. Alguns produtos podem ficar mais caros, outros podem permanecer estáveis e alguns podem até ficar mais baratos."
                },
        
        
                /* =================================================
                   7 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "Por isso, quando se fala em inflação, normalmente estamos interessados no comportamento geral dos preços de uma economia, medido por indicadores construídos a partir de conjuntos de bens e serviços."
                },
        
        
                /* =================================================
                   8 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "Por que os preços podem subir?"
                },
        
        
                /* =================================================
                   9 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "Existem diferentes fatores que podem contribuir para o aumento dos preços. Entre eles estão alterações na procura por produtos e serviços, mudanças nos custos de produção, variações nos preços de matérias-primas e outros acontecimentos que afetam a economia."
                },
        
        
                /* =================================================
                   10 — LISTA
                   ================================================= */
        
                {
                    tipo: "lista",
        
                    itens: [
                        "Aumento da procura por determinados bens e serviços.",
                        "Aumento dos custos de produção.",
                        "Alterações nos preços de matérias-primas.",
                        "Problemas na oferta de determinados produtos.",
                        "Mudanças nas condições económicas."
                    ]
                },
        
        
                /* =================================================
                   11 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "Como a inflação afeta o poder de compra?"
                },
        
        
                /* =================================================
                   12 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "Imagine que uma determinada quantia de dinheiro seja suficiente para comprar vários produtos hoje. Se os preços desses produtos aumentarem e a quantia disponível continuar igual, será possível comprar uma quantidade menor com o mesmo dinheiro."
                },
        
        
                /* =================================================
                   13 — EXEMPLO
                   ================================================= */
        
                {
                    tipo: "destaque",
        
                    titulo: "Exemplo simples",
        
                    texto:
                        "Se um conjunto de produtos custa 10.000 Kz e, algum tempo depois, passa a custar 11.000 Kz, serão necessários mais 1.000 Kz para comprar exatamente o mesmo conjunto de produtos."
                },
        
        
                /* =================================================
                   14 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "Inflação não significa que tudo fica mais caro"
                },
        
        
                /* =================================================
                   15 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "É importante distinguir o aumento do preço de um produto específico da inflação. Um único produto pode ficar mais caro por razões próprias, enquanto a inflação procura representar uma evolução mais ampla dos preços na economia."
                },
        
        
                /* =================================================
                   16 — CITAÇÃO
                   ================================================= */
        
                {
                    tipo: "citacao",
        
                    texto:
                        "O comportamento dos preços deve ser analisado de forma ampla, e não apenas observando um único produto."
                },
        
        
                /* =================================================
                   17 — TÍTULO
                   ================================================= */
        
                {
                    tipo: "titulo",
        
                    texto: "Por que compreender a inflação é importante?"
                },
        
        
                /* =================================================
                   18 — PARÁGRAFO
                   ================================================= */
        
                {
                    tipo: "paragrafo",
        
                    texto:
                        "Compreender a inflação ajuda a interpretar mudanças nos preços, no poder de compra e nas decisões financeiras. Também ajuda a compreender notícias económicas e indicadores que aparecem no dia a dia."
                },
        
        
                /* =================================================
                   19 — CONCLUSÃO
                   ================================================= */
        
                {
                    tipo: "conclusao",
        
                    titulo: "Conclusão",
        
                    texto:
                        "A inflação é um fenómeno económico relacionado com a evolução geral dos preços ao longo do tempo. Entender o seu funcionamento é um passo importante para compreender a economia e tomar decisões financeiras com maior conhecimento."
                },
        
        
                /* =================================================
                   20 — AVISO
                   ================================================= */
        
                {
                    tipo: "aviso",
        
                    titulo: "Nota editorial",
        
                    texto:
                        "Este artigo tem finalidade educativa e apresenta uma explicação introdutória sobre inflação. Indicadores, causas e efeitos podem ser analisados de forma mais aprofundada em estudos económicos específicos."
                }
        
            ],
        
            /* =================================================
               FONTES
               ================================================= */
        
            fontes: []
        },


    /* =====================================================
       ARTIGO 2 — ORÇAMENTO PESSOAL
       ===================================================== */

    {
        /* =================================================
           IDENTIFICAÇÃO
           ================================================= */

        id: "orcamento-pessoal",

        titulo: "Como criar um orçamento pessoal",

        slug: "como-criar-um-orcamento-pessoal",

        /* =================================================
           RESUMO
           ================================================= */

        resumo:
            "Aprenda os princípios básicos para organizar as entradas, despesas e objetivos do seu dinheiro.",

        /* =================================================
           CATEGORIA
           ================================================= */

        categoria: "Finanças",

        categoriaSlug: "financas",

        /* =================================================
           AUTORIA
           ================================================= */

        autor: "KYNENCE LAB",

        /* =================================================
           DATAS
           ================================================= */

        data: "Em breve",

        dataISO: "",

        dataAtualizacao: "",

        dataAtualizacaoISO: "",

        /* =================================================
           LEITURA
           ================================================= */

        leitura: "5 min",

        tempoLeitura: "5 min",

        /* =================================================
           IMAGEM
           ================================================= */

        imagem: "",

        /* =================================================
           TAGS
           ================================================= */

        tags: [
            "orçamento",
            "finanças pessoais",
            "despesas",
            "planejamento",
            "educação financeira"
        ],

        /* =================================================
           SEO
           ================================================= */

        seoTitulo:
            "Como criar um orçamento pessoal",

        seoDescricao:
            "Aprenda os princípios básicos para organizar receitas, despesas e objetivos financeiros.",

        /* =================================================
           DESTAQUE
           ================================================= */

        destaque: false,

        /* =================================================
           PUBLICAÇÃO
           ================================================= */

        publicado: false,

        /* =================================================
           URL
           ================================================= */

        url: "#",

        /* =================================================
           FONTES
           ================================================= */

        fontes: [],

        /* =================================================
           CONTEÚDO EDITORIAL
           =================================================

           O artigo ainda não foi publicado e, por isso,
           não adicionamos conteúdo que ainda não existe.
           ================================================= */

        conteudo: []
    },


    /* =====================================================
       ARTIGO 3 — PREÇOS
       ===================================================== */

    {
        /* =================================================
           IDENTIFICAÇÃO
           ================================================= */

        id: "precos",

        titulo: "Por que os preços sobem?",

        slug: "por-que-os-precos-sobem",

        /* =================================================
           RESUMO
           ================================================= */

        resumo:
            "Uma introdução aos diferentes fatores que podem influenciar os preços de bens e serviços.",

        /* =================================================
           CATEGORIA
           ================================================= */

        categoria: "Economia",

        categoriaSlug: "economia",

        /* =================================================
           AUTORIA
           ================================================= */

        autor: "KYNENCE LAB",

        /* =================================================
           DATAS
           ================================================= */

        data: "23 Setembro 2026",

        dataISO: "2026-09-23",

        dataAtualizacao: "23 Setembro 2026",

        dataAtualizacaoISO: "2026-09-23",

        /* =================================================
           LEITURA
           ================================================= */

        leitura: "5 min",

        tempoLeitura: "5 min",

        /* =================================================
           IMAGEM
           ================================================= */

        imagem: "",

        /* =================================================
           TAGS
           ================================================= */

        tags: [
            "preços",
            "inflação",
            "oferta",
            "procura",
            "economia",
            "poder de compra"
        ],

        /* =================================================
           SEO
           ================================================= */

        seoTitulo:
            "Por que os preços sobem? Entenda os principais fatores",

        seoDescricao:
            "Entenda alguns dos principais fatores que podem influenciar os preços de bens e serviços.",

        /* =================================================
           DESTAQUE
           ================================================= */

        destaque: false,

        /* =================================================
           PUBLICAÇÃO
           ================================================= */

        publicado: true,

        /* =================================================
           URL LEGADA
           ================================================= */

        url: "artigos/por-que-os-precos-sobem.html",

        /* =================================================
           FONTES
           ================================================= */

        fontes: [],

        /* =================================================
           CONTEÚDO EDITORIAL
           ================================================= */

        conteudo: [

            {
                tipo: "introducao",

                texto:
                    "Uma introdução aos diferentes fatores que podem influenciar os preços de bens e serviços."
            }

        ]
    }

];