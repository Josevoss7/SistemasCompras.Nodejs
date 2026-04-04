const ordemCompraService = require('../services/ordemCompraService');
const fornecedorService = require('../services/fornecedorService');
const produtoService = require('../services/produtoService');
const requisicaoService = require('../services/requisicaoService');

exports.listar = async (req, res) => {
  try {
    const ordens = await ordemCompraService.listarTodos();

    res.render('ordens-compra', {
      ordens,
      mensagem: req.query.mensagem || null
    });
  } catch (erro) {
    console.error('Erro ao listar ordens de compra:', erro);
    res.redirect('/ordens-compra?mensagem=Erro ao listar ordens de compra');
  }
};

exports.formNova = async (req, res) => {
  try {
    const fornecedores = await fornecedorService.listarTodos();
    const produtos = await produtoService.listarTodos();
    const requisicoes = await requisicaoService.listarTodos();

    res.render('nova-ordem-compra', {
      dados: {},
      erro: null,
      fornecedores,
      produtos,
      requisicoes
    });
  } catch (erro) {
    console.error('Erro ao abrir formulário de ordem de compra:', erro);
    res.render('nova-ordem-compra', {
      dados: {},
      erro: 'Erro ao carregar dados do formulário.',
      fornecedores: [],
      produtos: [],
      requisicoes: []
    });
  }
};

exports.criar = async (req, res) => {
  try {
    const { fornecedor_id, produto_id, quantidade, preco_unitario } = req.body;
    const fornecedores = await fornecedorService.listarTodos();
    const produtos = await produtoService.listarTodos();
    const requisicoes = await requisicaoService.listarTodos();

    if (!fornecedor_id || !produto_id || !quantidade || !preco_unitario) {
      return res.render('nova-ordem-compra', {
        dados: req.body,
        erro: 'Preencha os campos obrigatórios.',
        fornecedores,
        produtos,
        requisicoes
      });
    }

    await ordemCompraService.criar(req.body);

    res.redirect('/ordens-compra?mensagem=Ordem de compra criada com sucesso');
  } catch (erro) {
    console.error('Erro ao criar ordem de compra:', erro);
    const fornecedores = await fornecedorService.listarTodos().catch(() => []);
    const produtos = await produtoService.listarTodos().catch(() => []);
    const requisicoes = await requisicaoService.listarTodos().catch(() => []);
    res.render('nova-ordem-compra', {
      dados: req.body,
      erro: 'Erro ao criar ordem de compra.',
      fornecedores,
      produtos,
      requisicoes
    });
  }
};

exports.formEditar = async (req, res) => {
  try {
    const ordem = await ordemCompraService.buscarPorId(req.params.id);
    const fornecedores = await fornecedorService.listarTodos();
    const produtos = await produtoService.listarTodos();
    const requisicoes = await requisicaoService.listarTodos();

    if (!ordem) {
      return res.redirect('/ordens-compra?mensagem=Ordem de compra não encontrada');
    }

    res.render('editar-ordem-compra', {
      dados: ordem,
      erro: null,
      fornecedores,
      produtos,
      requisicoes
    });
  } catch (erro) {
    console.error('Erro ao carregar ordem de compra:', erro);
    res.redirect('/ordens-compra?mensagem=Erro ao carregar ordem de compra');
  }
};

exports.editar = async (req, res) => {
  try {
    const { fornecedor_id, produto_id, quantidade, preco_unitario } = req.body;
    const fornecedores = await fornecedorService.listarTodos();
    const produtos = await produtoService.listarTodos();
    const requisicoes = await requisicaoService.listarTodos();

    if (!fornecedor_id || !produto_id || !quantidade || !preco_unitario) {
      return res.render('editar-ordem-compra', {
        dados: {
          id: req.params.id,
          ...req.body
        },
        erro: 'Preencha os campos obrigatórios.',
        fornecedores,
        produtos,
        requisicoes
      });
    }

    const atualizada = await ordemCompraService.atualizar(req.params.id, req.body);

    if (!atualizada) {
      return res.redirect('/ordens-compra?mensagem=Ordem de compra não encontrada');
    }

    res.redirect('/ordens-compra?mensagem=Ordem de compra atualizada com sucesso');
  } catch (erro) {
    console.error('Erro ao editar ordem de compra:', erro);
    const fornecedores = await fornecedorService.listarTodos().catch(() => []);
    const produtos = await produtoService.listarTodos().catch(() => []);
    const requisicoes = await requisicaoService.listarTodos().catch(() => []);
    res.render('editar-ordem-compra', {
      dados: {
        id: req.params.id,
        ...req.body
      },
      erro: 'Erro ao atualizar ordem de compra.',
      fornecedores,
      produtos,
      requisicoes
    });
  }
};

exports.excluir = async (req, res) => {
  try {
    const removida = await ordemCompraService.remover(req.params.id);

    if (!removida) {
      return res.redirect('/ordens-compra?mensagem=Ordem de compra não encontrada');
    }

    res.redirect('/ordens-compra?mensagem=Ordem de compra excluída com sucesso');
  } catch (erro) {
    console.error('Erro ao excluir ordem de compra:', erro);
    res.redirect('/ordens-compra?mensagem=Erro ao excluir ordem de compra');
  }
};