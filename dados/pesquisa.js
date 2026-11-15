/* =========================================================
   KYNENCE LAB
   SISTEMA DE PESQUISA
   V2.1 — Pesquisa + Navegação corrigida

   Arquitetura atual:

   /index.html
   /artigo.html?id=inflacao
   /pesquisa.html?q=inflacao
   /categorias/categoria.html?categoria=economia

   Responsabilidades:

   - Ler ?q= da URL
   - Pesquisar artigos publicados
   - Pesquisar por título
   - Pesquisar por resumo
   - Pesquisar por categoria
   - Pesquisar por categoriaSlug
   - Pesquisar por tags
   - Pesquisar por SEO
   - Normalizar acentos
   - Calcular relevância
   - Ordenar resultados
   - Criar cartões
   - Criar links corretos para artigo.html
   - Atualizar URL sem recarregar
   - Mostrar estados vazios
   - Mostrar erros
   - Inicialização robusta

   ========================================================= */


/* =========================================================
   1. ELEMENTOS DA PÁGINA
========================================================= */

const searchForm =
    document.getElementById(
        "searchForm"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


const searchInfo =
    document.getElementById(
        "searchInfo"
    );


/* =========================================================
   2. INICIALIZAÇÃO
========================================================= */

function inicializarPesquisa() {

    /*
       Evitar inicialização duplicada.
    */

    if (
        window.__KYNENCE_PESQUISA_INICIALIZADA
    ) {

        return;

    }


    window.__KYNENCE_PESQUISA_INICIALIZADA =
        true;


    console.log(
        "[KYNENCE] Inicializando pesquisa..."
    );


    iniciarPesquisa();


    console.log(
        "[KYNENCE] Pesquisa inicializada com sucesso."
    );

}


/*
   DOM ainda carregando.
*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarPesquisa,
        {
            once: true
        }
    );

} else {

    inicializarPesquisa();

}


/* =========================================================
   3. INICIAR PESQUISA
========================================================= */

function iniciarPesquisa() {

    /*
       Verificar elementos essenciais.
    */

    if (
        !searchForm ||
        !searchInput ||
        !searchResults
    ) {

        console.warn(
            "[KYNENCE] Elementos da pesquisa não encontrados."
        );

        return;

    }


    /*
       Verificar catálogo de artigos.
    */

    if (
        !Array.isArray(
            window.KYNENCE_ARTIGOS
        )
    ) {

        mostrarErroPesquisa(
            "O catálogo de artigos não foi carregado."
        );

        return;

    }


    console.log(
        "[KYNENCE] Total de artigos disponíveis:",
        window.KYNENCE_ARTIGOS.length
    );


    /* =====================================================
       LER ?q= DA URL
    ===================================================== */

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const consultaInicial =
        (
            parametros.get("q") || ""
        ).trim();


    /*
       Se existir pesquisa na URL,
       executar automaticamente.
    */

    if (consultaInicial) {

        searchInput.value =
            consultaInicial;


        executarPesquisa(
            consultaInicial
        );

    } else {

        mostrarMensagemInicial();

    }


    /* =====================================================
       FORMULÁRIO
    ===================================================== */

    searchForm.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const consulta =
                searchInput.value.trim();


            executarPesquisa(
                consulta
            );


            atualizarURL(
                consulta
            );

        }
    );

}


/* =========================================================
   4. ATUALIZAR URL
========================================================= */

function atualizarURL(
    consulta
) {

    const url =
        new URL(
            window.location.href
        );


    /*
       Remover pesquisa anterior.
    */

    url.searchParams.delete(
        "q"
    );


    /*
       Adicionar somente se existir
       uma consulta.
    */

    if (consulta) {

        url.searchParams.set(
            "q",
            consulta
        );

    }


    /*
       Alterar a URL sem recarregar.
    */

    window.history.replaceState(
        {},
        "",
        url
    );


    console.log(
        "[KYNENCE] URL atualizada:",
        url.href
    );

}


/* =========================================================
   5. EXECUTAR PESQUISA
========================================================= */

function executarPesquisa(
    consulta
) {

    const termo =
        normalizarTexto(
            consulta
        );


    /*
       Limpar resultados anteriores.
    */

    searchResults.innerHTML =
        "";


    /*
       Pesquisa vazia.
    */

    if (!termo) {

        mostrarMensagemInicial();

        atualizarInformacaoResultados(
            null
        );

        return;

    }


    /*
       Obter catálogo.
    */

    const artigos =
        Array.isArray(
            window.KYNENCE_ARTIGOS
        )
            ? window.KYNENCE_ARTIGOS
            : [];


    /* =====================================================
       CALCULAR RESULTADOS
    ===================================================== */

    const resultados =
        artigos

            /*
               Somente artigos publicados.
            */

            .filter(
                function (artigo) {

                    return (
                        artigo &&
                        artigo.publicado === true
                    );

                }
            )

            /*
               Calcular relevância.
            */

            .map(
                function (artigo) {

                    return {

                        artigo:
                            artigo,

                        pontuacao:
                            calcularPontuacao(
                                artigo,
                                termo
                            )

                    };

                }
            )

            /*
               Remover artigos sem
               correspondência.
            */

            .filter(
                function (resultado) {

                    return (
                        resultado.pontuacao > 0
                    );

                }
            );


    /* =====================================================
       ORDENAR RESULTADOS
    ===================================================== */

    resultados.sort(
        function (a, b) {

            /*
               Primeiro:
               maior relevância.
            */

            if (
                b.pontuacao !==
                a.pontuacao
            ) {

                return (
                    b.pontuacao -
                    a.pontuacao
                );

            }


            /*
               Em caso de empate:
               artigo mais recente.
            */

            return (
                obterDataNumerica(
                    b.artigo
                ) -
                obterDataNumerica(
                    a.artigo
                )
            );

        }
    );


    console.log(
        "[KYNENCE] Pesquisa:",
        consulta
    );


    console.log(
        "[KYNENCE] Resultados:",
        resultados.length
    );


    /* =====================================================
       ATUALIZAR INFORMAÇÃO
    ===================================================== */

    atualizarInformacaoResultados(
        resultados.length
    );


    /* =====================================================
       NENHUM RESULTADO
    ===================================================== */

    if (
        resultados.length === 0
    ) {

        mostrarNenhumResultado(
            consulta
        );

        return;

    }


    /* =====================================================
       CRIAR CARTÕES
    ===================================================== */

    resultados.forEach(
        function (resultado) {

            const card =
                criarCartaoResultado(
                    resultado.artigo
                );


            searchResults.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   6. CALCULAR RELEVÂNCIA
========================================================= */

function calcularPontuacao(
    artigo,
    termo
) {

    let pontuacao = 0;


    /* =====================================================
       CAMPOS
    ===================================================== */

    const titulo =
        normalizarTexto(
            artigo.titulo
        );


    const resumo =
        normalizarTexto(
            artigo.resumo
        );


    const categoria =
        normalizarTexto(
            artigo.categoria
        );


    const categoriaSlug =
        normalizarTexto(
            artigo.categoriaSlug
        );


    const seoTitulo =
        normalizarTexto(
            artigo.seoTitulo
        );


    const seoDescricao =
        normalizarTexto(
            artigo.seoDescricao
        );


    /* =====================================================
       TAGS
    ===================================================== */

    const tags =
        Array.isArray(
            artigo.tags
        )
            ? artigo.tags.map(
                  function (tag) {

                      return normalizarTexto(
                          tag
                      );

                  }
              )
            : [];


    /* =====================================================
       TÍTULO
    ===================================================== */

    if (
        titulo.includes(termo)
    ) {

        pontuacao += 10;

    }


    /*
       Começo do título.
    */

    if (
        titulo.startsWith(termo)
    ) {

        pontuacao += 5;

    }


    /*
       Correspondência exata.
    */

    if (
        titulo === termo
    ) {

        pontuacao += 5;

    }


    /* =====================================================
       RESUMO
    ===================================================== */

    if (
        resumo.includes(termo)
    ) {

        pontuacao += 5;

    }


    /* =====================================================
       CATEGORIA
    ===================================================== */

    if (
        categoria.includes(termo)
    ) {

        pontuacao += 3;

    }


    /* =====================================================
       SLUG DA CATEGORIA
    ===================================================== */

    if (
        categoriaSlug.includes(termo)
    ) {

        pontuacao += 2;

    }


    /* =====================================================
       TAGS
    ===================================================== */

    tags.forEach(
        function (tag) {

            if (
                tag.includes(termo)
            ) {

                pontuacao += 4;

            }

        }
    );


    /* =====================================================
       SEO TITLE
    ===================================================== */

    if (
        seoTitulo.includes(termo)
    ) {

        pontuacao += 2;

    }


    /* =====================================================
       SEO DESCRIPTION
    ===================================================== */

    if (
        seoDescricao.includes(termo)
    ) {

        pontuacao += 1;

    }


    return pontuacao;

}


/* =========================================================
   7. OBTER DATA NUMÉRICA
========================================================= */

function obterDataNumerica(
    artigo
) {

    if (
        !artigo ||
        !artigo.dataISO
    ) {

        return 0;

    }


    const data =
        new Date(
            artigo.dataISO
        );


    const tempo =
        data.getTime();


    return Number.isNaN(
        tempo
    )
        ? 0
        : tempo;

}


/* =========================================================
   8. CRIAR CARTÃO DE RESULTADO
========================================================= */

function criarCartaoResultado(
    artigo
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "article-card";


    /* =====================================================
       CATEGORIA
    ===================================================== */

    const categoria =
        document.createElement(
            "span"
        );


    categoria.className =
        "article-category";


    categoria.textContent =
        (
            artigo.categoria ||
            "KYNENCE LAB"
        ).toUpperCase();


    /* =====================================================
       TÍTULO
    ===================================================== */

    const titulo =
        document.createElement(
            "h3"
        );


    titulo.textContent =
        artigo.titulo ||
        "Artigo sem título";


    /* =====================================================
       RESUMO
    ===================================================== */

    const resumo =
        document.createElement(
            "p"
        );


    resumo.textContent =
        artigo.resumo ||
        "";


    /* =====================================================
       METADADOS
    ===================================================== */

    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "article-card-meta";


    const data =
        artigo.data ||
        "";


    const leitura =
        artigo.leitura ||
        "";


    if (
        data &&
        leitura
    ) {

        meta.textContent =
            `${data} • ${leitura}`;

    } else {

        meta.textContent =
            data ||
            leitura;

    }


    /* =====================================================
       LINK DO ARTIGO
    ===================================================== */

    const link =
        document.createElement(
            "a"
        );


    link.className =
        "article-link";


    link.href =
        construirUrlArtigoPesquisa(
            artigo
        );


    link.textContent =
        "Ler artigo →";


    link.setAttribute(
        "aria-label",
        `Ler artigo: ${
            artigo.titulo ||
            "Artigo"
        }`
    );


    console.log(
        "[KYNENCE] Link de pesquisa:",
        link.href
    );


    /* =====================================================
       MONTAR CARTÃO
    ===================================================== */

    card.appendChild(
        categoria
    );


    card.appendChild(
        titulo
    );


    card.appendChild(
        resumo
    );


    card.appendChild(
        meta
    );


    card.appendChild(
        link
    );


    return card;

}


/* =========================================================
   9. CONSTRUIR URL DO ARTIGO
========================================================= */

/*
   IMPORTANTE:

   A arquitetura atual NÃO possui:

   /artigos/

   O sistema utiliza:

   /artigo.html?id=inflacao

   Portanto, esta função nunca deve gerar:

   artigos/inflacao.html

   nem:

   artigos/o-que-e-inflacao.html
*/

function construirUrlArtigoPesquisa(
    artigo
) {

    if (
        !artigo ||
        !artigo.id
    ) {

        return "#";

    }


    const id =
        encodeURIComponent(
            String(
                artigo.id
            )
        );


    /*
       pesquisa.html está na raiz.

       artigo.html também está na raiz.

       Portanto:
    */

    return (
        `artigo.html?id=${id}`
    );

}


/* =========================================================
   10. NORMALIZAR TEXTO
========================================================= */

function normalizarTexto(
    texto
) {

    return String(
        texto || ""
    )
        .toLowerCase()
        .normalize(
            "NFD"
        )
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim();

}


/* =========================================================
   11. ATUALIZAR INFORMAÇÃO DOS RESULTADOS
========================================================= */

function atualizarInformacaoResultados(
    quantidade
) {

    if (!searchInfo) {

        return;

    }


    /*
       Estado inicial.
    */

    if (
        quantidade === null
    ) {

        searchInfo.textContent =
            "Pesquise por um tema para começar.";

        return;

    }


    /*
       Nenhum.
    */

    if (
        quantidade === 0
    ) {

        searchInfo.textContent =
            "Nenhum artigo encontrado.";

        return;

    }


    /*
       Um.
    */

    if (
        quantidade === 1
    ) {

        searchInfo.textContent =
            "1 artigo encontrado.";

        return;

    }


    /*
       Vários.
    */

    searchInfo.textContent =
        `${quantidade} artigos encontrados.`;

}


/* =========================================================
   12. MENSAGEM INICIAL
========================================================= */

function mostrarMensagemInicial() {

    if (searchInfo) {

        searchInfo.textContent =
            "Pesquise por um tema para começar.";

    }


    if (searchResults) {

        searchResults.innerHTML =
            "";

    }

}


/* =========================================================
   13. NENHUM RESULTADO
========================================================= */

function mostrarNenhumResultado(
    consulta
) {

    if (!searchResults) {

        return;

    }


    searchResults.innerHTML =
        "";


    const estado =
        document.createElement(
            "div"
        );


    estado.className =
        "empty-state";


    const titulo =
        document.createElement(
            "h3"
        );


    titulo.textContent =
        "Nenhum artigo encontrado.";


    const descricao =
        document.createElement(
            "p"
        );


    descricao.textContent =
        `Não encontramos artigos para "${consulta}".`;


    const sugestao =
        document.createElement(
            "p"
        );


    sugestao.textContent =
        "Tente usar outra palavra ou pesquisar por um tema diferente.";


    estado.appendChild(
        titulo
    );


    estado.appendChild(
        descricao
    );


    estado.appendChild(
        sugestao
    );


    searchResults.appendChild(
        estado
    );

}


/* =========================================================
   14. MOSTRAR ERRO
========================================================= */

function mostrarErroPesquisa(
    mensagem
) {

    console.error(
        "[KYNENCE] Erro de pesquisa:",
        mensagem
    );


    if (searchInfo) {

        searchInfo.textContent =
            mensagem;

    }


    if (!searchResults) {

        return;

    }


    searchResults.innerHTML =
        "";


    const estado =
        document.createElement(
            "div"
        );


    estado.className =
        "empty-state";


    const titulo =
        document.createElement(
            "h3"
        );


    titulo.textContent =
        "Não foi possível pesquisar.";


    const descricao =
        document.createElement(
            "p"
        );


    descricao.textContent =
        mensagem;


    estado.appendChild(
        titulo
    );


    estado.appendChild(
        descricao
    );


    searchResults.appendChild(
        estado
    );

}


/* =========================================================
   15. EXPORTAÇÕES
========================================================= */

window.iniciarPesquisa =
    iniciarPesquisa;


window.executarPesquisa =
    executarPesquisa;


window.normalizarTexto =
    normalizarTexto;


window.construirUrlArtigoPesquisa =
    construirUrlArtigoPesquisa;


window.calcularPontuacao =
    calcularPontuacao;


/* =========================================================
   FIM DO SISTEMA DE PESQUISA V2.1
========================================================= */