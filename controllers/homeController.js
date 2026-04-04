const produtoService = require('../services/produtoService');
const fornecedorService = require('../services/fornecedorService');
const requisicaoService = require('../services/requisicaoService');
const ordemCompraService = require('../services/ordemCompraService');

function montarClasseBarra(valor, maximo) {
  if (!maximo || maximo <= 0) return 'bar-h-20';

  const percentual = Math.max(20, Math.round((valor / maximo) * 100));

  if (percentual >= 90) return 'bar-h-95';
  if (percentual >= 75) return 'bar-h-75';
  if (percentual >= 60) return 'bar-h-65';
  if (percentual >= 45) return 'bar-h-55';
  return 'bar-h-45';
}

exports.index = async (req, res) => {
  try {
    const [
      totalProdutos,
      totalFornecedores,
      requisicoesAbertas,
      ordensPendentes,
      ordensTodas,
      requisicoesTodas,
      fornecedoresMaisUsadosDb,
      valorTotalCompras,
      comprasPorMesDb
    ] = await Promise.all([
      produtoService.contar(),
      fornecedorService.contar(),
      requisicaoService.contarAbertas(),
      ordemCompraService.contarPendentes(),
      ordemCompraService.listarTodos(),
      requisicaoService.listarTodos(),
      ordemCompraService.listarFornecedoresMaisUsados(),
      ordemCompraService.somarValorTotal(),
      ordemCompraService.listarComprasPorMes()
    ]);

    const dashboard = {
      totalProdutos,
      totalFornecedores,
      requisicoesAbertas,
      ordensPendentes,
      valorTotalCompras
    };

    const ultimasOrdens = ordensTodas.slice(0, 4).map(ordem => ({
      id: ordem.id,
      fornecedor: ordem.fornecedor_nome || '-',
      data: ordem.created_at
        ? new Date(ordem.created_at).toLocaleDateString('pt-BR')
        : '-',
      valor: Number(ordem.preco_unitario || 0) * Number(ordem.quantidade || 0),
      status: ordem.status
    }));

    const ultimasRequisicoes = requisicoesTodas.slice(0, 4).map(req => ({
      id: req.id,
      solicitante: req.solicitante,
      setor: req.setor,
      status: req.status
    }));

    const fornecedoresMaisUsados = fornecedoresMaisUsadosDb.map(f => ({
      nome: f.nome || '-',
      pedidos: Number(f.total_pedidos || 0)
    }));

    const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const mapaCompras = {};
    comprasPorMesDb.forEach(item => {
      mapaCompras[Number(item.mes_numero)] = Number(item.total || 0);
    });

    const ultimos6Meses = [];
    const hoje = new Date();

    for (let i = 5; i >= 0; i--) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const mesNumero = data.getMonth() + 1;
      ultimos6Meses.push({
        mes: nomesMeses[data.getMonth()],
        mesNumero,
        valor: mapaCompras[mesNumero] || 0
      });
    }

    const maiorValor = Math.max(...ultimos6Meses.map(item => item.valor), 0);

    const comprasPorMes = ultimos6Meses.map(item => ({
      mes: item.mes,
      valor: item.valor,
      classe: montarClasseBarra(item.valor, maiorValor)
    }));

    res.render('index', {
      dashboard,
      ultimasOrdens,
      comprasPorMes,
      ultimasRequisicoes,
      fornecedoresMaisUsados
    });
  } catch (erro) {
    console.error('Erro ao carregar dashboard:', erro);

    res.render('index', {
      dashboard: {
        totalProdutos: 0,
        totalFornecedores: 0,
        requisicoesAbertas: 0,
        ordensPendentes: 0,
        valorTotalCompras: 0
      },
      ultimasOrdens: [],
      comprasPorMes: [],
      ultimasRequisicoes: [],
      fornecedoresMaisUsados: []
    });
  }
};