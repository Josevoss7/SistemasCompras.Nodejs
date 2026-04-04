const requisicaoService = require('../services/requisicaoService');
const produtoService = require('../services/produtoService');

exports.listar = async (req, res) => {
  try {
    const requisicoes = await requisicaoService.listarTodos();

    res.render('requisicoes', {
      requisicoes,
      mensagem: req.query.mensagem || null
    });
  } catch (erro) {
    console.error('Erro ao listar requisições:', erro);
    res.redirect('/requisicoes?mensagem=Erro ao listar requisições');
  }
};

exports.formNova = async (req, res) => {
  try {
    const produtos = await produtoService.listarTodos();

    res.render('nova-requisicao', {
      itens: [],
      dados: {},
      erro: null,
      produtos
    });
  } catch (erro) {
    console.error('Erro ao abrir formulário de requisição:', erro);
    res.render('nova-requisicao', {
      itens: [],
      dados: {},
      erro: 'Erro ao carregar produtos.',
      produtos: []
    });
  }
};

exports.criar = async (req, res) => {
  try {
    const { solicitante, setor, produto_id, quantidade } = req.body;
    const produtos = await produtoService.listarTodos();

    if (!solicitante || !setor || !produto_id || !quantidade) {
      return res.render('nova-requisicao', {
        itens: [],
        dados: req.body,
        erro: 'Preencha os campos obrigatórios.',
        produtos
      });
    }

    await requisicaoService.criar(req.body);

    res.redirect('/requisicoes?mensagem=Requisição criada com sucesso');
  } catch (erro) {
    console.error('Erro ao criar requisição:', erro);
    const produtos = await produtoService.listarTodos().catch(() => []);
    res.render('nova-requisicao', {
      itens: [],
      dados: req.body,
      erro: 'Erro ao criar requisição.',
      produtos
    });
  }
};

exports.formEditar = async (req, res) => {
  try {
    const requisicao = await requisicaoService.buscarPorId(req.params.id);
    const produtos = await produtoService.listarTodos();

    if (!requisicao) {
      return res.redirect('/requisicoes?mensagem=Requisição não encontrada');
    }

    res.render('editar-requisicao', {
      dados: requisicao,
      erro: null,
      produtos
    });
  } catch (erro) {
    console.error('Erro ao carregar requisição:', erro);
    res.redirect('/requisicoes?mensagem=Erro ao carregar requisição');
  }
};

exports.editar = async (req, res) => {
  try {
    const { solicitante, setor, produto_id, quantidade } = req.body;
    const produtos = await produtoService.listarTodos();

    if (!solicitante || !setor || !produto_id || !quantidade) {
      return res.render('editar-requisicao', {
        dados: {
          id: req.params.id,
          ...req.body
        },
        erro: 'Preencha os campos obrigatórios.',
        produtos
      });
    }

    const atualizado = await requisicaoService.atualizar(req.params.id, req.body);

    if (!atualizado) {
      return res.redirect('/requisicoes?mensagem=Requisição não encontrada');
    }

    res.redirect('/requisicoes?mensagem=Requisição atualizada com sucesso');
  } catch (erro) {
    console.error('Erro ao editar requisição:', erro);
    const produtos = await produtoService.listarTodos().catch(() => []);
    res.render('editar-requisicao', {
      dados: {
        id: req.params.id,
        ...req.body
      },
      erro: 'Erro ao atualizar requisição.',
      produtos
    });
  }
};

exports.excluir = async (req, res) => {
  try {
    const removido = await requisicaoService.remover(req.params.id);

    if (!removido) {
      return res.redirect('/requisicoes?mensagem=Requisição não encontrada');
    }

    res.redirect('/requisicoes?mensagem=Requisição excluída com sucesso');
  } catch (erro) {
    console.error('Erro ao excluir requisição:', erro);
    res.redirect('/requisicoes?mensagem=Erro ao excluir requisição');
  }
};