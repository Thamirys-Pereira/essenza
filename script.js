const bodysuit = [
    {
        id: 1001,
        nome: "Bodysuit Fetish",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 79.99
    },
    {
        id: 1002,
        nome: "Bodysuit Fantasy",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G, GG",
        preco: 64.93
    },
    {
        id: 1003,
        nome: "Bodysuit Chic",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 48.30
    },
    {
        id: 1004,
        nome: "Bodysuit Dreamer",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 59.95
    },
    {
        id: 1005,
        nome: "Bodysuit Fatale",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 48.30
    }
];

const saias = [
    {
        id: 1006,
        nome: "Reverse Corset ",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 89.40
    },
    {
        id: 1007,
        nome: "Gothic Fairy",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 115
    },
    {
        id: 1008,
        nome: "Feather",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 84
    },
    {
        id: 1009,
        nome: "Nana",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 57.15
    },
    {
        id: 1010,
        nome: "Deconstruction",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 104.17
    },
];

const produtos = [...bodysuit, ...saias];

let carrinhoDeCompras = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras));
};

function adicionarAoCarrinho(id, nome, tamanho, preco) {
    const produtoExistente = carrinhoDeCompras.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinhoDeCompras.push({ id, nome, tamanho, preco, quantidade: 1 });
    }

    salvarCarrinho();
};

function calcularTotal() {
    return carrinhoDeCompras.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
}

function promocao(preco, quantidade) {
    let desconto = 0;
    if (quantidade >= 5) desconto = preco * 0.15;
    else if (quantidade >= 3) desconto = preco * 0.10;
    else if (quantidade >= 2) desconto = preco * 0.05;
    return preco - desconto;
}



function renderCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    if (!lista) return;

    lista.innerHTML = '';

    if (carrinhoDeCompras.length === 0) {
        lista.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('total-geral').innerText = '';
        return;
    }

    let quantidadeTotal = carrinhoDeCompras.reduce((qtd, prod) => qtd + prod.quantidade, 0);
    let totalBruto = calcularTotal();
    let totalComDesconto = promocao(totalBruto, quantidadeTotal);

    carrinhoDeCompras.forEach((produto, index) => {
        const div = document.createElement('div');
        div.className = 'produto-card d-flex mb-3 align-items-center justify-content-between';
        div.innerHTML = `
            <div>
                <h5>${produto.nome}</h5>
                <p>Preço unitário: R$ ${produto.preco.toFixed(2)}</p>
                <p>Total do item: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</p>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-secondary btn-sm me-1">-</button>
                <span class="mx-2">${produto.quantidade}</span>
                <button class="btn btn-secondary btn-sm ms-1">+</button>
            </div>
            <button class="btn btn-danger btn-sm ms-3">Remover</button>
        `;

        const btnMenos = div.querySelectorAll('button')[0];
        const btnMais = div.querySelectorAll('button')[1];
        const btnRemover = div.querySelectorAll('button')[2];

        btnMenos.addEventListener('click', () => {
            if (produto.quantidade > 1) {
                produto.quantidade--;
            } else {
                carrinhoDeCompras.splice(index, 1);
            }
            salvarCarrinho();
            renderCarrinho();
        });

        btnMais.addEventListener('click', () => {
            produto.quantidade++;
            salvarCarrinho();
            renderCarrinho();
        });

        btnRemover.addEventListener('click', () => {
            carrinhoDeCompras.splice(index, 1);
            salvarCarrinho();
            renderCarrinho();
        });

        lista.appendChild(div);
    });

    document.getElementById('total-geral').innerText = 
        `Total: R$ ${totalBruto.toFixed(2)} | Com desconto: R$ ${totalComDesconto.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.produto-card').forEach(card => {
        const nome = card.querySelector('h3').innerText;
        const precoTexto = card.querySelector('p').innerText;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

        const produtoEncontrado = produtos.find(p => p.nome === nome);
        if (!produtoEncontrado) return;

        card.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            adicionarAoCarrinho(produtoEncontrado.id, produtoEncontrado.nome, produtoEncontrado.tamanho, produtoEncontrado.preco);
            window.location.href = "carrinho.html";
        });
    });

    renderCarrinho();
});
