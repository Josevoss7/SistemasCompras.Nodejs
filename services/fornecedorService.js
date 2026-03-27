const fornecedorModel = require('../models/fornecedorModel');

exports.listarTodos = async () => {
  return await fornecedorModel.listarFornecedores();
};

exports.buscarPorId = async (id) => {
  return await fornecedorModel.buscarFornecedorPorId(id);
};

exports.criar = async (dados) => {
  return await fornecedorModel.criarFornecedor(dados);
};

exports.atualizar = async (id, dados) => {
  const fornecedorExistente = await fornecedorModel.buscarFornecedorPorId(id);

  if (!fornecedorExistente) {
    return null;
  }

  await fornecedorModel.atualizarFornecedor(id, dados);
  return true;
};

exports.remover = async (id) => {
  const fornecedorExistente = await fornecedorModel.buscarFornecedorPorId(id);

  if (!fornecedorExistente) {
    return false;
  }

  await fornecedorModel.excluirFornecedor(id);
  return true;
};