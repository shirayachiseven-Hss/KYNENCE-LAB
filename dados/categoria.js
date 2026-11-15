/* =========================================================
   KYNENCE LAB
   SISTEMA DE CATEGORIAS
   V2.2 — Navegação robusta para artigos

   Estrutura:

   /index.html
   /artigo.html?id=inflacao
   /categorias/categoria.html?categoria=economia

   ========================================================= */


/* =========================================================
   1. LER A CATEGORIA DA URL
========================================================= */

const parametrosCategoria =
    new URLSearchParams(window.location.search);

const categoriaSlug =
    (
        parametrosCategoria.get("categoria") || ""
    )
    .trim()
    .toLowerCase();


/* =========================================================
   2. ELEMENTOS DA PÁGINA
========================================================= */

const categoryTitle =
    document.getElementById("categoryTitle");

const categoryLabel =
    document.getElementById("categoryLabel");

const categoryDescription =
    document.getElementById("categoryDescription");

const categoryArticles =
    document.getElementById("categoryArticles");

const categoryMetaDescription =
    document.getElementById("categoryMetaDescription");


/* =========================================================
   3. OBTER CATÁLOGO DE CATEGORIAS
========================================================= */

function obterCategorias() {

    if (
        Array.isArray(
            window.KYNENCE_CATEGORIAS
        )
    ) {

        return window.KYNENCE_CATEGORIAS;

    }


    if (
        Array.isArray(
            window.categorias
        )
    ) {

        return window.categorias;

    }


    return [];

}


/* =========================================================
   4. OBTER CATÁLOGO DE ARTIGOS
========================================================= */

function obterArtigos() {

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
   5. CONSTRUIR URL DO ARTIGO
========================================================= */

/*
   IMPORTANTE:

   categoria.html está dentro de:

   /categorias/

   enquanto artigo.html está na raiz:

   /artigo.html

   Portanto:

   categorias/categoria.html
          ↓
       ../artigo.html
          ↓
   artigo.html?id=inflacao
*/

function construirUrlArtigoCategoria(artigo) {

    if (
        !artigo ||
        !artigo.id
    ) {

        return "#";

    }


    const id =
        encodeURIComponent(
            String(artigo.id)
        );


    return `../artigo.html?id=${id}`;

}


/* =========================================================
   6. NAVEGAR PARA O ARTIGO
========================================================= */

function abrirArtigoDaCategoria(artigo) {

    const url =
        construirUrlArtigoCategoria(
            artigo
        );


    if (
        !url ||
        url === "#"
    ) {

        console.warn(
            "[KYNENCE] Não foi possível construir o link do artigo."
        );

        return;

    }


    console.log(
        "[KYNENCE] Abrindo artigo:",
        url
    );


    /*
       Navegação normal.
    */

    window.location.href =
        url;

}


/* =========================================================
   7. MOSTRAR ESTADO VAZIO
========================================================= */

function mostrarEstadoVazio() {

    if (!categoryArticles) {

        return;

    }


    categoryArticles.innerHTML = "";


    const estado =
        document.createElement("div");

    estado.className =
        "empty-state";


    const titulo =
        document.createElement("h3");

    titulo.textContent =
        "Ainda não existem artigos nesta categoria.";


    const descricao =
        document.createElement("p");

    descricao.textContent =
        "A KYNENCE LAB está preparando novos conteúdos.";


    estado.appendChild(titulo);

    estado.appendChild(descricao);


    categoryArticles.appendChild(
        estado
    );

}


/* =========================================================
   8. CRIAR CARTÃO DE ARTIGO
========================================================= */

function criarCartaoArtigo(artigo) {

    const card =
        document.createElement("article");

    card.className =
        "article-card";


    /* =====================================================
       CATEGORIA
    ===================================================== */

    const categoria =
        document.createElement("span");

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
        document.createElement("h3");

    titulo.textContent =
        artigo.titulo ||
        "Artigo sem título";


    /* =====================================================
       RESUMO
    ===================================================== */

    const resumo =
        document.createElement("p");

    resumo.textContent =
        artigo.resumo ||
        "";


    /* =====================================================
       METADADOS
    ===================================================== */

    const meta =
        document.createElement("div");

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
        document.createElement("a");

    link.className =
        "article-link";


    const urlArtigo =
        construirUrlArtigoCategoria(
            artigo
        );


    link.href =
        urlArtigo;


    link.textContent =
        "Ler artigo →";


    /*
       Acessibilidade.
    */

    link.setAttribute(
        "aria-label",
        `Ler artigo: ${artigo.titulo || "Artigo"}`
    );


    /*
       Fallback de navegação.

       Se algum comportamento externo impedir
       a navegação normal do link, usamos
       window.location.href.
    */

    link.addEventListener(
        "click",
        function (evento) {

            /*
               Não impedir o comportamento normal
               do navegador.

               Apenas registamos a navegação.
            */

            console.log(
                "[KYNENCE] Clique no artigo:",
                urlArtigo
            );

        }
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
   9. CARREGAR ARTIGOS DA CATEGORIA
========================================================= */

function carregarArtigosDaCategoria() {

    if (!categoryArticles) {

        console.warn(
            "[KYNENCE] #categoryArticles não encontrado."
        );

        return;

    }


    const artigos =
        obterArtigos();


    console.log(
        "[KYNENCE] Total de artigos:",
        artigos.length
    );


    /* =====================================================
       FILTRAR ARTIGOS
    ===================================================== */

    const artigosDaCategoria =
        artigos.filter(
            function (artigo) {

                if (!artigo) {

                    return false;

                }


                /*
                   Somente artigos publicados.
                */

                if (
                    artigo.publicado !== true
                ) {

                    return false;

                }


                /*
                   Categoria correspondente.
                */

                return (
                    String(
                        artigo.categoriaSlug || ""
                    )
                    .trim()
                    .toLowerCase() ===
                    categoriaSlug
                );

            }
        );


    /* =====================================================
       ORDENAR
    ===================================================== */

    artigosDaCategoria.sort(
        function (a, b) {

            const dataA =
                a.dataISO
                    ? new Date(a.dataISO)
                    : new Date(0);


            const dataB =
                b.dataISO
                    ? new Date(b.dataISO)
                    : new Date(0);


            return dataB - dataA;

        }
    );


    console.log(
        "[KYNENCE] Artigos encontrados na categoria:",
        artigosDaCategoria.length
    );


    /* =====================================================
       LIMPAR
    ===================================================== */

    categoryArticles.innerHTML =
        "";


    /* =====================================================
       ESTADO VAZIO
    ===================================================== */

    if (
        artigosDaCategoria.length === 0
    ) {

        mostrarEstadoVazio();

        return;

    }


    /* =====================================================
       CRIAR CARTÕES
    ===================================================== */

    artigosDaCategoria.forEach(
        function (artigo) {

            const card =
                criarCartaoArtigo(
                    artigo
                );


            categoryArticles.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   10. MOSTRAR ERRO
========================================================= */

function mostrarErro(mensagem) {

    console.error(
        "[KYNENCE] Erro:",
        mensagem
    );


    if (categoryLabel) {

        categoryLabel.textContent =
            "KYNENCE LAB";

    }


    if (categoryTitle) {

        categoryTitle.textContent =
            "Categoria não encontrada";

    }


    if (categoryDescription) {

        categoryDescription.textContent =
            mensagem;

    }


    if (categoryMetaDescription) {

        categoryMetaDescription.content =
            mensagem;

    }


    if (categoryArticles) {

        categoryArticles.innerHTML =
            "";


        const estado =
            document.createElement("div");

        estado.className =
            "empty-state";


        const titulo =
            document.createElement("h3");

        titulo.textContent =
            "Ops!";


        const descricao =
            document.createElement("p");

        descricao.textContent =
            mensagem;


        const link =
            document.createElement("a");

        link.href =
            "../index.html";

        link.className =
            "article-link";

        link.textContent =
            "Voltar para a Home →";


        estado.appendChild(
            titulo
        );

        estado.appendChild(
            descricao
        );

        estado.appendChild(
            link
        );


        categoryArticles.appendChild(
            estado
        );

    }

}


/* =========================================================
   11. INICIAR CATEGORIA
========================================================= */

function iniciarCategoria() {

    console.log(
        "[KYNENCE] Inicializando categoria..."
    );


    /* =====================================================
       ELEMENTO PRINCIPAL
    ===================================================== */

    if (!categoryArticles) {

        console.error(
            "[KYNENCE] Elemento #categoryArticles não encontrado."
        );

        return;

    }


    /* =====================================================
       CATEGORIAS
    ===================================================== */

    const categorias =
        obterCategorias();


    console.log(
        "[KYNENCE] Total de categorias:",
        categorias.length
    );


    if (
        categorias.length === 0
    ) {

        mostrarErro(
            "O catálogo de categorias não foi carregado."
        );

        return;

    }


    /* =====================================================
       ARTIGOS
    ===================================================== */

    const artigos =
        obterArtigos();


    console.log(
        "[KYNENCE] Total de artigos disponíveis:",
        artigos.length
    );


    /* =====================================================
       SLUG
    ===================================================== */

    if (!categoriaSlug) {

        mostrarErro(
            "Nenhuma categoria foi selecionada."
        );

        return;

    }


    console.log(
        "[KYNENCE] Categoria solicitada:",
        categoriaSlug
    );


    /* =====================================================
       ENCONTRAR CATEGORIA
    ===================================================== */

    const categoriaAtual =
        categorias.find(
            function (categoria) {

                return (
                    categoria &&
                    String(
                        categoria.slug || ""
                    )
                    .trim()
                    .toLowerCase() ===
                    categoriaSlug
                );

            }
        );


    if (!categoriaAtual) {

        mostrarErro(
            "A categoria que você procura não existe."
        );

        return;

    }


    console.log(
        "[KYNENCE] Categoria encontrada:",
        categoriaAtual
    );


    /* =====================================================
       TÍTULO DO DOCUMENTO
    ===================================================== */

    document.title =
        `${categoriaAtual.nome} — KYNENCE LAB`;


    /* =====================================================
       LABEL
    ===================================================== */

    if (categoryLabel) {

        categoryLabel.textContent =
            String(
                categoriaAtual.nome ||
                "CATEGORIA"
            ).toUpperCase();

    }


    /* =====================================================
       TÍTULO
    ===================================================== */

    if (categoryTitle) {

        categoryTitle.textContent =
            categoriaAtual.nome ||
            "Artigos";

    }


    /* =====================================================
       DESCRIÇÃO
    ===================================================== */

    if (categoryDescription) {

        categoryDescription.textContent =
            categoriaAtual.descricao ||
            "Explore os conteúdos desta categoria.";

    }


    /* =====================================================
       META DESCRIPTION
    ===================================================== */

    if (
        categoryMetaDescription
    ) {

        categoryMetaDescription.content =
            categoriaAtual.descricao ||
            `Explore os artigos de ${categoriaAtual.nome} no KYNENCE LAB.`;

    }


    /* =====================================================
       CARREGAR ARTIGOS
    ===================================================== */

    carregarArtigosDaCategoria();


    console.log(
        "[KYNENCE] Categoria inicializada com sucesso."
    );

}


/* =========================================================
   12. INICIALIZAÇÃO ROBUSTA
========================================================= */

function inicializarPaginaCategoria() {

    if (
        window.__KYNENCE_CATEGORIA_INICIALIZADA
    ) {

        return;

    }


    window.__KYNENCE_CATEGORIA_INICIALIZADA =
        true;


    iniciarCategoria();

}


/* =========================================================
   13. DOM READY
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarPaginaCategoria,
        {
            once: true
        }
    );

} else {

    inicializarPaginaCategoria();

}


/* =========================================================
   14. EXPORTAÇÕES
========================================================= */

window.obterCategorias =
    obterCategorias;


window.obterArtigosCategoria =
    obterArtigos;


window.carregarArtigosDaCategoria =
    carregarArtigosDaCategoria;


window.iniciarCategoria =
    iniciarCategoria;


window.construirUrlArtigoCategoria =
    construirUrlArtigoCategoria;


window.abrirArtigoDaCategoria =
    abrirArtigoDaCategoria;


/* =========================================================
   FIM — SISTEMA DE CATEGORIAS V2.2
========================================================= */