
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

// CREATE
function criaPost(dados) {
    miniTwitter.posts.push({
        id: proximoId++,
        owner: dados.owner,
        content: dados.content
    });

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
        renderizaPosts();
    }
}

// DELETE
function apagaPost(id) {
    miniTwitter.posts = pegaPosts().filter((post) => {
        return post.id !== id;
    });

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

    if (conteudo === "") {
        return;
    }


   

    const nome = campoNome.value.trim();

     if (nome === "") {
        return;
    }

    criaPost({
        owner: campoNome.value.trim(),
        content: conteudo
    });



    formulario.reset();
});
// 
// MOSTRAR O POST INICIAL
renderizaPosts();
