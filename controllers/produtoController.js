const produtoService = require('../services/produtoService');
const fornecedorService = require('../services/fornecedorService');

exports.listar = async (req, res) => {
  try {
    const produtos = await produtoService.listarTodos();

    res.render('produtos', {
      produtos,
      mensagem: req.query.mensagem || null
    });
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    res.redirect('/produtos?mensagem=Erro ao listar produtos');
  }
};

exports.formNovo = async (req, res) => {
  try {
    const fornecedores = await fornecedorService.listarTodos();

    res.render('novo-produto', {
      erro: null,
      dados: {},
      fornecedores
    });
  } catch (erro) {
    console.error('Erro ao abrir formulário:', erro);
    res.render('novo-produto', {
      erro: 'Erro ao carregar fornecedores.',
      dados: {},
      fornecedores: []
    });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, categoria, preco, estoque } = req.body;
    const fornecedores = await fornecedorService.listarTodos();

    if (!nome || !categoria || !preco || !estoque) {
      return res.render('novo-produto', {
        erro: 'Preencha todos os campos.',
        dados: req.body,
        fornecedores
      });
    }

    await produtoService.criar(req.body);

    res.redirect('/produtos?mensagem=Produto cadastrado com sucesso');
  } catch (erro) {
    console.error('Erro ao criar produto:', erro);
    const fornecedores = await fornecedorService.listarTodos().catch(() => []);
    res.render('novo-produto', {
      erro: 'Erro ao cadastrar produto.',
      dados: req.body,
      fornecedores
    });
  }
};

exports.formEditar = async (req, res) => {
  try {
    const produto = await produtoService.buscarPorId(req.params.id);
    const fornecedores = await fornecedorService.listarTodos();

    if (!produto) {
      return res.redirect('/produtos?mensagem=Produto não encontrado');
    }

    res.render('editar-produto', {
      erro: null,
      dados: produto,
      fornecedores
    });
  } catch (erro) {
    console.error('Erro ao carregar produto para edição:', erro);
    res.redirect('/produtos?mensagem=Erro ao carregar produto');
  }
};

exports.editar = async (req, res) => {
  try {
    const { nome, categoria, preco, estoque } = req.body;
    const fornecedores = await fornecedorService.listarTodos();

    if (!nome || !categoria || !preco || !estoque) {
      return res.render('editar-produto', {
        erro: 'Preencha todos os campos.',
        dados: {
          id: req.params.id,
          ...req.body
        },
        fornecedores
      });
    }

    const produtoAtualizado = await produtoService.atualizar(req.params.id, req.body);

    if (!produtoAtualizado) {
      return res.redirect('/produtos?mensagem=Produto não encontrado');
    }

    res.redirect('/produtos?mensagem=Produto atualizado com sucesso');
  } catch (erro) {
    console.error('Erro ao editar produto:', erro);
    const fornecedores = await fornecedorService.listarTodos().catch(() => []);
    res.render('editar-produto', {
      erro: 'Erro ao atualizar produto.',
      dados: {
        id: req.params.id,
        ...req.body
      },
      fornecedores
    });
  }
};

exports.excluir = async (req, res) => {
  try {
    const removido = await produtoService.remover(req.params.id);

    if (!removido) {
      return res.redirect('/produtos?mensagem=Produto não encontrado');
    }

    res.redirect('/produtos?mensagem=Produto excluído com sucesso');
  } catch (erro) {
    console.error('Erro ao excluir produto:', erro);
    res.redirect('/produtos?mensagem=Erro ao excluir produto');
  }
};