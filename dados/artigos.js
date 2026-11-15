/* =========================================================
   KYNENCE LAB
   CATÁLOGO DE ARTIGOS
   V2.1 — ESTRUTURA EDITORIAL CORRIGIDA

   Sistema:
   window.KYNENCE_ARTIGOS

   ESTRUTURA:

   - Identificação
   - Resumo
   - Categoria
   - Autoria
   - Datas
   - Leitura
   - Imagem
   - Tags
   - SEO
   - Destaque
   - Publicação
   - URL
   - Conteúdo editorial
   - Fontes

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

            {
                tipo: "introducao",

                texto:
                    "A inflação é um dos conceitos mais importantes para compreender a economia e a vida financeira. Ela está relacionada à evolução dos preços de bens e serviços ao longo do tempo e pode influenciar quanto conseguimos comprar com o nosso dinheiro."
            },


            {
                tipo: "titulo",

                texto: "O que é inflação?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "De forma simples, inflação é um aumento generalizado dos preços de bens e serviços durante determinado período. Quando os preços aumentam de forma persistente, a mesma quantidade de dinheiro pode deixar de comprar a mesma quantidade de produtos e serviços."
            },


            {
                tipo: "destaque",

                titulo: "Em poucas palavras",

                texto:
                    "Inflação significa que, em geral, os preços estão aumentando. Quando isso acontece, o poder de compra do dinheiro pode diminuir."
            },


            {
                tipo: "titulo",

                texto: "Como a inflação funciona?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "A inflação não significa necessariamente que todos os preços aumentam ao mesmo tempo ou na mesma proporção. Alguns produtos podem ficar mais caros, outros podem permanecer estáveis e alguns podem até ficar mais baratos."
            },


            {
                tipo: "paragrafo",

                texto:
                    "Por isso, quando se fala em inflação, normalmente estamos interessados no comportamento geral dos preços de uma economia, medido por indicadores construídos a partir de conjuntos de bens e serviços."
            },


            {
                tipo: "titulo",

                texto: "Por que os preços podem subir?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Existem diferentes fatores que podem contribuir para o aumento dos preços. Entre eles estão alterações na procura por produtos e serviços, mudanças nos custos de produção, variações nos preços de matérias-primas e outros acontecimentos que afetam a economia."
            },


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


            {
                tipo: "titulo",

                texto: "Como a inflação afeta o poder de compra?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Imagine que uma determinada quantia de dinheiro seja suficiente para comprar vários produtos hoje. Se os preços desses produtos aumentarem e a quantia disponível continuar igual, será possível comprar uma quantidade menor com o mesmo dinheiro."
            },


            {
                tipo: "destaque",

                titulo: "Exemplo simples",

                texto:
                    "Se um conjunto de produtos custa 10.000 Kz e, algum tempo depois, passa a custar 11.000 Kz, serão necessários mais 1.000 Kz para comprar exatamente o mesmo conjunto de produtos."
            },


            {
                tipo: "titulo",

                texto: "Inflação não significa que tudo fica mais caro"
            },


            {
                tipo: "paragrafo",

                texto:
                    "É importante distinguir o aumento do preço de um produto específico da inflação. Um único produto pode ficar mais caro por razões próprias, enquanto a inflação procura representar uma evolução mais ampla dos preços na economia."
            },


            {
                tipo: "citacao",

                texto:
                    "O comportamento dos preços deve ser analisado de forma ampla, e não apenas observando um único produto."
            },


            {
                tipo: "titulo",

                texto: "Por que compreender a inflação é importante?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Compreender a inflação ajuda a interpretar mudanças nos preços, no poder de compra e nas decisões financeiras. Também ajuda a compreender notícias económicas e indicadores que aparecem no dia a dia."
            },


            {
                tipo: "conclusao",

                titulo: "Conclusão",

                texto:
                    "A inflação é um fenómeno económico relacionado com a evolução geral dos preços ao longo do tempo. Entender o seu funcionamento é um passo importante para compreender a economia e tomar decisões financeiras com maior conhecimento."
            },


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
           CONTEÚDO EDITORIAL
        ================================================= */

        conteudo: [],


        /* =================================================
           FONTES
        ================================================= */

        fontes: []

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
            "Entenda alguns dos principais fatores que podem influenciar os preços de bens e serviços.",


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
           URL
        ================================================= */

        url: "artigos/por-que-os-precos-sobem.html",


        /* =================================================
           CONTEÚDO EDITORIAL
        ================================================= */

        conteudo: [

            {
                tipo: "introducao",

                texto:
                    "Os preços fazem parte da nossa vida diária. Quando vamos comprar alimentos, roupas, transporte ou outros serviços, percebemos que os valores podem mudar ao longo do tempo. Mas por que isso acontece?"
            },


            {
                tipo: "titulo",

                texto: "Por que os preços mudam?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Os preços podem mudar por diferentes razões. Entre os principais fatores estão a relação entre oferta e procura, os custos de produção, a disponibilidade dos produtos e as condições gerais da economia."
            },


            {
                tipo: "destaque",

                titulo: "Em poucas palavras",

                texto:
                    "O preço de um produto não é determinado por um único fator. Ele pode ser influenciado pelas condições de produção, pela quantidade disponível e pelo interesse dos consumidores."
            },


            {
                tipo: "titulo",

                texto: "O papel da oferta e da procura"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Oferta representa a quantidade de um produto ou serviço que os vendedores estão dispostos a disponibilizar. Procura representa o interesse dos consumidores em adquirir esse produto ou serviço."
            },


            {
                tipo: "paragrafo",

                texto:
                    "Quando a procura aumenta e a oferta não acompanha esse aumento, pode existir pressão para que os preços subam. Da mesma forma, quando existe muita oferta e pouca procura, os preços podem sofrer pressão para baixar."
            },


            {
                tipo: "lista",

                itens: [
                    "Maior procura pode aumentar a pressão sobre os preços.",
                    "Menor procura pode reduzir essa pressão.",
                    "Uma oferta limitada pode contribuir para preços mais elevados.",
                    "Uma oferta maior pode aumentar a concorrência entre vendedores."
                ]
            },


            {
                tipo: "titulo",

                texto: "Os custos de produção também importam"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Para produzir e vender um produto, uma empresa pode ter custos relacionados com matérias-primas, energia, transporte, equipamentos, trabalhadores e outros recursos."
            },


            {
                tipo: "paragrafo",

                texto:
                    "Quando determinados custos aumentam, as empresas podem enfrentar maiores despesas para produzir ou disponibilizar os seus produtos. Dependendo das condições do mercado, parte desses custos pode ser refletida nos preços cobrados aos consumidores."
            },


            {
                tipo: "destaque",

                titulo: "Exemplo simples",

                texto:
                    "Imagine uma loja que compra determinado produto por 5.000 Kz. Se os custos necessários para obter esse produto aumentarem, a loja poderá precisar reajustar o preço de venda para continuar a cobrir os seus custos."
            },


            {
                tipo: "titulo",

                texto: "A disponibilidade dos produtos"
            },


            {
                tipo: "paragrafo",

                texto:
                    "A quantidade disponível de determinado produto também pode influenciar o seu preço. Se um produto se tornar mais difícil de encontrar enquanto muitas pessoas continuam interessadas em comprá-lo, pode surgir pressão sobre o seu preço."
            },


            {
                tipo: "paragrafo",

                texto:
                    "Por outro lado, quando existe uma grande quantidade disponível e a procura é menor, os vendedores podem ter mais dificuldade para vender tudo pelo mesmo preço."
            },


            {
                tipo: "titulo",

                texto: "E onde entra a inflação?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Um aumento no preço de um produto específico não significa automaticamente que exista inflação. A inflação está relacionada com uma evolução mais ampla dos preços na economia."
            },


            {
                tipo: "citacao",

                texto:
                    "Observar o preço de um único produto não é suficiente para compreender o comportamento geral dos preços de uma economia."
            },


            {
                tipo: "titulo",

                texto: "Um exemplo do dia a dia"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Imagine que uma determinada região tenha uma oferta menor de um produto durante algum período, enquanto o interesse dos consumidores permanece elevado. Os vendedores podem enfrentar uma situação em que muitas pessoas procuram um produto que está disponível em menor quantidade."
            },


            {
                tipo: "paragrafo",

                texto:
                    "Esse tipo de situação pode ajudar a explicar por que determinados produtos ficam temporariamente mais caros, sem que isso signifique necessariamente que todos os preços da economia estejam aumentando."
            },


            {
                tipo: "titulo",

                texto: "Por que isso é importante?"
            },


            {
                tipo: "paragrafo",

                texto:
                    "Compreender os fatores que influenciam os preços ajuda-nos a interpretar melhor as mudanças que observamos no mercado. Também permite distinguir situações específicas de mudanças mais amplas na economia."
            },


            {
                tipo: "conclusao",

                titulo: "Conclusão",

                texto:
                    "Os preços podem subir ou baixar por diferentes razões. Oferta, procura, custos de produção e disponibilidade dos produtos são alguns dos fatores que ajudam a explicar essas mudanças. Para compreender a inflação, porém, é necessário observar o comportamento geral dos preços, e não apenas um produto isolado."
            },


            {
                tipo: "aviso",

                titulo: "Nota editorial",

                texto:
                    "Este artigo tem finalidade educativa e apresenta uma explicação introdutória sobre os fatores que podem influenciar os preços. Situações reais podem envolver vários fatores económicos ao mesmo tempo."
            }

        ],


        /* =================================================
           FONTES
        ================================================= */

        fontes: []

    }

];


/* =========================================================
   FIM DO CATÁLOGO
========================================================= */