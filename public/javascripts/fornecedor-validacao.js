function somenteNumeros(campo) {
  campo.value = campo.value.replace(/\D/g, '');
}

async function buscarCep(campo) {
  const cep = campo.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert('CEP não encontrado.');
      return;
    }

    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    if (endereco) endereco.value = dados.logradouro || '';
    if (bairro) bairro.value = dados.bairro || '';
    if (cidade) cidade.value = dados.localidade || '';
    if (estado) estado.value = dados.uf || '';
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    alert('Não foi possível consultar o CEP.');
  }
}