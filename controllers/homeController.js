exports.index = (req, res) => {
  const dashboard = {
    totalProdutos: 24,
    totalFornecedores: 8,
    requisicoesAbertas: 5,
    ordensPendentes: 3,
    valorTotalCompras: 18450.90
  };

  const ultimasOrdens = [
    { id: 101, fornecedor: 'Fornecedor Alpha', data: '08/03/2026', valor: 3500.00, status: 'PENDENTE' },
    { id: 102, fornecedor: 'Fornecedor Beta', data: '07/03/2026', valor: 1200.50, status: 'LIBERADA' },
    { id: 103, fornecedor: 'Fornecedor Gama', data: '06/03/2026', valor: 890.00, status: 'RECEBIDA' },
    { id: 104, fornecedor: 'Fornecedor Delta', data: '05/03/2026', valor: 2780.40, status: 'PENDENTE' }
  ];

   const comprasPorMes = [
  { mes: 'Jan', valor: 6200, classe: 'bar-h-45' },
  { mes: 'Fev', valor: 8400, classe: 'bar-h-65' },
  { mes: 'Mar', valor: 12400, classe: 'bar-h-95' },
  { mes: 'Abr', valor: 7300, classe: 'bar-h-55' },
  { mes: 'Mai', valor: 9800, classe: 'bar-h-75' },
  { mes: 'Jun', valor: 11400, classe: 'bar-h-88' }
];

  const ultimasRequisicoes = [
    { id: 301, solicitante: 'Carlos Silva', setor: 'TI', status: 'ABERTA' },
    { id: 302, solicitante: 'Mariana Souza', setor: 'Compras', status: 'APROVADA' },
    { id: 303, solicitante: 'João Pedro', setor: 'Financeiro', status: 'ATENDIDA' },
    { id: 304, solicitante: 'Ana Lima', setor: 'RH', status: 'ABERTA' }
  ];

  const fornecedoresMaisUsados = [
    { nome: 'Fornecedor Alpha', pedidos: 18 },
    { nome: 'Fornecedor Beta', pedidos: 12 },
    { nome: 'Fornecedor Gama', pedidos: 9 },
    { nome: 'Fornecedor Delta', pedidos: 7 }
  ];

  res.render('index', {
    dashboard,
    ultimasOrdens,
    comprasPorMes,
    ultimasRequisicoes,
    fornecedoresMaisUsados
  });
};