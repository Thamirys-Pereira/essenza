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
        nome: "Bodysuit Fetish",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 59.95
    },

    {
        id: 1005,
        nome: "Bodysuit Fetish",
        colecao: "Easywear, 2025",
        tamanho: "PP, P, M, G",
        preco: 48.30
    }
];

console.log(bodysuit);


const saias = [
    {
        id: 1006,
        nome: "Serving Shine - ",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 89.40
    },

    {
        id: 1007,
        nome: "Girl Boss - ",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 115
    },

    {
        id: 1008,
        nome: "Goth Princess - ",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 84
    },

    {
        id: 1009,
        nome: "Nana - saia mini assimétrica",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 57.15
    },

    {
        id: 1010,
        nome: "Deconstruction - ",
        colecao: "Easywear, 2025",
        tamanho: "36, 38, 40, 42, 44, 46, 48, 50",
        preco: 104.17
    },
];

console.log(saias);

const produtos = [...bodysuit, ...saias];
console.log(produtos);

//carrinho

const carrinhoDeCompras = [];

function adicionarAoCarrinho (id, nome, tamanho, preco) {
    const produtoExistente = carrinhoDeCompras.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinhoDeCompras.push({id, nome, tamanho, preco, quantidade: 1})
    };

};

produtos.forEach(produto => adicionarAoCarrinho(produto.id, produto.nome, produto.tamanho, produto.preco));

function calcularTotal() {
  return carrinhoDeCompras.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
};

function promocao(preco, quantidade) {
    let desconto = 0;

    if (quantidade >= 5) {
        desconto = preco * 0.15;
    } else if (quantidade >= 3) {
        desconto = preco * 0.10; 
    } else if (quantidade >= 2) {
        desconto = preco * 0.05;
    };

    const precoFinal = preco - desconto;
    return precoFinal;
}
