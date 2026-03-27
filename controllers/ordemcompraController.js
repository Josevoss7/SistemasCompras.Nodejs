exports.listar = (req, res) => {
  const ordens = [
    { id: 1, fornecedor: 'Fornecedor Alpha', data: '2026-03-07', valor: 5000, status: 'EMITIDA' },
    { id: 2, fornecedor: 'Fornecedor Beta', data: '2026-03-08', valor: 1200, status: 'PENDENTE' },
    { id: 3, fornecedor: 'Fornecedor Gama', data: '2026-03-09', valor: 350, status: 'RECEBIDA' }
  ];

  res.render('ordens', { ordens });
};

exports.formNova = (req, res) => {
  res.render('nova-ordem', {
    titulo: 'Salvar Ordem de Compra',
    dados: {}
  });
};

exports.criar = (req, res) => {
  console.log('Dados recebidos da ordem de compra:', req.body);

  res.redirect('/ordens-compra');
};