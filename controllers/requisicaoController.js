exports.listar = (req, res) => {
  const fornecedores = [
    { id: 1, nome: 'Fornecedor Alpha', cnpj: '12.345.678/0001-90', email: 'alpha@email.com', telefone: '(11) 99999-1111' },
    { id: 2, nome: 'Fornecedor Beta', cnpj: '98.765.432/0001-10', email: 'beta@email.com', telefone: '(11) 99999-2222' },
    { id: 3, nome: 'Fornecedor Gama', cnpj: '11.222.333/0001-44', email: 'gama@email.com', telefone: '(11) 99999-3333' }
  ];

  res.render('fornecedores', { fornecedores });
};