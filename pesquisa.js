/* =========================================================
   KYNENCE LAB
   SISTEMA DE PESQUISA
   V2.0

   Responsabilidades:

   - Ler ?q= da URL
   - Pesquisar no catálogo KYNENCE_ARTIGOS
   - Pesquisar por:
       • título
       • resumo
       • categoria
       • categoriaSlug
       • tags
       • SEO
   - Ignorar artigos não publicados
   - Normalizar acentos
   - Ordenar resultados
   - Mostrar quantidade de resultados
   - Criar cartões de resultados
   - Criar links corretos para os artigos
   - Atualizar a URL sem recarregar
   - Mostrar estados vazios e erros

   Exemplo:

   pesquisa.html?q=inflacao

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarPesquisa();

    }
);


/* =========================================================
   3. INICIAR PESQUISA
========================================================= */

function iniciarPesquisa() {

    /*
       Verificar elementos.
    */

    if (
        !searchForm ||
        !searchInput ||
        !searchResults
    ) {

        return;

    }


    /*
       Verificar catálogo.
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


    /*
       Ler ?q= da URL.

       URLSearchParams é utilizado
       para interpretar a query string.
    */

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const consultaInicial =
        (
            parametros.get("q") || ""
        ).trim();


    /*
       Se houver pesquisa na URL,
       preencher e executar.
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


    /*
       Formulário.
    */

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

    /*
       Criar URL com base na página atual.
    */

    const url =
        new URL(
            window.location.href
        );


    /*
       Limpar q.
    */

    url.searchParams.delete(
        "q"
    );


    /*
       Adicionar q somente
       quando houver pesquisa.
    */

    if (consulta) {

        url.searchParams.set(
            "q",
            consulta
        );

    }


    /*
       Atualizar endereço sem recarregar
       a página.
    */

    window.history.replaceState(
        {},
        "",
        url
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


    /*
       Pesquisar somente
       artigos publicados.
    */

    const resultados =
        artigos
            .filter(
                function (artigo) {

                    return (
                        artigo &&
                        artigo.publicado === true
                    );

                }
            )
            .map(
                function (artigo) {

                    return {

                        artigo: artigo,

                        pontuacao:
                            calcularPontuacao(
                                artigo,
                                termo
                            )

                    };

                }
            )
            .filter(
                function (resultado) {

                    return (
                        resultado.pontuacao > 0
                    );

                }
            );


    /*
       Ordenar pela relevância.

       Em caso de empate,
       usar a data.
    */

    resultados.sort(
        function (a, b) {

            if (
                b.pontuacao !==
                a.pontuacao
            ) {

                return (
                    b.pontuacao -
                    a.pontuacao
                );

            }


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


    /*
       Atualizar informação.
    */

    atualizarInformacaoResultados(
        resultados.length
    );


    /*
       Nenhum resultado.
    */

    if (
        resultados.length === 0
    ) {

        mostrarNenhumResultado(
            consulta
        );

        return;

    }


    /*
       Criar cartões.
    */

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


    /*
       Texto individual dos campos.
    */

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

    const tags =
        Array.isArray(
            artigo.tags
        )
            ? artigo.tags.map(
                  normalizarTexto
              )
            : [];


    const seoTitulo =
        normalizarTexto(
            artigo.seoTitulo
        );

    const seoDescricao =
        normalizarTexto(
            artigo.seoDescricao
        );


    /*
       Título:
       maior peso.
    */

    if (
        titulo.includes(termo)
    ) {

        pontuacao += 10;

    }


    /*
       Correspondência exata
       no início do título.
    */

    if (
        titulo.startsWith(termo)
    ) {

        pontuacao += 5;

    }


    /*
       Resumo.
    */

    if (
        resumo.includes(termo)
    ) {

        pontuacao += 5;

    }


    /*
       Categoria.
    */

    if (
        categoria.includes(termo)
    ) {

        pontuacao += 3;

    }


    /*
       Slug da categoria.
    */

    if (
        categoriaSlug.includes(termo)
    ) {

        pontuacao += 2;

    }


    /*
       Tags.
    */

    tags.forEach(
        function (tag) {

            if (
                tag.includes(termo)
            ) {

                pontuacao += 4;

            }

        }
    );


    /*
       SEO.
    */

    if (
        seoTitulo.includes(termo)
    ) {

        pontuacao += 2;

    }


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


    /*
       Categoria.
    */

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


    /*
       Título.
    */

    const titulo =
        document.createElement(
            "h3"
        );

    titulo.textContent =
        artigo.titulo ||
        "Artigo sem título";


    /*
       Resumo.
    */

    const resumo =
        document.createElement(
            "p"
        );

    resumo.textContent =
        artigo.resumo ||
        "";


    /*
       Metadados.
    */

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


    /*
       Link.
    */

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


    /*
       Montar cartão.
    */

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

function construirUrlArtigoPesquisa(
    artigo
) {

    if (
        !artigo
    ) {

        return "#";

    }


    let caminho =
        artigo.url || "";


    /*
       Fallback caso o artigo
       não possua URL.
    */

    if (!caminho) {

        const slug =
            artigo.slug ||
            artigo.id ||
            "";

        caminho =
            `artigos/${slug}.html`;

    }


    /*
       Remover ./ e /
       do início.
    */

    caminho =
        caminho
            .replace(
                /^\.\/+/,
                ""
            )
            .replace(
                /^\/+/,
                ""
            );


    /*
       Garantir pasta artigos.
    */

    if (
        !caminho.startsWith(
            "artigos/"
        )
    ) {

        caminho =
            `artigos/${caminho}`;

    }


    /*
       Criar URL.
    */

    const separador =
        caminho.includes("?")
            ? "&"
            : "?";


    return (
        `${caminho}` +
        `${separador}id=` +
        encodeURIComponent(
            artigo.id || ""
        )
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
   11. ATUALIZAR INFORMAÇÃO
========================================================= */

function atualizarInformacaoResultados(
    quantidade
) {

    if (!searchInfo) {

        return;

    }


    if (
        quantidade === 0
    ) {

        searchInfo.textContent =
            "Nenhum artigo encontrado.";

        return;

    }


    if (
        quantidade === 1
    ) {

        searchInfo.textContent =
            "1 artigo encontrado.";

        return;

    }


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
   FIM DO SISTEMA DE PESQUISA V2.0
========================================================= */