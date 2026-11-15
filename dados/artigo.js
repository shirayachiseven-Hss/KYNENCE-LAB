/* =========================================================
   KYNENCE LAB
   MOTOR EDITORIAL DE ARTIGOS
   V1.0

   Responsabilidades:

   - Ler o ID do artigo pela URL
   - Localizar o artigo em window.KYNENCE_ARTIGOS
   - Verificar se está publicado
   - Renderizar metadados
   - Renderizar blocos editoriais
   - Renderizar:
       • introducao
       • titulo
       • paragrafo
       • destaque
       • lista
       • citacao
       • tabela
       • imagem
       • conclusao
       • aviso
   - Criar artigos relacionados
   - Tratar erros de forma segura

   Exemplo:

   artigo.html?id=inflacao
   artigo.html?id=precos

   ========================================================= */


/* =========================================================
   1. ELEMENTOS DA PÁGINA
========================================================= */

const articlePage =
    document.getElementById("articlePage");

const articleCategory =
    document.getElementById("articleCategory");

const articleTitle =
    document.getElementById("articleTitle");

const articleSummary =
    document.getElementById("articleSummary");

const articleAuthor =
    document.getElementById("articleAuthor");

const articleDate =
    document.getElementById("articleDate");

const articleReadingTime =
    document.getElementById("articleReadingTime");

const articleUpdated =
    document.getElementById("articleUpdated");

const articleContent =
    document.getElementById("articleContent");

const relatedArticles =
    document.getElementById("relatedArticles");


/* =========================================================
   2. LER ID DO ARTIGO
========================================================= */

const parametrosArtigo =
    new URLSearchParams(
        window.location.search
    );

const artigoId =
    (
        parametrosArtigo.get("id") || ""
    )
    .trim()
    .toLowerCase();


/* =========================================================
   3. OBTENER CATÁLOGO
========================================================= */

function obterCatalogoArtigos() {

    if (
        Array.isArray(
            window.KYNENCE_ARTIGOS
        )
    ) {

        return window.KYNENCE_ARTIGOS;

    }

    return [];

}


/* =========================================================
   4. LOCALIZAR ARTIGO
========================================================= */

function encontrarArtigo() {

    const artigos =
        obterCatalogoArtigos();


    return artigos.find(
        function (artigo) {

            if (!artigo) {

                return false;

            }


            return (
                String(
                    artigo.id || ""
                )
                .trim()
                .toLowerCase() ===
                artigoId
            );

        }
    );

}


/* =========================================================
   5. MOSTRAR ERRO
========================================================= */

function mostrarErroArtigo(
    titulo,
    mensagem
) {

    if (articlePage) {

        articlePage.innerHTML = "";

    }


    const estado =
        document.createElement("section");

    estado.className =
        "article-error";


    const h1 =
        document.createElement("h1");

    h1.textContent =
        titulo;


    const p =
        document.createElement("p");

    p.textContent =
        mensagem;


    const link =
        document.createElement("a");

    link.href =
        "index.html";

    link.className =
        "article-link";

    link.textContent =
        "Voltar para a Home →";


    estado.appendChild(h1);

    estado.appendChild(p);

    estado.appendChild(link);


    if (articlePage) {

        articlePage.appendChild(
            estado
        );

    }


    document.title =
        `${titulo} — KYNENCE LAB`;

}


/* =========================================================
   6. ATUALIZAR METADADOS
========================================================= */

function atualizarMetadados(
    artigo
) {

    document.title =
        artigo.seoTitulo ||
        artigo.titulo ||
        "Artigo — KYNENCE LAB";


    const metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );


    if (
        metaDescription
    ) {

        metaDescription.content =
            artigo.seoDescricao ||
            artigo.resumo ||
            "";

    }


    if (articleCategory) {

        articleCategory.textContent =
            (
                artigo.categoria ||
                "KYNENCE LAB"
            ).toUpperCase();

    }


    if (articleTitle) {

        articleTitle.textContent =
            artigo.titulo ||
            "Artigo sem título";

    }


    if (articleSummary) {

        articleSummary.textContent =
            artigo.resumo ||
            "";

    }


    if (articleAuthor) {

        articleAuthor.textContent =
            artigo.autor ||
            "KYNENCE LAB";

    }


    if (articleDate) {

        articleDate.textContent =
            artigo.data ||
            "";

    }


    if (articleReadingTime) {

        articleReadingTime.textContent =
            artigo.tempoLeitura ||
            artigo.leitura ||
            "";

    }


    if (articleUpdated) {

        if (
            artigo.dataAtualizacao
        ) {

            articleUpdated.textContent =
                `Atualizado em ${artigo.dataAtualizacao}`;

        } else {

            articleUpdated.textContent =
                "";

        }

    }

}


/* =========================================================
   7. CRIAR ELEMENTO DE TEXTO
========================================================= */

function criarParagrafo(
    texto
) {

    const p =
        document.createElement("p");

    p.textContent =
        texto || "";

    return p;

}


/* =========================================================
   8. RENDERIZAR INTRODUÇÃO
========================================================= */

function renderizarIntroducao(
    bloco
) {

    const elemento =
        document.createElement("p");

    elemento.className =
        "article-introduction";

    elemento.textContent =
        bloco.texto || "";

    return elemento;

}


/* =========================================================
   9. RENDERIZAR TÍTULO
========================================================= */

function renderizarTitulo(
    bloco
) {

    const h2 =
        document.createElement("h2");

    h2.textContent =
        bloco.texto || "";

    return h2;

}


/* =========================================================
   10. RENDERIZAR PARÁGRAFO
========================================================= */

function renderizarParagrafo(
    bloco
) {

    return criarParagrafo(
        bloco.texto
    );

}


/* =========================================================
   11. RENDERIZAR DESTAQUE
========================================================= */

function renderizarDestaque(
    bloco
) {

    const div =
        document.createElement("aside");

    div.className =
        "article-highlight";


    if (bloco.titulo) {

        const titulo =
            document.createElement("h3");

        titulo.textContent =
            bloco.titulo;

        div.appendChild(
            titulo
        );

    }


    if (bloco.texto) {

        const texto =
            document.createElement("p");

        texto.textContent =
            bloco.texto;

        div.appendChild(
            texto
        );

    }


    return div;

}


/* =========================================================
   12. RENDERIZAR LISTA
========================================================= */

function renderizarLista(
    bloco
) {

    const lista =
        document.createElement("ul");

    lista.className =
        "article-list";


    if (
        !Array.isArray(
            bloco.itens
        )
    ) {

        return lista;

    }


    bloco.itens.forEach(
        function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item || "";

            lista.appendChild(
                li
            );

        }
    );


    return lista;

}


/* =========================================================
   13. RENDERIZAR CITAÇÃO
========================================================= */

function renderizarCitacao(
    bloco
) {

    const blockquote =
        document.createElement(
            "blockquote"
        );

    blockquote.className =
        "article-quote";


    blockquote.textContent =
        bloco.texto || "";


    return blockquote;

}


/* =========================================================
   14. RENDERIZAR TABELA
========================================================= */

function renderizarTabela(
    bloco
) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "article-table-wrapper";


    const table =
        document.createElement("table");

    table.className =
        "article-table";


    /*
       Cabeçalho
    */

    if (
        Array.isArray(
            bloco.cabecalho
        )
    ) {

        const thead =
            document.createElement("thead");

        const tr =
            document.createElement("tr");


        bloco.cabecalho.forEach(
            function (celula) {

                const th =
                    document.createElement("th");

                th.textContent =
                    celula || "";

                tr.appendChild(
                    th
                );

            }
        );


        thead.appendChild(
            tr
        );

        table.appendChild(
            thead
        );

    }


    /*
       Corpo
    */

    if (
        Array.isArray(
            bloco.linhas
        )
    ) {

        const tbody =
            document.createElement("tbody");


        bloco.linhas.forEach(
            function (linha) {

                if (
                    !Array.isArray(
                        linha
                    )
                ) {

                    return;

                }


                const tr =
                    document.createElement("tr");


                linha.forEach(
                    function (celula) {

                        const td =
                            document.createElement("td");

                        td.textContent =
                            celula || "";

                        tr.appendChild(
                            td
                        );

                    }
                );


                tbody.appendChild(
                    tr
                );

            }
        );


        table.appendChild(
            tbody
        );

    }


    wrapper.appendChild(
        table
    );


    return wrapper;

}


/* =========================================================
   15. RENDERIZAR IMAGEM
========================================================= */

function renderizarImagem(
    bloco
) {

    const figure =
        document.createElement("figure");

    figure.className =
        "article-image";


    if (
        bloco.src
    ) {

        const img =
            document.createElement("img");

        img.src =
            bloco.src;

        img.alt =
            bloco.alt ||
            "";


        img.loading =
            "lazy";


        figure.appendChild(
            img
        );

    }


    if (
        bloco.legenda
    ) {

        const caption =
            document.createElement(
                "figcaption"
            );

        caption.textContent =
            bloco.legenda;


        figure.appendChild(
            caption
        );

    }


    return figure;

}


/* =========================================================
   16. RENDERIZAR CONCLUSÃO
========================================================= */

function renderizarConclusao(
    bloco
) {

    const section =
        document.createElement(
            "section"
        );

    section.className =
        "article-conclusion";


    if (
        bloco.titulo
    ) {

        const h2 =
            document.createElement("h2");

        h2.textContent =
            bloco.titulo;


        section.appendChild(
            h2
        );

    }


    if (
        bloco.texto
    ) {

        const p =
            document.createElement("p");

        p.textContent =
            bloco.texto;


        section.appendChild(
            p
        );

    }


    return section;

}


/* =========================================================
   17. RENDERIZAR AVISO
========================================================= */

function renderizarAviso(
    bloco
) {

    const aside =
        document.createElement("aside");

    aside.className =
        "article-notice";


    if (
        bloco.titulo
    ) {

        const h3 =
            document.createElement("h3");

        h3.textContent =
            bloco.titulo;


        aside.appendChild(
            h3
        );

    }


    if (
        bloco.texto
    ) {

        const p =
            document.createElement("p");

        p.textContent =
            bloco.texto;


        aside.appendChild(
            p
        );

    }


    return aside;

}


/* =========================================================
   18. RENDERIZAR BLOCO
========================================================= */

function renderizarBloco(
    bloco
) {

    if (
        !bloco ||
        !bloco.tipo
    ) {

        return null;

    }


    switch (
        String(
            bloco.tipo
        )
        .trim()
        .toLowerCase()
    ) {

        case "introducao":

            return renderizarIntroducao(
                bloco
            );


        case "titulo":

            return renderizarTitulo(
                bloco
            );


        case "paragrafo":

            return renderizarParagrafo(
                bloco
            );


        case "destaque":

            return renderizarDestaque(
                bloco
            );


        case "lista":

            return renderizarLista(
                bloco
            );


        case "citacao":

            return renderizarCitacao(
                bloco
            );


        case "tabela":

            return renderizarTabela(
                bloco
            );


        case "imagem":

            return renderizarImagem(
                bloco
            );


        case "conclusao":

            return renderizarConclusao(
                bloco
            );


        case "aviso":

            return renderizarAviso(
                bloco
            );


        default:

            console.warn(
                "[KYNENCE] Tipo de bloco desconhecido:",
                bloco.tipo
            );

            return null;

    }

}


/* =========================================================
   19. RENDERIZAR CONTEÚDO
========================================================= */

function renderizarConteudo(
    artigo
) {

    if (!articleContent) {

        console.warn(
            "[KYNENCE] #articleContent não encontrado."
        );

        return;

    }


    articleContent.innerHTML =
        "";


    if (
        !Array.isArray(
            artigo.conteudo
        ) ||
        artigo.conteudo.length === 0
    ) {

        const vazio =
            document.createElement("p");

        vazio.className =
            "article-empty";

        vazio.textContent =
            "O conteúdo deste artigo ainda não está disponível.";

        articleContent.appendChild(
            vazio
        );

        return;

    }


    artigo.conteudo.forEach(
        function (bloco) {

            const elemento =
                renderizarBloco(
                    bloco
                );


            if (elemento) {

                articleContent.appendChild(
                    elemento
                );

            }

        }
    );

}


/* =========================================================
   20. ARTIGOS RELACIONADOS
========================================================= */

function renderizarArtigosRelacionados(
    artigo
) {

    if (!relatedArticles) {

        return;

    }


    relatedArticles.innerHTML =
        "";


    const artigos =
        obterCatalogoArtigos();


    const relacionados =
        artigos
            .filter(
                function (item) {

                    return (
                        item &&
                        item.publicado === true &&
                        item.id !== artigo.id &&
                        item.categoriaSlug ===
                            artigo.categoriaSlug
                    );

                }
            )
            .slice(0, 3);


    if (
        relacionados.length === 0
    ) {

        relatedArticles.style.display =
            "none";

        return;

    }


    relatedArticles.style.display =
        "";


    relacionados.forEach(
        function (item) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "related-card";


            const categoria =
                document.createElement(
                    "span"
                );

            categoria.className =
                "article-category";

            categoria.textContent =
                (
                    item.categoria ||
                    "KYNENCE LAB"
                ).toUpperCase();


            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                item.titulo ||
                "Artigo";


            const resumo =
                document.createElement(
                    "p"
                );

            resumo.textContent =
                item.resumo ||
                "";


            const link =
                document.createElement(
                    "a"
                );

            link.className =
                "article-link";

            link.href =
                `artigo.html?id=${encodeURIComponent(
                    item.id
                )}`;

            link.textContent =
                "Ler artigo →";


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
                link
            );


            relatedArticles.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   21. INICIALIZAR ARTIGO
========================================================= */

function iniciarArtigo() {

    console.log(
        "[KYNENCE] Inicializando artigo..."
    );


    if (
        !articlePage
    ) {

        console.error(
            "[KYNENCE] #articlePage não encontrado."
        );

        return;

    }


    const artigos =
        obterCatalogoArtigos();


    console.log(
        "[KYNENCE] Artigos disponíveis:",
        artigos.length
    );


    if (
        artigos.length === 0
    ) {

        mostrarErroArtigo(
            "Artigo indisponível",
            "O catálogo de artigos não foi carregado."
        );

        return;

    }


    if (!artigoId) {

        mostrarErroArtigo(
            "Artigo não encontrado",
            "Nenhum artigo foi selecionado."
        );

        return;

    }


    console.log(
        "[KYNENCE] ID solicitado:",
        artigoId
    );


    const artigo =
        encontrarArtigo();


    if (!artigo) {

        mostrarErroArtigo(
            "Artigo não encontrado",
            "O artigo que você procura não existe."
        );

        return;

    }


    if (
        artigo.publicado !== true
    ) {

        mostrarErroArtigo(
            "Artigo indisponível",
            "Este artigo ainda não foi publicado."
        );

        return;

    }


    console.log(
        "[KYNENCE] Artigo encontrado:",
        artigo
    );


    atualizarMetadados(
        artigo
    );


    renderizarConteudo(
        artigo
    );


    renderizarArtigosRelacionados(
        artigo
    );


    console.log(
        "[KYNENCE] Artigo inicializado com sucesso."
    );

}


/* =========================================================
   22. INICIALIZAÇÃO ROBUSTA
========================================================= */

function inicializarPaginaArtigo() {

    if (
        window.__KYNENCE_ARTIGO_INICIALIZADO
    ) {

        return;

    }


    window.__KYNENCE_ARTIGO_INICIALIZADO =
        true;


    iniciarArtigo();

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarPaginaArtigo,
        {
            once: true
        }
    );

} else {

    inicializarPaginaArtigo();

}


/* =========================================================
   23. EXPORTAÇÕES
========================================================= */

window.obterCatalogoArtigos =
    obterCatalogoArtigos;

window.encontrarArtigo =
    encontrarArtigo;

window.renderizarConteudo =
    renderizarConteudo;

window.renderizarBloco =
    renderizarBloco;

window.iniciarArtigo =
    iniciarArtigo;


/* =========================================================
   FIM DO MOTOR EDITORIAL
========================================================= */