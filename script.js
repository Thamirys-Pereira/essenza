const bodysuit = [
    {
        id: 1001,
        nome: "Bodysuit Fetish",
        colecao: "Easywear, 2025",
        imagem: "img/bodysuit_fetish.jpg",
        preco: 79.99
    },
    {
        id: 1002,
        nome: "Bodysuit Fantasy",
        colecao: "Easywear, 2025",
        imagem: "img/bodysuit_fantasy.jpg",
        preco: 64.93
    },
    {
        id: 1003,
        nome: "Bodysuit Chic",
        colecao: "Easywear, 2025",
        imagem: "img/bodysuit_chic.jpg",
        preco: 48.30
    },
    {
        id: 1004,
        nome: "Bodysuit Dreamer",
        colecao: "Easywear, 2025",
        imagem: "img/bodysuit_dreamer.jpg",
        preco: 59.95
    },
    {
        id: 1005,
        nome: "Bodysuit Fatale",
        colecao: "Easywear, 2025",
        imagem: "img/bodysuit_fatale.jpg",
        preco: 48.30
    }
];

const saias = [
    {
        id: 1006,
        nome: "Reverse Corset ",
        colecao: "Easywear, 2025",
        imagem: "img/saia_reverse_corset.jpg",
        preco: 89.40
    },
    {
        id: 1007,
        nome: "Gothic Fairy",
        colecao: "Easywear, 2025",
        imagem: "img/saia_gothic_fairy.jpg",
        preco: 115
    },
    {
        id: 1008,
        nome: "Feather",
        colecao: "Easywear, 2025",
        imagem: "img/saia_feather.jpg",
        preco: 84
    },
    {
        id: 1009,
        nome: "Nana",
        colecao: "Easywear, 2025",
        imagem: "img/saiaMiniAssimetrica.jpg",
        preco: 57.15
    },
    {
        id: 1010,
        nome: "Desconstruction",
        colecao: "Easywear, 2025",
        imagem: "img/saia_desconstruction.jpg",
        preco: 104.17
    },
];

const produtos = [...bodysuit, ...saias];
const tamanhosBodysuit = ["P", "M", "G", "GG"];
const tamanhosSaias = ["36", "38", "40", "42", "44"];

let carrinhoDeCompras = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras));
};

function adicionarAoCarrinho(id, nome, tamanho, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const existente = carrinho.find(item => item.id === id && item.tamanho === tamanho);

  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ id, nome, tamanho, preco, imagem, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

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
            <div class="d-flex align-items-center">
                <img src="${produto.imagem}" alt="${produto.nome}" width="80" class="me-3">
                <div>
                    <h5>${produto.nome}</h5>
                    <p>Tamanho: ${produto.tamanho}</p>
                    <p>Preço unitário: R$ ${produto.preco.toFixed(2)}</p>
                    <p>Total do item: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</p>
                </div>
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
    const botao = card.querySelector('button');
    const id = parseInt(botao.getAttribute('data-id'));
    const selectTamanho = document.getElementById(`tamanho-${id}`);

    const produtoEncontrado = produtos.find(p => p.id === id);
    if (!produtoEncontrado) return;

    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const tamanhoSelecionado = selectTamanho ? selectTamanho.value : "";
      adicionarAoCarrinho(produtoEncontrado.id, produtoEncontrado.nome, tamanhoSelecionado, produtoEncontrado.preco, produtoEncontrado.imagem);
      window.location.href = "carrinho.html";
    });
  });

  renderCarrinho();
});