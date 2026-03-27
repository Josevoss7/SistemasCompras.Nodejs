const { pool } = require('../config/db');

async function listarFornecedores() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM fornecedores ORDER BY nome ASC');
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function buscarFornecedorPorId(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM fornecedores WHERE id = ?', [id]);
    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
}

async function criarFornecedor(dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO fornecedores (nome, cnpj, email, telefone, endereco)
       VALUES (?, ?, ?, ?, ?)`,
      [
        dados.nomeFantasia || dados.razaoSocial || dados.nome,
        dados.cnpj || '',
        dados.email || '',
        dados.telefone || dados.celular || '',
        dados.endereco || ''
      ]
    );
    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
}

async function atualizarFornecedor(id, dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE fornecedores
       SET nome = ?, cnpj = ?, email = ?, telefone = ?, endereco = ?
       WHERE id = ?`,
      [
        dados.nomeFantasia || dados.razaoSocial || dados.nome,
        dados.cnpj || '',
        dados.email || '',
        dados.telefone || dados.celular || '',
        dados.endereco || '',
        id
      ]
    );
  } finally {
    if (conn) conn.release();
  }
}

async function excluirFornecedor(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM fornecedores WHERE id = ?', [id]);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  listarFornecedores,
  buscarFornecedorPorId,
  criarFornecedor,
  atualizarFornecedor,
  excluirFornecedor
};