const produtoModel = require('../models/produtoModel');

exports.listarTodos = async () => {
  return await produtoModel.listarProdutos();
};

exports.buscarPorId = async (id) => {
  return await produtoModel.buscarProdutoPorId(id);
};

exports.criar = async (dados) => {
  return await produtoModel.criarProduto(dados);
};

exports.atualizar = async (id, dados) => {
  const produtoExistente = await produtoModel.buscarProdutoPorId(id);

  if (!produtoExistente) {
    return null;
  }

  await produtoModel.atualizarProduto(id, dados);
  return true;
};

exports.remover = async (id) => {
  const produtoExistente = await produtoModel.buscarProdutoPorId(id);

  if (!produtoExistente) {
    return null;
  }

  await produtoModel.excluirProduto(id);
  return true;
};