const ordemCompraModel = require('../models/ordemCompraModel');

exports.listarTodos = async () => {
  return await ordemCompraModel.listarOrdensCompra();
};

exports.buscarPorId = async (id) => {
  return await ordemCompraModel.buscarOrdemCompraPorId(id);
};

exports.criar = async (dados) => {
  return await ordemCompraModel.criarOrdemCompra(dados);
};

exports.atualizar = async (id, dados) => {
  const ordemExistente = await ordemCompraModel.buscarOrdemCompraPorId(id);

  if (!ordemExistente) {
    return null;
  }

  await ordemCompraModel.atualizarOrdemCompra(id, dados);
  return true;
};

exports.remover = async (id) => {
  const ordemExistente = await ordemCompraModel.buscarOrdemCompraPorId(id);

  if (!ordemExistente) {
    return null;
  }

  await ordemCompraModel.excluirOrdemCompra(id);
  return true;
};

exports.listarFornecedoresMaisUsados = async () => {
  return await ordemCompraModel.listarFornecedoresMaisUsados();
};

exports.listarComprasPorMes = async () => {
  return await ordemCompraModel.listarComprasPorMes();
};

exports.contarPendentes = async () => {
  return await ordemCompraModel.contarOrdensPendentes();
};

exports.somarValorTotal = async () => {
  return await ordemCompraModel.somarValorTotalCompras();
};