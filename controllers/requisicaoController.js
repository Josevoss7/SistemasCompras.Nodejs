exports.listar = (req, res) => {
  const requisicoes = [
    { id: 1, solicitante: 'Carlos Silva', setor: 'TI', status: 'ABERTA' },
    { id: 2, solicitante: 'Mariana Souza', setor: 'Compras', status: 'APROVADA' },
    { id: 3, solicitante: 'João Pedro', setor: 'Financeiro', status: 'ATENDIDA' }
  ];

  res.render('requisicoes', {
    requisicoes,
    mensagem: req.query.mensagem || null
  });
};

exports.formNova = (req, res) => {
  const itens = [
    {
      item: 1,
      codigo: '009',
      descricao: 'TRANSFORMADOR ENTRADA 220/110V 2000 WATS',
      un: 'UN',
      qtd: 10,
      valorUnitario: '95,81',
      desconto: '0,00',
      valorTotal: '958,10'
    },
    {
      item: 2,
      codigo: 'N314',
      descricao: 'IMPRESSORA XEROX NÚVERA N314',
      un: 'UN',
      qtd: 1,
      valorUnitario: '75.000,00',
      desconto: '0,00',
      valorTotal: '75.000,00'
    }
  ];

  res.render('nova-requisicao', {
    itens,
    dados: {}
  });
};

exports.criar = (req, res) => {
  console.log('Nova requisição recebida:', req.body);
  res.redirect('/requisicoes?mensagem=Requisição criada com sucesso');
};