const fornecedorService = require('../services/fornecedorService');

exports.listar = async (req, res) => {
  try {
    const fornecedores = await fornecedorService.listarTodos();

    res.render('fornecedores', {
      fornecedores,
      mensagem: req.query.mensagem || null
    });
  } catch (erro) {
    console.error('Erro ao listar fornecedores:', erro);
    res.redirect('/fornecedores?mensagem=Erro ao listar fornecedores');
  }
};

exports.formNovo = (req, res) => {
  res.render('novo-fornecedor', {
    erro: null,
    dados: {}
  });
};

exports.criar = async (req, res) => {
  try {
    const {
      cnpj,
      razaoSocial,
      telefone,
      email,
      inscricaoEstadual,
      cpf,
      cep,
      celular
    } = req.body;

    const apenasNumeros = /^\d+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cnpj || !razaoSocial || !telefone || !email) {
      return res.render('novo-fornecedor', {
        erro: 'Preencha os campos obrigatórios: CNPJ, Razão Social, Telefone e E-mail.',
        dados: req.body
      });
    }

    if (!apenasNumeros.test(cnpj) || cnpj.length !== 14) {
      return res.render('novo-fornecedor', {
        erro: 'O CNPJ deve conter apenas números e 14 dígitos.',
        dados: req.body
      });
    }

    if (inscricaoEstadual && !apenasNumeros.test(inscricaoEstadual)) {
      return res.render('novo-fornecedor', {
        erro: 'A inscrição estadual deve conter apenas números.',
        dados: req.body
      });
    }

    if (cpf && (!apenasNumeros.test(cpf) || cpf.length !== 11)) {
      return res.render('novo-fornecedor', {
        erro: 'O CPF deve conter apenas números e 11 dígitos.',
        dados: req.body
      });
    }

    if (cep && (!apenasNumeros.test(cep) || cep.length !== 8)) {
      return res.render('novo-fornecedor', {
        erro: 'O CEP deve conter apenas números e 8 dígitos.',
        dados: req.body
      });
    }

    if (!apenasNumeros.test(telefone) || telefone.length < 10 || telefone.length > 11) {
      return res.render('novo-fornecedor', {
        erro: 'O telefone deve conter apenas números e ter 10 ou 11 dígitos.',
        dados: req.body
      });
    }

    if (celular && (!apenasNumeros.test(celular) || celular.length < 10 || celular.length > 11)) {
      return res.render('novo-fornecedor', {
        erro: 'O celular deve conter apenas números e ter 10 ou 11 dígitos.',
        dados: req.body
      });
    }

    if (!emailValido.test(email)) {
      return res.render('novo-fornecedor', {
        erro: 'Informe um e-mail válido.',
        dados: req.body
      });
    }

    await fornecedorService.criar(req.body);

    res.redirect('/fornecedores?mensagem=Fornecedor cadastrado com sucesso');
  } catch (erro) {
    console.error('Erro ao criar fornecedor:', erro);
    res.render('novo-fornecedor', {
      erro: 'Erro ao cadastrar fornecedor.',
      dados: req.body
    });
  }
};

exports.formEditar = async (req, res) => {
  try {
    const fornecedor = await fornecedorService.buscarPorId(req.params.id);

    if (!fornecedor) {
      return res.redirect('/fornecedores?mensagem=Fornecedor não encontrado');
    }

    res.render('editar-fornecedor', {
      erro: null,
      dados: fornecedor
    });
  } catch (erro) {
    console.error('Erro ao carregar fornecedor para edição:', erro);
    res.redirect('/fornecedores?mensagem=Erro ao carregar fornecedor');
  }
};

exports.editar = async (req, res) => {
  try {
    const {
      cnpj,
      razaoSocial,
      telefone,
      email,
      inscricaoEstadual,
      cpf,
      cep,
      celular
    } = req.body;

    const apenasNumeros = /^\d+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cnpj || !razaoSocial || !telefone || !email) {
      return res.render('editar-fornecedor', {
        erro: 'Preencha os campos obrigatórios: CNPJ, Razão Social, Telefone e E-mail.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (!apenasNumeros.test(cnpj) || cnpj.length !== 14) {
      return res.render('editar-fornecedor', {
        erro: 'O CNPJ deve conter apenas números e 14 dígitos.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (inscricaoEstadual && !apenasNumeros.test(inscricaoEstadual)) {
      return res.render('editar-fornecedor', {
        erro: 'A inscrição estadual deve conter apenas números.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (cpf && (!apenasNumeros.test(cpf) || cpf.length !== 11)) {
      return res.render('editar-fornecedor', {
        erro: 'O CPF deve conter apenas números e 11 dígitos.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (cep && (!apenasNumeros.test(cep) || cep.length !== 8)) {
      return res.render('editar-fornecedor', {
        erro: 'O CEP deve conter apenas números e 8 dígitos.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (!apenasNumeros.test(telefone) || telefone.length < 10 || telefone.length > 11) {
      return res.render('editar-fornecedor', {
        erro: 'O telefone deve conter apenas números e ter 10 ou 11 dígitos.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (celular && (!apenasNumeros.test(celular) || celular.length < 10 || celular.length > 11)) {
      return res.render('editar-fornecedor', {
        erro: 'O celular deve conter apenas números e ter 10 ou 11 dígitos.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    if (!emailValido.test(email)) {
      return res.render('editar-fornecedor', {
        erro: 'Informe um e-mail válido.',
        dados: {
          id: req.params.id,
          ...req.body
        }
      });
    }

    const fornecedorAtualizado = await fornecedorService.atualizar(req.params.id, req.body);

    if (!fornecedorAtualizado) {
      return res.redirect('/fornecedores?mensagem=Fornecedor não encontrado');
    }

    res.redirect('/fornecedores?mensagem=Fornecedor atualizado com sucesso');
  } catch (erro) {
    console.error('Erro ao editar fornecedor:', erro);
    res.render('editar-fornecedor', {
      erro: 'Erro ao atualizar fornecedor.',
      dados: {
        id: req.params.id,
        ...req.body
      }
    });
  }
};

exports.excluir = async (req, res) => {
  try {
    const removido = await fornecedorService.remover(req.params.id);

    if (!removido) {
      return res.redirect('/fornecedores?mensagem=Fornecedor não encontrado');
    }

    res.redirect('/fornecedores?mensagem=Fornecedor excluído com sucesso');
  } catch (erro) {
    console.error('Erro ao excluir fornecedor:', erro);
    res.redirect('/fornecedores?mensagem=Erro ao excluir fornecedor');
  }
};