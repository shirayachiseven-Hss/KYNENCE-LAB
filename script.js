// ============================================================
// KYNENCE LAB
// SCRIPT PRINCIPAL
// V2.0 — INICIALIZAÇÃO ROBUSTA + KYNENCE DATA
// ============================================================
//
// Responsabilidades:
//
// 1. Menu mobile
// 2. Ano do footer
// 3. Utilitários
// 4. URLs de artigos
// 5. Artigo em destaque
// 6. Artigos recentes
// 7. Indicadores
// 8. Valores dos indicadores
// 9. Cartões KYNENCE DATA
// 10. Renderização KYNENCE DATA
// 11. Histórico
// 12. Gráficos históricos
// 13. Informações oficiais
// 14. Seletor de indicadores
// 15. Comparação de indicadores
// 16. Funções globais
// 17. Inicialização robusta
// 18. Atualização após API
// 19. Inicialização da API
//
// ============================================================


// ============================================================
// 1. MENU MOBILE
// ============================================================

function inicializarMenuMobile() {

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");


    if (!menuButton || !navigation) {
        return;
    }


    // Evita registrar os mesmos eventos mais de uma vez
    if (menuButton.dataset.kynenceMenuInicializado === "true") {
        return;
    }


    menuButton.dataset.kynenceMenuInicializado = "true";


    function fecharMenu() {

        navigation.classList.remove("menu-aberto");
        navigation.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    }


    function alternarMenu() {

        navigation.classList.remove("active");

        const aberto =
            navigation.classList.toggle(
                "menu-aberto"
            );

        menuButton.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            aberto
                ? "Fechar menu"
                : "Abrir menu"
        );
    }


    menuButton.addEventListener(
        "click",
        function (evento) {

            evento.stopPropagation();

            alternarMenu();
        }
    );


    const linksMenu =
        navigation.querySelectorAll("a");


    linksMenu.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    fecharMenu();
                }
            );

        }
    );


    document.addEventListener(
        "click",
        function (evento) {

            const clicouNoMenu =
                navigation.contains(
                    evento.target
                );

            const clicouNoBotao =
                menuButton.contains(
                    evento.target
                );


            if (
                !clicouNoMenu &&
                !clicouNoBotao
            ) {

                fecharMenu();
            }
        }
    );


    document.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Escape") {

                fecharMenu();

                menuButton.focus();
            }
        }
    );
}


// ============================================================
// 2. ANO DO FOOTER
// ============================================================

function atualizarAnoFooter() {

    const ano =
        document.getElementById(
            "currentYear"
        );


    if (!ano) {
        return;
    }


    ano.textContent =
        new Date().getFullYear();
}


// ============================================================
// 3. UTILITÁRIOS
// ============================================================

function escaparHTML(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";
    }


    return String(valor)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


// ============================================================
// 4. CONSTRUIR URL DO ARTIGO
// ============================================================

function construirUrlArtigo(
    artigo,
    contexto
) {

    if (!artigo) {
        return "#";
    }


    const id =
        encodeURIComponent(
            artigo.id || ""
        );


    let caminho =
        String(
            artigo.url || ""
        ).trim();


    if (!caminho) {

        return `?id=${id}`;
    }


    // URLs externas ou absolutas
    if (
        /^https?:\/\//i.test(caminho) ||
        caminho.startsWith("//")
    ) {

        return caminho.includes("?")
            ? `${caminho}&id=${id}`
            : `${caminho}?id=${id}`;
    }


    // Normalizar barras iniciais
    caminho =
        caminho.replace(
            /^\.?\//,
            ""
        );


    // Remover "artigos/" quando necessário
    if (
        caminho.startsWith("artigos/")
    ) {

        caminho =
            caminho.substring(
                "artigos/".length
            );
    }


    // Página dentro da pasta /artigos/
    if (contexto === "artigo") {

        return caminho.includes("?")
            ? `${caminho}&id=${id}`
            : `${caminho}?id=${id}`;
    }


    // Home, pesquisa ou categorias
    return caminho.includes("?")
        ? `artigos/${caminho}&id=${id}`
        : `artigos/${caminho}?id=${id}`;
}


// ============================================================
// 5. FORMATAÇÃO DE NÚMEROS
// ============================================================

function formatarNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === "" ||
        Number.isNaN(
            Number(valor)
        )
    ) {

        return "—";
    }


    return new Intl.NumberFormat(
        "pt-PT",
        {
            maximumFractionDigits: 2
        }
    ).format(
        Number(valor)
    );
}


// ============================================================
// 6. ARTIGO EM DESTAQUE
// ============================================================

function carregarArtigoDestaque() {

    const container =
        document.getElementById(
            "featuredArticle"
        );


    if (
        !container ||
        !Array.isArray(
            window.KYNENCE_ARTIGOS
        )
    ) {

        return;
    }


    const artigo =
        window.KYNENCE_ARTIGOS.find(
            item =>
                item &&
                item.publicado === true &&
                item.destaque === true
        );


    if (!artigo) {

        container.innerHTML = "";

        return;
    }


    const urlArtigo =
        construirUrlArtigo(
            artigo,
            "home"
        );


    container.innerHTML = `

        <article class="featured-card">

            <div class="featured-content">

                <span class="article-category">

                    ${escaparHTML(
                        artigo.categoria || ""
                    )}

                </span>


                <h2>

                    ${escaparHTML(
                        artigo.titulo || ""
                    )}

                </h2>


                <p>

                    ${escaparHTML(
                        artigo.resumo || ""
                    )}

                </p>


                <div class="article-meta">

                    <span>

                        ${escaparHTML(
                            artigo.leitura || ""
                        )}

                    </span>

                    <span>•</span>

                    <span>

                        ${escaparHTML(
                            artigo.autor ||
                            "KYNENCE LAB"
                        )}

                    </span>

                </div>


                <a
                    href="${escaparHTML(
                        urlArtigo
                    )}"
                    class="text-button"
                >

                    Ler artigo →

                </a>

            </div>

        </article>

    `;
}


// ============================================================
// 7. ARTIGOS RECENTES
// ============================================================

function carregarArtigosRecentes() {

    const container =
        document.getElementById(
            "recentArticles"
        );


    if (
        !container ||
        !Array.isArray(
            window.KYNENCE_ARTIGOS
        )
    ) {

        return;
    }


    const artigos =
        window.KYNENCE_ARTIGOS

            .filter(
                artigo =>
                    artigo &&
                    artigo.publicado === true
            )

            .slice()

            .sort(
                (a, b) =>
                    new Date(
                        b.dataISO || 0
                    ) -
                    new Date(
                        a.dataISO || 0
                    )
            )

            .slice(
                0,
                6
            );


    if (!artigos.length) {

        container.innerHTML = `

            <div class="empty-state">

                Ainda não existem
                artigos publicados.

            </div>

        `;

        return;
    }


    container.innerHTML =

        artigos

            .map(
                artigo => {

                    const urlArtigo =
                        construirUrlArtigo(
                            artigo,
                            "home"
                        );


                    return `

                        <article
                            class="article-card"
                        >

                            <div
                                class="article-card-content"
                            >

                                <span
                                    class="article-category"
                                >

                                    ${escaparHTML(
                                        artigo.categoria || ""
                                    )}

                                </span>


                                <h3>

                                    ${escaparHTML(
                                        artigo.titulo || ""
                                    )}

                                </h3>


                                <p>

                                    ${escaparHTML(
                                        artigo.resumo || ""
                                    )}

                                </p>


                                <div
                                    class="article-card-meta"
                                >

                                    <span>

                                        ${escaparHTML(
                                            artigo.data || ""
                                        )}

                                    </span>


                                    <span>

                                        ${escaparHTML(
                                            artigo.leitura || ""
                                        )}

                                    </span>

                                </div>


                                <a
                                    class="article-link"
                                    href="${escaparHTML(
                                        urlArtigo
                                    )}"
                                >

                                    Ler artigo →

                                </a>

                            </div>

                        </article>

                    `;
                }
            )

            .join("");
}


// ============================================================
// 8. OBTER INDICADORES
// ============================================================

function obterIndicadoresKynence() {

    if (
        Array.isArray(
            window.KYNENCE_DATA
        )
    ) {

        return window.KYNENCE_DATA;
    }


    return [];
}


// ============================================================
// 9. FORMATAR VALOR DO INDICADOR
// ============================================================

function formatarValorIndicador(
    indicador
) {

    if (!indicador) {
        return "—";
    }


    const valor =
        indicador.valor;


    if (
        valor === null ||
        valor === undefined ||
        valor === "" ||
        Number.isNaN(
            Number(valor)
        )
    ) {

        return "—";
    }


    const numero =
        formatarNumero(
            valor
        );


    const unidade =
        indicador.unidade || "";


    if (unidade === "%") {

        return `${numero} %`;
    }


    if (unidade) {

        return `${numero} ${escaparHTML(
            unidade
        )}`;
    }


    return numero;
}


// ============================================================
// 10. CRIAR CARTÃO DE INDICADOR
// ============================================================

function criarCartaoIndicador(
    indicador
) {

    if (!indicador) {
        return "";
    }


    const id =
        escaparHTML(
            indicador.id || ""
        );


    const nome =
        escaparHTML(
            indicador.nome || ""
        );


    const periodo =
        indicador.periodo
            ? escaparHTML(
                indicador.periodo
            )
            : "—";


    const valor =
        formatarValorIndicador(
            indicador
        );


    const fonte =
        escaparHTML(
            indicador.fonte ||
            indicador.fonteOficial ||
            "World Bank"
        );


    return `

        <article
            class="data-card"
            data-indicador="${id}"
        >

            <div class="data-card-top">

                <div>

                    <div class="data-card-name">

                        ${nome}

                    </div>


                    <div class="data-card-period">

                        ${periodo}

                    </div>

                </div>

            </div>


            <div class="data-card-value">

                <span class="data-card-number">

                    ${valor}

                </span>

            </div>


            <div class="data-card-source">

                Fonte:
                ${fonte}

            </div>


            <div class="data-card-actions">

                <button
                    type="button"
                    class="data-history-button"
                    onclick="alternarHistorico('${id}')"
                    aria-expanded="false"
                >

                    Ver histórico

                </button>


                <button
                    type="button"
                    class="data-history-button"
                    onclick="alternarInformacoes('${id}')"
                    aria-expanded="false"
                >

                    Ver informações

                </button>

            </div>


            <div
                class="data-history"
                id="history-${id}"
            ></div>


            <div
                class="data-history"
                id="info-${id}"
            ></div>

        </article>

    `;
}


// ============================================================
// 11. RENDERIZAR KYNENCE DATA
// ============================================================

function renderizarKynenceData() {

    const container =
        document.getElementById(
            "kynenceData"
        );


    if (!container) {
        return;
    }


    const indicadores =
        obterIndicadoresKynence();


    if (!indicadores.length) {

        container.innerHTML = `

            <div class="data-empty">

                Não existem indicadores
                disponíveis neste momento.

            </div>

        `;

        return;
    }


    container.innerHTML =

        indicadores

            .map(
                indicador =>
                    criarCartaoIndicador(
                        indicador
                    )
            )

            .join("");


    indicadores.forEach(
        indicador => {

            renderizarHistorico(
                indicador
            );
        }
    );
}


// ============================================================
// 12. RENDERIZAR HISTÓRICO
// ============================================================

function renderizarHistorico(
    indicador
) {

    if (!indicador) {
        return;
    }


    const container =
        document.getElementById(
            `history-${indicador.id}`
        );


    if (!container) {
        return;
    }


    const historico =
        Array.isArray(
            indicador.historico
        )
            ? indicador.historico
            : [];


    let conteudo = "";


    if (!historico.length) {

        conteudo = `

            <div class="data-history-empty">

                Histórico indisponível.

            </div>

        `;

    } else {

        conteudo = `

            <div class="data-history-header">

                <strong>
                    Histórico
                </strong>

                <span>
                    ${historico.length} períodos
                </span>

            </div>


            <div class="data-history-list">

                ${
                    historico
                        .slice()
                        .reverse()
                        .map(
                            ponto => `

                                <div
                                    class="data-history-row"
                                >

                                    <span
                                        class="data-history-year"
                                    >

                                        ${escaparHTML(
                                            ponto.periodo
                                        )}

                                    </span>


                                    <span
                                        class="data-history-value"
                                    >

                                        ${formatarNumero(
                                            ponto.valor
                                        )}

                                        ${
                                            escaparHTML(
                                                indicador.unidade ||
                                                ""
                                            )
                                        }

                                    </span>

                                </div>

                            `
                        )
                        .join("")
                }

            </div>

        `;
    }


    conteudo +=
        criarGraficoHistorico(
            indicador
        );


    container.innerHTML =
        conteudo;
}


// ============================================================
// 13. GRÁFICO HISTÓRICO
// ============================================================

function criarGraficoHistorico(
    indicador
) {

    if (!indicador) {
        return "";
    }


    const historico =
        Array.isArray(
            indicador.historico
        )
            ? indicador.historico
            : [];


    const pontos =
        historico.filter(
            ponto =>

                ponto &&

                ponto.valor !== null &&

                ponto.valor !== undefined &&

                Number.isFinite(
                    Number(
                        ponto.valor
                    )
                )
        );


    if (pontos.length < 2) {

        return `

            <div class="data-chart-empty">

                Dados insuficientes
                para gerar o gráfico.

            </div>

        `;
    }


    const largura = 600;
    const altura = 230;

    const margemEsquerda = 42;
    const margemDireita = 16;
    const margemTopo = 18;
    const margemInferior = 36;


    const larguraGrafico =
        largura -
        margemEsquerda -
        margemDireita;


    const alturaGrafico =
        altura -
        margemTopo -
        margemInferior;


    const valores =
        pontos.map(
            ponto =>
                Number(
                    ponto.valor
                )
        );


    let minimo =
        Math.min(
            ...valores
        );


    let maximo =
        Math.max(
            ...valores
        );


    if (minimo === maximo) {

        minimo -= 1;
        maximo += 1;
    }


    const intervalo =
        maximo - minimo;


    const pontosSVG =
        pontos.map(
            (
                ponto,
                indice
            ) => {

                const x =
                    margemEsquerda +
                    (
                        indice /
                        (
                            pontos.length - 1
                        )
                    ) *
                    larguraGrafico;


                const y =
                    margemTopo +
                    (
                        1 -
                        (
                            Number(
                                ponto.valor
                            ) -
                            minimo
                        ) /
                        intervalo
                    ) *
                    alturaGrafico;


                return {

                    x,
                    y,

                    periodo:
                        ponto.periodo,

                    valor:
                        Number(
                            ponto.valor
                        )
                };
            }
        );


    const polyline =
        pontosSVG

            .map(
                ponto =>
                    `${ponto.x},${ponto.y}`
            )

            .join(" ");


    const linhasGrade =

        [0, 0.5, 1]

            .map(
                proporcao => {

                    const y =
                        margemTopo +
                        proporcao *
                        alturaGrafico;


                    const valor =
                        maximo -
                        proporcao *
                        intervalo;


                    return `

                        <line
                            x1="${margemEsquerda}"
                            y1="${y}"
                            x2="${largura - margemDireita}"
                            y2="${y}"
                            class="data-chart-grid"
                        />


                        <text
                            x="4"
                            y="${y + 4}"
                            class="data-chart-scale"
                        >

                            ${escaparHTML(
                                formatarNumero(
                                    valor
                                )
                            )}

                        </text>

                    `;
                }
            )

            .join("");


    const pontosCirculo =

        pontosSVG

            .map(
                ponto => `

                    <circle
                        cx="${ponto.x}"
                        cy="${ponto.y}"
                        r="4"
                        class="data-chart-point"
                    />

                `
            )

            .join("");


    const primeiraData =
        pontos[0]?.periodo || "";


    const ultimaData =
        pontos[
            pontos.length - 1
        ]?.periodo || "";


    return `

        <div class="data-chart-wrapper">

            <div class="data-chart-heading">

                <strong>
                    Evolução
                </strong>

                <span>

                    ${escaparHTML(
                        primeiraData
                    )}

                    —

                    ${escaparHTML(
                        ultimaData
                    )}

                </span>

            </div>


            <svg
                class="data-chart"
                viewBox="0 0 ${largura} ${altura}"
                role="img"
                aria-label="Gráfico histórico de ${escaparHTML(
                    indicador.nome || ""
                )}"
                preserveAspectRatio="none"
            >

                ${linhasGrade}


                <polyline
                    points="${polyline}"
                    class="data-chart-line"
                    fill="none"
                />


                ${pontosCirculo}


                <text
                    x="${margemEsquerda}"
                    y="${altura - 8}"
                    class="data-chart-label"
                >

                    ${escaparHTML(
                        primeiraData
                    )}

                </text>


                <text
                    x="${largura - margemDireita}"
                    y="${altura - 8}"
                    text-anchor="end"
                    class="data-chart-label"
                >

                    ${escaparHTML(
                        ultimaData
                    )}

                </text>

            </svg>

        </div>

    `;
}


// ============================================================
// 14. ABRIR / FECHAR HISTÓRICO
// ============================================================

function alternarHistorico(
    id
) {

    const container =
        document.getElementById(
            `history-${id}`
        );


    if (!container) {
        return;
    }


    const aberto =
        container.classList.toggle(
            "aberto"
        );


    const botoes =
        document.querySelectorAll(
            `[onclick="alternarHistorico('${id}')"]`
        );


    botoes.forEach(
        botao => {

            botao.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );
        }
    );
}


// ============================================================
// 15. CRIAR INFORMAÇÕES DO INDICADOR
// ============================================================

function criarInformacoesIndicador(
    indicador
) {

    if (!indicador) {
        return "";
    }


    const nomeOficial =
        indicador.nomeOficial ||
        "Não disponível";


    const unidadeOficial =
        indicador.unidadeOficial ||
        indicador.unidade ||
        "Não especificada";


    const descricaoOficial =
        indicador.descricaoOficial ||
        indicador.descricao ||
        "Descrição oficial não disponível.";


    const organizacao =
        indicador.organizacaoFonte ||
        "Não especificada";


    const fonte =
        indicador.fonteOficial ||
        indicador.fonte ||
        "World Bank";


    const codigo =
        indicador.codigoIndicador ||
        "Não disponível";


    const pais =
        indicador.pais ||
        "Angola";


    const codigoPais =
        indicador.codigoPais ||
        "AGO";


    const periodo =
        indicador.periodo ||
        "Não disponível";


    const urlFonte =
        indicador.urlFonte ||
        "https://data.worldbank.org/";


    let topicosHTML = "";


    if (
        Array.isArray(
            indicador.topicosOficiais
        ) &&
        indicador.topicosOficiais.length
    ) {

        topicosHTML = `

            <div class="data-info-item">

                <span class="data-info-label">
                    Tópicos
                </span>

                <div class="data-info-topics">

                    ${
                        indicador.topicosOficiais

                            .map(
                                topico => `

                                    <span
                                        class="data-info-topic"
                                    >

                                        ${escaparHTML(
                                            topico?.value ??
                                            topico
                                        )}

                                    </span>

                                `
                            )

                            .join("")
                    }

                </div>

            </div>

        `;
    }


    return `

        <div class="data-info-panel">

            <div class="data-history-header">

                <strong>
                    Informações do indicador
                </strong>

                <span>
                    ${escaparHTML(
                        codigo
                    )}
                </span>

            </div>


            <div class="data-info-list">

                <div class="data-info-item">

                    <span class="data-info-label">
                        Nome oficial
                    </span>

                    <p>
                        ${escaparHTML(
                            nomeOficial
                        )}
                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        Descrição
                    </span>

                    <p>
                        ${escaparHTML(
                            descricaoOficial
                        )}
                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        Unidade oficial
                    </span>

                    <p>
                        ${escaparHTML(
                            unidadeOficial
                        )}
                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        Fonte
                    </span>

                    <p>
                        ${escaparHTML(
                            fonte
                        )}
                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        Organização
                    </span>

                    <p>
                        ${escaparHTML(
                            organizacao
                        )}
                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        País
                    </span>

                    <p>

                        ${escaparHTML(
                            pais
                        )}

                        (${escaparHTML(
                            codigoPais
                        )})

                    </p>

                </div>


                <div class="data-info-item">

                    <span class="data-info-label">
                        Período do valor
                    </span>

                    <p>
                        ${escaparHTML(
                            periodo
                        )}
                    </p>

                </div>


                ${topicosHTML}


                <div class="data-info-item">

                    <span class="data-info-label">
                        Código do indicador
                    </span>

                    <p>
                        ${escaparHTML(
                            codigo
                        )}
                    </p>

                </div>


                <div class="data-info-source">

                    <a
                        href="${escaparHTML(
                            urlFonte
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        Consultar fonte →

                    </a>

                </div>

            </div>

        </div>

    `;
}


// ============================================================
// 16. ABRIR / FECHAR INFORMAÇÕES
// ============================================================

function alternarInformacoes(
    id
) {

    const container =
        document.getElementById(
            `info-${id}`
        );


    if (!container) {
        return;
    }


    const indicador =
        obterIndicadoresKynence()

            .find(
                item =>
                    String(item.id) ===
                    String(id)
            );


    if (!indicador) {
        return;
    }


    const aberto =
        container.classList.toggle(
            "aberto"
        );


    if (aberto) {

        container.innerHTML =
            criarInformacoesIndicador(
                indicador
            );

    } else {

        container.innerHTML = "";
    }


    const botoes =
        document.querySelectorAll(
            `[onclick="alternarInformacoes('${id}')"]`
        );


    botoes.forEach(
        botao => {

            botao.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );
        }
    );
}


// ============================================================
// 17. SELETOR DE INDICADORES
// ============================================================

function inicializarSeletorIndicadores() {

    const select =
        document.getElementById(
            "kynenceIndicatorSelect"
        );


    if (!select) {
        return;
    }


    const indicadores =
        obterIndicadoresKynence();


    const valorAtual =
        select.value;


    select.innerHTML = `

        <option value="">
            Selecione um indicador
        </option>

    `;


    indicadores.forEach(
        indicador => {

            if (
                !indicador ||
                !indicador.id ||
                !indicador.nome
            ) {

                return;
            }


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                String(
                    indicador.id
                );


            option.textContent =
                indicador.nome;


            select.appendChild(
                option
            );
        }
    );


    if (
        valorAtual &&
        indicadores.some(
            indicador =>
                String(indicador.id) ===
                String(valorAtual)
        )
    ) {

        select.value =
            valorAtual;
    }


    select.onchange =
        function () {

            const id =
                select.value;


            if (!id) {
                return;
            }


            const indicador =
                obterIndicadoresKynence()

                    .find(
                        item =>
                            String(item.id) ===
                            String(id)
                    );


            if (!indicador) {
                return;
            }


            const historico =
                document.getElementById(
                    `history-${indicador.id}`
                );


            if (historico) {

                historico.classList.add(
                    "aberto"
                );


                historico.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        };
}


// ============================================================
// 18. COMPARAÇÃO DE INDICADORES
// ============================================================

function inicializarComparacaoIndicadores() {

    const selectA =
        document.getElementById(
            "kynenceCompareA"
        );


    const selectB =
        document.getElementById(
            "kynenceCompareB"
        );


    const resultado =
        document.getElementById(
            "kynenceComparisonResult"
        );


    if (
        !selectA ||
        !selectB ||
        !resultado
    ) {

        return;
    }


    const indicadores =
        obterIndicadoresKynence();


    function preencherSelect(
        select
    ) {

        const valorAtual =
            select.value;


        select.innerHTML = `

            <option value="">
                Selecione um indicador
            </option>

        `;


        indicadores.forEach(
            indicador => {

                if (
                    !indicador ||
                    !indicador.id ||
                    !indicador.nome
                ) {

                    return;
                }


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    String(
                        indicador.id
                    );


                option.textContent =
                    indicador.nome;


                select.appendChild(
                    option
                );
            }
        );


        if (
            valorAtual &&
            indicadores.some(
                indicador =>
                    String(indicador.id) ===
                    String(valorAtual)
            )
        ) {

            select.value =
                valorAtual;
        }
    }


    preencherSelect(selectA);
    preencherSelect(selectB);


    function encontrarIndicador(id) {

        return indicadores.find(
            indicador =>
                String(indicador.id) ===
                String(id)
        );
    }


    function formatarValorComparacao(
        valor,
        unidade
    ) {

        if (
            valor === null ||
            valor === undefined ||
            valor === ""
        ) {

            return "—";
        }


        const numero =
            Number(valor);


        if (Number.isNaN(numero)) {

            return `

                <span
                    class="data-comparison-value"
                >

                    ${escaparHTML(
                        String(valor)
                    )}

                    ${
                        unidade
                            ? `

                                <span
                                    class="data-comparison-unit"
                                >

                                    ${escaparHTML(
                                        unidade
                                    )}

                                </span>

                            `
                            : ""
                    }

                </span>

            `;
        }


        const numeroFormatado =
            new Intl.NumberFormat(
                "pt-PT",
                {
                    maximumFractionDigits: 2
                }
            ).format(
                numero
            );


        const unidadeHTML =
            unidade
                ? `

                    <span
                        class="data-comparison-unit"
                    >

                        ${escaparHTML(
                            unidade
                        )}

                    </span>

                `
                : "";


        return `

            <span
                class="data-comparison-value"
            >

                ${numeroFormatado}

                ${unidadeHTML}

            </span>

        `;
    }


    function criarMapaHistorico(
        historico
    ) {

        const mapa =
            new Map();


        if (!Array.isArray(historico)) {

            return mapa;
        }


        historico.forEach(
            item => {

                if (
                    !item ||
                    item.periodo === undefined ||
                    item.periodo === null
                ) {

                    return;
                }


                mapa.set(
                    String(
                        item.periodo
                    ),
                    item.valor
                );
            }
        );


        return mapa;
    }


    function atualizarComparacao() {

        const idA =
            selectA.value;


        const idB =
            selectB.value;


        if (!idA && !idB) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Escolha dois indicadores
                    para começar a comparação.

                </div>

            `;

            return;
        }


        if (!idA || !idB) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Escolha os dois indicadores
                    para visualizar a comparação.

                </div>

            `;

            return;
        }


        if (idA === idB) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Escolha dois indicadores
                    diferentes para comparar.

                </div>

            `;

            return;
        }


        const indicadorA =
            encontrarIndicador(idA);


        const indicadorB =
            encontrarIndicador(idB);


        if (
            !indicadorA ||
            !indicadorB
        ) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Não foi possível encontrar
                    os indicadores selecionados.

                </div>

            `;

            return;
        }


        const historicoA =
            Array.isArray(
                indicadorA.historico
            )
                ? indicadorA.historico
                : [];


        const historicoB =
            Array.isArray(
                indicadorB.historico
            )
                ? indicadorB.historico
                : [];


        if (
            historicoA.length === 0 ||
            historicoB.length === 0
        ) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Os dados históricos de um ou dos dois
                    indicadores ainda não estão disponíveis.

                </div>

            `;

            return;
        }


        const mapaA =
            criarMapaHistorico(historicoA);


        const mapaB =
            criarMapaHistorico(historicoB);


        const periodos =
            Array.from(
                mapaA.keys()
            )

                .filter(
                    periodo =>
                        mapaB.has(periodo)
                )

                .sort(
                    function (a, b) {

                        return String(a).localeCompare(
                            String(b),
                            undefined,
                            {
                                numeric: true
                            }
                        );
                    }
                );


        if (!periodos.length) {

            resultado.innerHTML = `

                <div
                    class="data-comparison-empty"
                >

                    Não existem períodos em comum
                    entre estes dois indicadores.

                </div>

            `;

            return;
        }


        const nomeA =
            escaparHTML(
                indicadorA.nome || ""
            );


        const nomeB =
            escaparHTML(
                indicadorB.nome || ""
            );


        const unidadeA =
            indicadorA.unidade || "";


        const unidadeB =
            indicadorB.unidade || "";


        let linhas = "";


        periodos.forEach(
            periodo => {

                const valorA =
                    mapaA.get(periodo);


                const valorB =
                    mapaB.get(periodo);


                linhas += `

                    <tr>

                        <td>

                            ${escaparHTML(
                                String(periodo)
                            )}

                        </td>


                        <td>

                            ${formatarValorComparacao(
                                valorA,
                                unidadeA
                            )}

                        </td>


                        <td>

                            ${formatarValorComparacao(
                                valorB,
                                unidadeB
                            )}

                        </td>

                    </tr>

                `;
            }
        );


        resultado.innerHTML = `

            <div
                class="data-comparison-table-wrapper"
            >

                <table
                    class="data-comparison-table"
                    aria-label="Comparação entre ${nomeA} e ${nomeB}"
                >

                    <thead>

                        <tr>

                            <th scope="col">
                                Período
                            </th>


                            <th scope="col">

                                ${nomeA}

                                ${
                                    unidadeA
                                        ? ` (${escaparHTML(
                                            unidadeA
                                        )})`
                                        : ""
                                }

                            </th>


                            <th scope="col">

                                ${nomeB}

                                ${
                                    unidadeB
                                        ? ` (${escaparHTML(
                                            unidadeB
                                        )})`
                                        : ""
                                }

                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${linhas}

                    </tbody>

                </table>

            </div>


            <p
                class="data-comparison-note"
            >

                Os valores são apresentados nas unidades
                originais de cada indicador. A comparação
                não significa que as duas unidades tenham
                a mesma escala.

            </p>

        `;
    }


    selectA.onchange =
        atualizarComparacao;


    selectB.onchange =
        atualizarComparacao;


    atualizarComparacao();
}


// ============================================================
// 19. DISPONIBILIZAR FUNÇÕES GLOBALMENTE
// ============================================================

window.alternarHistorico =
    alternarHistorico;


window.alternarInformacoes =
    alternarInformacoes;


window.renderizarKynenceData =
    renderizarKynenceData;


window.inicializarSeletorIndicadores =
    inicializarSeletorIndicadores;


window.inicializarComparacaoIndicadores =
    inicializarComparacaoIndicadores;


// ============================================================
// 20. INICIALIZAÇÃO PRINCIPAL
// ============================================================
//
// Em vez de depender exclusivamente de um único
// DOMContentLoaded, usamos uma função central.
//
// Isto funciona tanto quando o script é carregado
// antes do DOM terminar quanto quando ele é carregado
// depois do DOM já estar pronto.
// ============================================================

let KYNENCE_PAGINA_INICIALIZADA = false;


function inicializarPaginaKynence() {

    // Impede inicialização duplicada
    if (KYNENCE_PAGINA_INICIALIZADA) {
        return;
    }


    KYNENCE_PAGINA_INICIALIZADA = true;


    console.log(
        "[KYNENCE] Inicializando página..."
    );


    // --------------------------------------------------------
    // Interface principal
    // --------------------------------------------------------

    inicializarMenuMobile();

    atualizarAnoFooter();

    carregarArtigoDestaque();

    carregarArtigosRecentes();


    // --------------------------------------------------------
    // KYNENCE DATA
    // --------------------------------------------------------

    renderizarKynenceData();

    inicializarSeletorIndicadores();

    inicializarComparacaoIndicadores();


    console.log(
        "[KYNENCE] Interface inicializada."
    );


    // --------------------------------------------------------
    // API
    // --------------------------------------------------------

    if (
        typeof window.atualizarKynenceData ===
        "function"
    ) {

        console.log(
            "[KYNENCE] Iniciando atualização da API..."
        );


        window.atualizarKynenceData();

    } else {

        console.warn(
            "[KYNENCE] atualizarKynenceData() ainda não disponível."
        );
    }
}


// ============================================================
// 21. INICIALIZAÇÃO ROBUSTA
// ============================================================
//
// Se o DOM ainda estiver carregando:
//     espera DOMContentLoaded.
//
// Se o DOM já estiver pronto:
//     inicializa imediatamente.
//
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarPaginaKynence,
        {
            once: true
        }
    );

} else {

    inicializarPaginaKynence();
}


// ============================================================
// 22. ATUALIZAÇÃO APÓS A API
// ============================================================

document.addEventListener(
    "kynenceDataAtualizado",
    function () {

        console.log(
            "[KYNENCE] Dados atualizados. Renderizando interface..."
        );


        renderizarKynenceData();

        inicializarSeletorIndicadores();

        inicializarComparacaoIndicadores();

    }
);


// ============================================================
// FIM DO SCRIPT
// ============================================================