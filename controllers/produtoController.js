const produtos = [
  { id: 1, nome: 'Notebook Dell', preco: 3500, estoque: 10, categoria: 'Informática' },
  { id: 2, nome: 'Mouse Logitech', preco: 120, estoque: 50, categoria: 'Periféricos' },
  { id: 3, nome: 'Teclado Mecânico', preco: 250, estoque: 20, categoria: 'Periféricos' },
  { id: 4, nome: 'Monitor LG 24', preco: 899, estoque: 12, categoria: 'Monitores' }
];

exports.listar = (req, res) => {
  res.render('produtos', {
    produtos,
    mensagem: req.query.mensagem || null
  });
};

exports.formNovo = (req, res) => {
  res.render('novo-produto', {
    erro: null,
    dados: {}
  });
};

exports.criar = (req, res) => {
  const { nome, categoria, preco, estoque } = req.body;

  if (!nome || !categoria || !preco || !estoque) {
    return res.render('novo-produto', {
      erro: 'Preencha todos os campos.',
      dados: req.body
    });
  }

  const novoProduto = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    categoria,
    preco: Number(preco),
    estoque: Number(estoque)
  };

  produtos.push(novoProduto);

  res.redirect('/produtos?mensagem=Produto cadastrado com sucesso');
};