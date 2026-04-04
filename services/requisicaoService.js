const requisicaoModel = require('../models/requisicaoModel');

exports.listarTodos = async () => {
  return await requisicaoModel.listarRequisicoes();
};

exports.buscarPorId = async (id) => {
  return await requisicaoModel.buscarRequisicaoPorId(id);
};

exports.criar = async (dados) => {
  return await requisicaoModel.criarRequisicao(dados);
};

exports.atualizar = async (id, dados) => {
  const requisicaoExistente = await requisicaoModel.buscarRequisicaoPorId(id);

  if (!requisicaoExistente) {
    return null;
  }

  await requisicaoModel.atualizarRequisicao(id, dados);
  return true;
};

exports.remover = async (id) => {
  const requisicaoExistente = await requisicaoModel.buscarRequisicaoPorId(id);

  if (!requisicaoExistente) {
    return null;
  }

  await requisicaoModel.excluirRequisicao(id);
  return true;
};

exports.contarAbertas = async () => {
  return await requisicaoModel.contarRequisicoesAbertas();
};