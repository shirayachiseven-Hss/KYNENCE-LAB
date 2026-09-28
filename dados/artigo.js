// ============================================================
// KYNENCE LAB
// dados/artigo.js
// V2.5 — Sistema completo de artigo
// ============================================================


// ============================================================
// 1. CONFIGURAÇÃO
// ============================================================

const KYNENCE_ARTIGO_CONFIG = {

    quantidadeRelacionados: 3,

    parametroId: "id",

    nomeSite: "KYNENCE LAB",

    tipoTwitterCard: "summary_large_image"

};


// ============================================================
// 2. UTILITÁRIOS
// ============================================================

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function textoSeguro(valor, fallback = "") {

    const texto = String(valor ?? "").trim();

    return texto || fallback;

}


function definirTituloPagina(titulo) {

    if (!titulo) return;

    document.title = titulo;

}


function obterURLAtual() {

    return window.location.href;

}


function resolverURL(url) {

    if (!url) return "";

    try {

        return new URL(
            url,
            window.location.href
        ).href;

    } catch (erro) {

        return String(url);

    }

}


function definirMeta(name, content) {

    if (!name || !content) return;

    let meta = document.head.querySelector(
        `meta[name="${name}"]`
    );

    if (!meta) {

        meta = document.createElement("meta");

        meta.name = name;

        document.head.appendChild(meta);

    }

    meta.content = content;

}


function definirMetaProperty(property, content) {

    if (!property || !content) return;

    let meta = document.head.querySelector(
        `meta[property="${property}"]`
    );

    if (!meta) {

        meta = document.createElement("meta");

        meta.setAttribute(
            "property",
            property
        );

        document.head.appendChild(meta);

    }

    meta.content = content;

}


function definirCanonical(url) {

    if (!url) return;

    let canonical = document.head.querySelector(
        'link[rel="canonical"]'
    );

    if (!canonical) {

        canonical = document.createElement("link");

        canonical.rel = "canonical";

        document.head.appendChild(canonical);

    }

    canonical.href = url;

}


function definirIndexacao(indexar = true) {

    definirMeta(
        "robots",
        indexar
            ? "index, follow"
            : "noindex, nofollow"
    );

}


// ============================================================
// 3. IDENTIFICAÇÃO DO ARTIGO
// ============================================================

function obterParametroID() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    return parametros.get(
        KYNENCE_ARTIGO_CONFIG.parametroId
    );

}


function obterNomeArquivo() {

    const caminho =
        window.location.pathname;

    const partes =
        caminho.split("/");

    const arquivo =
        partes.pop() || "";

    return arquivo.replace(
        /\.html$/i,
        ""
    );

}


function encontrarArtigo() {

    const artigos =
        Array.isArray(
            window.KYNENCE_ARTIGOS
        )
            ? window.KYNENCE_ARTIGOS
            : [];


    if (!artigos.length) {

        return null;

    }


    const id =
        obterParametroID();

    const nomeArquivo =
        obterNomeArquivo();


    // --------------------------------------------------------
    // 1. Procurar pelo ID
    // --------------------------------------------------------

    if (id) {

        const artigoPorID =
            artigos.find(
                artigo =>
                    String(
                        artigo.id || ""
                    ) === String(id)
            );


        if (artigoPorID) {

            return artigoPorID;

        }

    }


    // --------------------------------------------------------
    // 2. Procurar pelo slug
    // --------------------------------------------------------

    const artigoPorSlug =
        artigos.find(
            artigo =>
                String(
                    artigo.slug || ""
                )
                    .toLowerCase() ===
                nomeArquivo.toLowerCase()
        );


    if (artigoPorSlug) {

        return artigoPorSlug;

    }


    // --------------------------------------------------------
    // 3. Procurar pela URL
    // --------------------------------------------------------

    const artigoPorURL =
        artigos.find(
            artigo => {

                const url =
                    String(
                        artigo.url || ""
                    );

                return (
                    url
                        .toLowerCase()
                        .includes(
                            nomeArquivo.toLowerCase()
                        )
                );

            }
        );


    return artigoPorURL || null;

}


// ============================================================
// 4. ELEMENTOS DO ARTIGO
// ============================================================

function obterElemento(...ids) {

    for (const id of ids) {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            return elemento;

        }

    }

    return null;

}


// ============================================================
// 5. CABEÇALHO DO ARTIGO
// ============================================================

function renderizarCabecalhoArtigo(artigo) {

    const titulo =
        obterElemento(
            "articleTitle",
            "tituloArtigo",
            "postTitle"
        );


    const resumo =
        obterElemento(
            "articleLead",
            "articleSummary",
            "resumoArtigo",
            "postSummary"
        );


    const categoria =
        obterElemento(
            "articleCategory",
            "categoriaArtigo",
            "postCategory"
        );


    const autor =
        obterElemento(
            "articleAuthor",
            "autorArtigo",
            "postAuthor"
        );


    const data =
        obterElemento(
            "articleDate",
            "dataArtigo",
            "postDate"
        );


    const tempoLeitura =
        obterElemento(
            "articleReadingTime",
            "tempoLeitura",
            "readingTime"
        );


    const atualizado =
        obterElemento(
            "articleUpdated",
            "artigoAtualizado",
            "updatedArticle"
        );


    // --------------------------------------------------------
    // Título
    // --------------------------------------------------------

    if (titulo) {

        titulo.textContent =
            textoSeguro(
                artigo.titulo,
                "Artigo KYNENCE LAB"
            );

    }


    // --------------------------------------------------------
    // Resumo
    // --------------------------------------------------------

    if (resumo) {

        resumo.textContent =
            textoSeguro(
                artigo.resumo,
                "Conteúdo educativo da KYNENCE LAB."
            );

    }


    // --------------------------------------------------------
    // Categoria
    // --------------------------------------------------------

    if (categoria) {

        categoria.textContent =
            textoSeguro(
                artigo.categoria,
                "Economia"
            );

    }


    // --------------------------------------------------------
    // Autor
    // --------------------------------------------------------

    if (autor) {

        autor.textContent =
            textoSeguro(
                artigo.autor,
                "KYNENCE LAB"
            );

    }


    // --------------------------------------------------------
    // Data
    // --------------------------------------------------------

    if (data) {

        data.textContent =
            textoSeguro(
                artigo.data
            );

    }


    // --------------------------------------------------------
    // Tempo de leitura
    // --------------------------------------------------------

    if (tempoLeitura) {

        const leitura =
            artigo.tempoLeitura ||
            artigo.tempo_leitura ||
            artigo.leitura ||
            artigo.readingTime;


        if (leitura) {

            tempoLeitura.textContent =
                String(leitura).includes("min")
                    ? String(leitura)
                    : `${leitura} min de leitura`;

        } else {

            tempoLeitura.textContent =
                "";

        }

    }


    // --------------------------------------------------------
    // Data de atualização
    // --------------------------------------------------------

    if (atualizado) {

        const dataAtualizacao =
            artigo.dataAtualizacao ||
            artigo.data_atualizacao ||
            artigo.dataAtualizacaoISO;


        if (dataAtualizacao) {

            atualizado.textContent =
                `Atualizado em ${dataAtualizacao}`;

        } else {

            atualizado.textContent =
                "";

        }

    }

}


// ============================================================
// 6. BREADCRUMB VISUAL
// ============================================================

function obterURLCategoria(artigo) {

    const categoriaSlug =
        textoSeguro(
            artigo.categoriaSlug
        );


    if (!categoriaSlug) {

        return "../categorias/categoria.html";

    }


    return (
        "../categorias/categoria.html" +
        "?categoria=" +
        encodeURIComponent(
            categoriaSlug
        )
    );

}


function criarBreadcrumb(artigo) {

    if (!artigo) return;


    let breadcrumb =
        obterElemento(
            "articleBreadcrumb",
            "breadcrumb",
            "breadcrumbs"
        );


    if (!breadcrumb) {

        const artigoMain =
            document.querySelector(
                "main"
            );


        if (!artigoMain) return;


        breadcrumb =
            document.createElement(
                "nav"
            );


        breadcrumb.id =
            "articleBreadcrumb";


        breadcrumb.className =
            "article-breadcrumb";


        breadcrumb.setAttribute(
            "aria-label",
            "Navegação estrutural"
        );


        artigoMain.prepend(
            breadcrumb
        );

    }


    const categoria =
        textoSeguro(
            artigo.categoria,
            "Economia"
        );


    const categoriaURL =
        obterURLCategoria(
            artigo
        );


    breadcrumb.innerHTML = `

        <a href="../index.html">
            Início
        </a>

        <span aria-hidden="true">
            ›
        </span>

        <a
            href="${escaparHTML(
                categoriaURL
            )}"
        >
            ${escaparHTML(
                categoria
            )}
        </a>

        <span aria-hidden="true">
            ›
        </span>

        <span aria-current="page">
            ${escaparHTML(
                textoSeguro(
                    artigo.titulo,
                    "Artigo"
                )
            )}
        </span>

    `;

}


// ============================================================
// 7. CONTEÚDO DO ARTIGO
// ============================================================

function obterConteudoArtigo(artigo) {

    return (
        artigo.conteudo ||
        artigo.conteúdo ||
        artigo.corpo ||
        artigo.body ||
        artigo.content ||
        ""
    );

}


function renderizarConteudoArtigo(artigo) {

    const conteudo =
        obterElemento(
            "articleBody",
            "articleContent",
            "conteudoArtigo",
            "postContent"
        );


    if (!conteudo) return;


    const corpo =
        obterConteudoArtigo(
            artigo
        );


    if (
        typeof corpo ===
        "string" &&
        corpo.trim()
    ) {

        conteudo.innerHTML =
            corpo;

        return;

    }


    // --------------------------------------------------------
    // Se não houver conteúdo no catálogo,
    // mantemos o estado atual.
    // --------------------------------------------------------

    if (
        !conteudo.innerHTML.trim()
    ) {

        conteudo.innerHTML = `

            <div class="empty-state">

                <p>
                    O conteúdo deste artigo
                    ainda não foi disponibilizado.
                </p>

            </div>

        `;

    }

}


// ============================================================
// 8. AVISO / DISCLAIMER
// ============================================================

function renderizarAviso(artigo) {

    const aviso =
        obterElemento(
            "articleDisclaimer",
            "disclaimer",
            "avisoArtigo"
        );


    if (!aviso) return;


    aviso.textContent =
        "Este conteúdo tem finalidade educativa e informativa. " +
        "Não constitui aconselhamento financeiro, jurídico ou fiscal individualizado.";

}


// ============================================================
// 9. FONTES
// ============================================================

function renderizarFontes(artigo) {

    const fontesLista =
        obterElemento(
            "articleSourcesList",
            "fontesArtigoList",
            "sourcesList"
        );


    if (!fontesLista) return;


    const fontes =
        Array.isArray(
            artigo.fontes
        )
            ? artigo.fontes
            : [];


    if (!fontes.length) {

        fontesLista.innerHTML = `

            <p>
                Nenhuma fonte adicionada.
            </p>

        `;

        return;

    }


    const lista =
        fontes
            .map(
                fonte => {

                    const nome =
                        textoSeguro(
                            fonte.nome ||
                            fonte.titulo,
                            "Fonte"
                        );


                    const url =
                        textoSeguro(
                            fonte.url
                        );


                    if (!url) {

                        return `

                            <li>
                                ${escaparHTML(
                                    nome
                                )}
                            </li>

                        `;

                    }


                    return `

                        <li>

                            <a
                                href="${escaparHTML(
                                    url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${escaparHTML(
                                    nome
                                )}
                            </a>

                        </li>

                    `;

                }
            )
            .join("");


    fontesLista.innerHTML = `

        <ul>
            ${lista}
        </ul>

    `;

}


// ============================================================
// 10. ARTIGOS RELACIONADOS
// ============================================================

function construirURLRelacionado(artigo) {

    if (!artigo) return "#";


    const id =
        encodeURIComponent(
            artigo.id || ""
        );


    let caminho =
        textoSeguro(
            artigo.url
        );


    // --------------------------------------------------------
    // Se não houver URL definida
    // --------------------------------------------------------

    if (!caminho) {

        return `?id=${id}`;

    }


    // --------------------------------------------------------
    // URL absoluta
    // --------------------------------------------------------

    if (
        /^https?:\/\//i.test(
            caminho
        ) ||
        caminho.startsWith("//")
    ) {

        return caminho;

    }


    // --------------------------------------------------------
    // Limpar ./ inicial
    // --------------------------------------------------------

    caminho =
        caminho.replace(
            /^\.?\//,
            ""
        );


    // --------------------------------------------------------
    // Evitar artigos/artigo.html/artigo.html
    // --------------------------------------------------------

    if (
        caminho.startsWith(
            "artigos/"
        )
    ) {

        caminho =
            caminho.substring(
                "artigos/".length
            );

    }


    return caminho.includes("?")
        ? `${caminho}&id=${id}`
        : `${caminho}?id=${id}`;

}


function renderizarRelacionados(artigo) {

    const container =
        obterElemento(
            "relatedArticles",
            "artigosRelacionados"
        );


    if (!container) return;


    const artigos =
        Array.isArray(
            window.KYNENCE_ARTIGOS
        )
            ? window.KYNENCE_ARTIGOS
            : [];


    const relacionados =
        artigos

            .filter(
                item => {

                    if (
                        item.publicado === false
                    ) {

                        return false;

                    }


                    if (
                        artigo.id &&
                        String(item.id) ===
                        String(artigo.id)
                    ) {

                        return false;

                    }


                    return true;

                }
            )

            .sort(
                (a, b) => {

                    const mesmaCategoriaA =
                        a.categoriaSlug ===
                        artigo.categoriaSlug
                            ? 1
                            : 0;


                    const mesmaCategoriaB =
                        b.categoriaSlug ===
                        artigo.categoriaSlug
                            ? 1
                            : 0;


                    return (
                        mesmaCategoriaB -
                        mesmaCategoriaA
                    );

                }
            )

            .slice(
                0,
                KYNENCE_ARTIGO_CONFIG
                    .quantidadeRelacionados
            );


    if (!relacionados.length) {

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    Ainda não existem artigos relacionados.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        relacionados
            .map(
                item => {

                    return `

                        <article
                            class="article-related-card"
                        >

                            <span
                                class="article-related-category"
                            >
                                ${escaparHTML(
                                    textoSeguro(
                                        item.categoria,
                                        "Artigo"
                                    )
                                )}
                            </span>


                            <h3>

                                <a
                                    href="${escaparHTML(
                                        construirURLRelacionado(
                                            item
                                        )
                                    )}"
                                >
                                    ${escaparHTML(
                                        textoSeguro(
                                            item.titulo,
                                            "Artigo"
                                        )
                                    )}
                                </a>

                            </h3>


                            <p>
                                ${escaparHTML(
                                    textoSeguro(
                                        item.resumo
                                    )
                                )}
                            </p>

                        </article>

                    `;

                }
            )
            .join("");

}


// ============================================================
// 11. SEO
// ============================================================

function configurarSEO(artigo) {

    const titulo =
        textoSeguro(
            artigo.seoTitulo ||
            artigo.titulo,
            "KYNENCE LAB"
        );


    const descricao =
        textoSeguro(
            artigo.seoDescricao ||
            artigo.resumo,
            "KYNENCE LAB — Finanças, Economia e Educação Financeira."
        );


    definirTituloPagina(
        `${titulo} — KYNENCE LAB`
    );


    definirMeta(
        "description",
        descricao
    );


    definirMeta(
        "author",
        textoSeguro(
            artigo.autor,
            "KYNENCE LAB"
        )
    );


    definirIndexacao(
        artigo.publicado !== false
    );


    // --------------------------------------------------------
    // Open Graph
    // --------------------------------------------------------

    definirMetaProperty(
        "og:title",
        titulo
    );


    definirMetaProperty(
        "og:description",
        descricao
    );


    definirMetaProperty(
        "og:type",
        "article"
    );


    definirMetaProperty(
        "og:site_name",
        KYNENCE_ARTIGO_CONFIG.nomeSite
    );


    definirMetaProperty(
        "og:url",
        obterURLAtual()
    );


    if (artigo.imagem) {

        definirMetaProperty(
            "og:image",
            resolverURL(
                artigo.imagem
            )
        );

    }


    // --------------------------------------------------------
    // Article
    // --------------------------------------------------------

    if (artigo.categoria) {

        definirMetaProperty(
            "article:section",
            artigo.categoria
        );

    }


    if (artigo.dataISO) {

        definirMetaProperty(
            "article:published_time",
            artigo.dataISO
        );

    }


    if (artigo.dataAtualizacaoISO) {

        definirMetaProperty(
            "article:modified_time",
            artigo.dataAtualizacaoISO
        );

    }


    // --------------------------------------------------------
    // Twitter
    // --------------------------------------------------------

    definirMetaProperty(
        "twitter:card",
        KYNENCE_ARTIGO_CONFIG
            .tipoTwitterCard
    );


    definirMetaProperty(
        "twitter:title",
        titulo
    );


    definirMetaProperty(
        "twitter:description",
        descricao
    );


    if (artigo.imagem) {

        definirMetaProperty(
            "twitter:image",
            resolverURL(
                artigo.imagem
            )
        );

    }


    // --------------------------------------------------------
    // Canonical
    // --------------------------------------------------------

    definirCanonical(
        obterURLAtual()
    );

}


// ============================================================
// 12. JSON-LD — BLOGPOSTING
// ============================================================

function criarJSONLDArtigo(artigo) {

    const titulo =
        textoSeguro(
            artigo.seoTitulo ||
            artigo.titulo
        );


    const descricao =
        textoSeguro(
            artigo.seoDescricao ||
            artigo.resumo
        );


    const url =
        obterURLAtual();


    const dados = {

        "@context":
            "https://schema.org",

        "@type":
            "BlogPosting",

        "headline":
            titulo,

        "description":
            descricao,

        "url":
            url,

        "mainEntityOfPage": {

            "@type":
                "WebPage",

            "@id":
                url

        },

        "author": {

            "@type":
                "Organization",

            "name":
                textoSeguro(
                    artigo.autor,
                    "KYNENCE LAB"
                )

        },

        "publisher": {

            "@type":
                "Organization",

            "name":
                "KYNENCE LAB"

        },

        "articleSection":
            textoSeguro(
                artigo.categoria
            )

    };


    if (artigo.dataISO) {

        dados.datePublished =
            artigo.dataISO;

    }


    if (
        artigo.dataAtualizacaoISO
    ) {

        dados.dateModified =
            artigo.dataAtualizacaoISO;

    }


    if (
        Array.isArray(
            artigo.tags
        ) &&
        artigo.tags.length
    ) {

        dados.keywords =
            artigo.tags.join(
                ", "
            );

    }


    if (artigo.imagem) {

        dados.image = [

            resolverURL(
                artigo.imagem
            )

        ];

    }


    inserirJSONLD(
        "kynence-artigo-jsonld",
        dados
    );

}


// ============================================================
// 13. JSON-LD — BREADCRUMB
// ============================================================

function criarJSONLDBreadcrumb(artigo) {

    if (!artigo) return;


    const categoria =
        textoSeguro(
            artigo.categoria,
            "Economia"
        );


    const titulo =
        textoSeguro(
            artigo.titulo,
            "Artigo"
        );


    const categoriaURL =
        resolverURL(
            obterURLCategoria(
                artigo
            )
        );


    const inicioURL =
        resolverURL(
            "../index.html"
        );


    const artigoURL =
        obterURLAtual();


    const dados = {

        "@context":
            "https://schema.org",

        "@type":
            "BreadcrumbList",

        "itemListElement": [

            {

                "@type":
                    "ListItem",

                "position":
                    1,

                "name":
                    "Início",

                "item":
                    inicioURL

            },

            {

                "@type":
                    "ListItem",

                "position":
                    2,

                "name":
                    categoria,

                "item":
                    categoriaURL

            },

            {

                "@type":
                    "ListItem",

                "position":
                    3,

                "name":
                    titulo,

                "item":
                    artigoURL

            }

        ]

    };


    inserirJSONLD(
        "kynence-breadcrumb-jsonld",
        dados
    );

}


// ============================================================
// 14. INSERIR JSON-LD
// ============================================================

function inserirJSONLD(id, dados) {

    if (!id || !dados) return;


    let script =
        document.getElementById(id);


    if (!script) {

        script =
            document.createElement(
                "script"
            );

        script.type =
            "application/ld+json";

        script.id =
            id;

        document.head.appendChild(
            script
        );

    }


    script.textContent =
        JSON.stringify(
            dados,
            null,
            2
        );

}


// ============================================================
// 15. PÁGINA DE ERRO
// ============================================================

function mostrarErroArtigo(mensagem) {

    definirIndexacao(false);


    definirTituloPagina(
        "Artigo não encontrado — KYNENCE LAB"
    );


    const main =
        document.querySelector(
            "main"
        );


    if (!main) return;


    main.innerHTML = `

        <section
            class="empty-state article-error"
        >

            <h1>
                Artigo não encontrado
            </h1>


            <p>
                ${escaparHTML(
                    mensagem ||
                    "Não foi possível encontrar este artigo."
                )}
            </p>


            <p>

                <a
                    class="button"
                    href="../index.html"
                >
                    Voltar para o início
                </a>

            </p>

        </section>

    `;

}


// ============================================================
// 16. MENU MOBILE
// ============================================================

function inicializarMenuArtigo() {

    const menuButton =
        document.querySelector(
            "#menuButton"
        ) ||
        document.querySelector(
            ".menu-button"
        );


    const navigation =
        document.querySelector(
            "#navigation"
        ) ||
        document.querySelector(
            ".main-navigation"
        ) ||
        document.querySelector(
            ".navigation"
        ) ||
        document.querySelector(
            "#siteNav"
        );


    if (
        !menuButton ||
        !navigation
    ) {

        return;

    }


    if (
        menuButton.dataset
            .artigoMenuInicializado ===
        "true"
    ) {

        return;

    }


    menuButton.dataset
        .artigoMenuInicializado =
        "true";


    menuButton.addEventListener(
        "click",
        function () {

            const aberto =
                navigation.classList.toggle(
                    "active"
                );


            navigation.classList.toggle(
                "menu-aberto",
                aberto
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(aberto)
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "active"
                        );

                        navigation.classList.remove(
                            "menu-aberto"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function (evento) {

            if (
                !navigation.contains(
                    evento.target
                ) &&
                !menuButton.contains(
                    evento.target
                )
            ) {

                navigation.classList.remove(
                    "active"
                );

                navigation.classList.remove(
                    "menu-aberto"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key ===
                "Escape"
            ) {

                navigation.classList.remove(
                    "active"
                );

                navigation.classList.remove(
                    "menu-aberto"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


// ============================================================
// 17. ANO DO FOOTER
// ============================================================

function atualizarAnoFooterArtigo() {

    const elementos =
        document.querySelectorAll(
            "[data-current-year], #currentYear"
        );


    elementos.forEach(
        elemento => {

            elemento.textContent =
                new Date()
                    .getFullYear();

        }
    );

}


// ============================================================
// 18. INICIALIZAÇÃO PRINCIPAL
// ============================================================

function inicializarArtigoKynence() {

    if (
        window.__KYNENCE_ARTIGO_INICIALIZADO
    ) {

        return;

    }


    window.__KYNENCE_ARTIGO_INICIALIZADO =
        true;


    console.log(
        "[KYNENCE] Inicializando artigo..."
    );


    const artigo =
        encontrarArtigo();


    if (!artigo) {

        console.warn(
            "[KYNENCE] Artigo não encontrado."
        );


        mostrarErroArtigo(
            "Verifique o endereço do artigo ou volte para a página inicial."
        );


        return;

    }


    console.log(
        "[KYNENCE] Artigo encontrado:",
        artigo
    );


    // --------------------------------------------------------
    // Conteúdo
    // --------------------------------------------------------

    renderizarCabecalhoArtigo(
        artigo
    );


    renderizarConteudoArtigo(
        artigo
    );


    renderizarAviso(
        artigo
    );


    renderizarFontes(
        artigo
    );


    renderizarRelacionados(
        artigo
    );


    // --------------------------------------------------------
    // Breadcrumb
    // --------------------------------------------------------

    criarBreadcrumb(
        artigo
    );


    // --------------------------------------------------------
    // SEO
    // --------------------------------------------------------

    configurarSEO(
        artigo
    );


    // --------------------------------------------------------
    // Dados estruturados
    // --------------------------------------------------------

    criarJSONLDArtigo(
        artigo
    );


    criarJSONLDBreadcrumb(
        artigo
    );


    // --------------------------------------------------------
    // Interface
    // --------------------------------------------------------

    inicializarMenuArtigo();

    atualizarAnoFooterArtigo();


    console.log(
        "[KYNENCE] Artigo inicializado com sucesso."
    );

}


// ============================================================
// 19. EXECUÇÃO ROBUSTA
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarArtigoKynence,
        {
            once: true
        }
    );

} else {

    inicializarArtigoKynence();

}


// ============================================================
// 20. EXPORTAÇÕES
// ============================================================

window.encontrarArtigo =
    encontrarArtigo;


window.inicializarArtigoKynence =
    inicializarArtigoKynence;


window.criarBreadcrumb =
    criarBreadcrumb;


window.criarJSONLDArtigo =
    criarJSONLDArtigo;


window.criarJSONLDBreadcrumb =
    criarJSONLDBreadcrumb;


window.renderizarCabecalhoArtigo =
    renderizarCabecalhoArtigo;


window.renderizarConteudoArtigo =
    renderizarConteudoArtigo;


window.renderizarFontes =
    renderizarFontes;


window.renderizarRelacionados =
    renderizarRelacionados;