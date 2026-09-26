/* =========================================================
   KYNENCE LAB
   SISTEMA DE CATEGORIAS
   V2.0

   Responsabilidades:

   - Ler a categoria da URL
   - Encontrar a categoria correta
   - Atualizar título e descrição
   - Buscar somente artigos publicados
   - Filtrar pela categoria
   - Ordenar artigos
   - Criar cartões
   - Criar links corretos
   - Mostrar estado vazio
   - Mostrar erros de forma segura

   Exemplo:

   categorias/categoria.html?categoria=economia

   ========================================================= */


/* =========================================================
   1. LER A CATEGORIA DA URL
========================================================= */

const parametrosCategoria =
    new URLSearchParams(
        window.location.search
    );

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
    document.getElementById(
        "categoryTitle"
    );

const categoryLabel =
    document.getElementById(
        "categoryLabel"
    );

const categoryDescription =
    document.getElementById(
        "categoryDescription"
    );

const categoryArticles =
    document.getElementById(
        "categoryArticles"
    );

const categoryMetaDescription =
    document.getElementById(
        "categoryMetaDescription"
    );


/* =========================================================
   3. OBTER CATÁLOGO DE CATEGORIAS
========================================================= */

/*
   Compatibilidade com diferentes versões
   do categorias.js.

   Primeiro tenta:

   window.KYNENCE_CATEGORIAS

   Depois tenta:

   window.categorias

   E por último verifica se existe
   uma variável global chamada categorias.
*/

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


    if (
        typeof categorias !== "undefined" &&
        Array.isArray(categorias)
    ) {

        return categorias;

    }


    return [];

}


/* =========================================================
   4. VERIFICAR CATÁLOGO DE ARTIGOS
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
   5. ESCAPAR TEXTO
========================================================= */

function escaparTexto(texto) {

    const elemento =
        document.createElement(
            "div"
        );

    elemento.textContent =
        texto == null
            ? ""
            : String(texto);

    return elemento.innerHTML;

}


/* =========================================================
   6. CRIAR URL DO ARTIGO
========================================================= */

function construirUrlArtigoCategoria(
    artigo
) {

    if (
        !artigo ||
        !artigo.id
    ) {

        return "#";

    }


    /*
       O catálogo normalmente possui:

       url:
       artigos/o-que-e-inflacao.html

       Como estamos dentro de:

       /categorias/

       precisamos subir uma pasta:

       ../artigos/o-que-e-inflacao.html
    */

    let caminho =
        artigo.url || "";


    /*
       Se não houver URL no catálogo,
       usar o slug como fallback.
    */

    if (!caminho) {

        const slug =
            artigo.slug ||
            artigo.id;

        caminho =
            `artigos/${slug}.html`;

    }


    /*
       Remover ./ caso exista.
    */

    caminho =
        caminho.replace(
            /^\.\/+/,
            ""
        );


    /*
       Se o catálogo possuir:

       /artigos/arquivo.html

       remover a barra inicial.
    */

    caminho =
        caminho.replace(
            /^\/+/,
            ""
        );


    /*
       Garantir que o caminho
       aponta para a pasta artigos.
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
       Página atual:

       /categorias/categoria.html

       Portanto:

       ../artigos/arquivo.html
    */

    return (
        `../${caminho}` +
        `?id=${encodeURIComponent(
            artigo.id
        )}`
    );

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
        "Ainda não existem artigos nesta categoria.";


    const descricao =
        document.createElement(
            "p"
        );

    descricao.textContent =
        "A KYNENCE LAB está preparando novos conteúdos.";


    estado.appendChild(
        titulo
    );

    estado.appendChild(
        descricao
    );


    categoryArticles.appendChild(
        estado
    );

}


/* =========================================================
   8. CRIAR CARTÃO DE ARTIGO
========================================================= */

function criarCartaoArtigo(
    artigo
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "article-card";


    /* -----------------------------------------------
       Categoria
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       Título
    ------------------------------------------------ */

    const titulo =
        document.createElement(
            "h3"
        );

    titulo.textContent =
        artigo.titulo ||
        "Artigo sem título";


    /* -----------------------------------------------
       Resumo
    ------------------------------------------------ */

    const resumo =
        document.createElement(
            "p"
        );

    resumo.textContent =
        artigo.resumo ||
        "";


    /* -----------------------------------------------
       Metadados
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       Link
    ------------------------------------------------ */

    const link =
        document.createElement(
            "a"
        );

    link.className =
        "article-link";

    link.href =
        construirUrlArtigoCategoria(
            artigo
        );

    link.textContent =
        "Ler artigo →";


    /* -----------------------------------------------
       Montar cartão
    ------------------------------------------------ */

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

        return;

    }


    const artigos =
        obterArtigos();


    /*
       Filtrar:

       - artigo válido
       - publicado
       - categoria correta
    */

    const artigosDaCategoria =
        artigos.filter(
            function (artigo) {

                if (!artigo) {

                    return false;

                }


                if (
                    artigo.publicado !== true
                ) {

                    return false;

                }


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


    /*
       Ordenar:

       mais recente → mais antigo
    */

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

            return (
                dataB - dataA
            );

        }
    );


    /*
       Limpar resultados.
    */

    categoryArticles.innerHTML =
        "";


    /*
       Nenhum resultado.
    */

    if (
        artigosDaCategoria.length === 0
    ) {

        mostrarEstadoVazio();

        return;

    }


    /*
       Criar cartões.
    */

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
   10. INICIAR CATEGORIA
========================================================= */

function iniciarCategoria() {

    const categorias =
        obterCategorias();


    /*
       Verificar catálogo.
    */

    if (
        categorias.length === 0
    ) {

        mostrarErro(
            "O catálogo de categorias não foi carregado."
        );

        return;

    }


    /*
       Verificar se existe slug.
    */

    if (!categoriaSlug) {

        mostrarErro(
            "Nenhuma categoria foi selecionada."
        );

        return;

    }


    /*
       Procurar categoria.
    */

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


    /*
       Categoria inexistente.
    */

    if (!categoriaAtual) {

        mostrarErro(
            "A categoria que você procura não existe."
        );

        return;

    }


    /*
       Título da página.
    */

    document.title =
        `${categoriaAtual.nome} — KYNENCE LAB`;


    /*
       Etiqueta.
    */

    if (categoryLabel) {

        categoryLabel.textContent =
            String(
                categoriaAtual.nome ||
                "CATEGORIA"
            ).toUpperCase();

    }


    /*
       Título.
    */

    if (categoryTitle) {

        categoryTitle.textContent =
            categoriaAtual.nome ||
            "Artigos";

    }


    /*
       Descrição.
    */

    if (categoryDescription) {

        categoryDescription.textContent =
            categoriaAtual.descricao ||
            "Explore os conteúdos desta categoria.";

    }


    /*
       SEO.
    */

    if (
        categoryMetaDescription
    ) {

        categoryMetaDescription.content =
            categoriaAtual.descricao ||
            `Explore os artigos de ${categoriaAtual.nome} no KYNENCE LAB.`;

    }


    /*
       Carregar artigos.
    */

    carregarArtigosDaCategoria();

}


/* =========================================================
   11. MOSTRAR ERRO
========================================================= */

function mostrarErro(
    mensagem
) {

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
            "Ops!";


        const descricao =
            document.createElement(
                "p"
            );

        descricao.textContent =
            mensagem;


        const link =
            document.createElement(
                "a"
            );

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
   12. INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarCategoria();

    }
);


/* =========================================================
   FIM DO SISTEMA
========================================================= */

