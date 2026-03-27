function limparNumero(valor) {
  return valor.replace(/\D/g, '');
}

function somenteNumeros(campo) {
  campo.value = limparNumero(campo.value);
}

function mascaraCNPJ(campo) {
  let v = limparNumero(campo.value);

  v = v.slice(0, 14);
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');

  campo.value = v;
}

function mascaraCPF(campo) {
  let v = limparNumero(campo.value);

  v = v.slice(0, 11);
  v = v.replace(/^(\d{3})(\d)/, '$1.$2');
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1-$2');

  campo.value = v;
}

function mascaraCEP(campo) {
  let v = limparNumero(campo.value);

  v = v.slice(0, 8);
  v = v.replace(/^(\d{5})(\d)/, '$1-$2');

  campo.value = v;
}

function mascaraTelefone(campo) {
  let v = limparNumero(campo.value);

  v = v.slice(0, 11);

  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    v = v.replace(/^(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
  }

  campo.value = v;
}