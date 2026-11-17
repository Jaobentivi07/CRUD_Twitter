// HORA ATUAL
const msg = document.getElementById("msg");
const hora = new Date().getHours();
if (msg) {
    msg.textContent = `Agora são ${hora}h`;
}

const miniTwitter = {
    usuarios: [
        {
            username: "Jaobentivi"
        }
    ],

    posts: [
        {
            id: 1,
            owner: "Jaobentivi",
            content: "Meu primeiro tweet"
        }
    ]
};

let proximoId = 2;

// PERSISTÊNCIA (localStorage)
const CHAVE = "miniTwitter";

function salvar() {
    localStorage.setItem(CHAVE, JSON.stringify({
        posts: miniTwitter.posts,
        proximoId
    }));
}

function carregar() {
    const salvo = localStorage.getItem(CHAVE);
    if (!salvo) return;

    try {
        const dados = JSON.parse(salvo);
        miniTwitter.posts = dados.posts;
        proximoId = dados.proximoId;
    } catch {
        localStorage.removeItem(CHAVE);
    }
}

// CREATE
function criaPost(dados) {
    miniTwitter.posts.push({
        id: proximoId++,
        owner: dados.owner,
        content: dados.content
    });

    salvar();
    renderizaPosts();
}

// READ
function pegaPosts() {
    return miniTwitter.posts;
}

// UPDATE
function atualizaContentDoPost(id, novoConteudo) {
    const post = pegaPosts().find((post) => post.id === id);

    if (post && novoConteudo.trim() !== "") {
        post.content = novoConteudo;
        salvar();
        renderizaPosts();
    }
}

// DELETE
function apagaPost(id) {
    miniTwitter.posts = pegaPosts().filter((post) => {
        return post.id !== id;
    });

    salvar();
    renderizaPosts();
}

// EXIBIR OS POSTS NA PÁGINA
function renderizaPosts() {
    const lista = document.getElementById("lista-posts");

    lista.replaceChildren();

    pegaPosts().forEach((post) => {
        const cartao = document.createElement("article");
        cartao.className = "post";

        const usuario = document.createElement("strong");
        usuario.textContent = "@" + post.owner;

        const conteudo = document.createElement("p");
        conteudo.textContent = post.content;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", () => {
            const novoConteudo = prompt(
                "Digite o novo conteúdo:",
                post.content
            );

            if (novoConteudo !== null) {
                atualizaContentDoPost(post.id, novoConteudo);
            }
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", () => {
            apagaPost(post.id);
        });

        acoes.append(botaoEditar, botaoExcluir);
        cartao.append(usuario, conteudo, acoes);
        lista.appendChild(cartao);
    });
}

// RECEBER O TEXTO DO FORMULÁRIO
const formulario = document.getElementById("form-post");
const campoConteudo = document.getElementById("conteudo");
const campoNome = document.getElementById("nomedapessoa");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const conteudo = campoConteudo.value.trim();
    const nome = campoNome.value.trim();

    if (conteudo === "" || nome === "") {
        return;
    }

    criaPost({
        owner: nome,
        content: conteudo
    });

    formulario.reset();
});

// CARREGAR OS DADOS SALVOS E MOSTRAR OS POSTS
carregar();
renderizaPosts();
