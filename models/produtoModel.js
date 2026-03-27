const { pool } = require('../config/db');

async function listarProdutos() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM produtos ORDER BY id DESC');
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function buscarProdutoPorId(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
}

async function criarProduto(produto) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO produtos (nome, descricao, categoria, preco, estoque, fornecedor)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        produto.nome,
        produto.descricao || '',
        produto.categoria,
        produto.preco,
        produto.estoque,
        produto.fornecedor || ''
      ]
    );
    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
}

async function atualizarProduto(id, produto) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE produtos
       SET nome = ?, descricao = ?, categoria = ?, preco = ?, estoque = ?, fornecedor = ?
       WHERE id = ?`,
      [
        produto.nome,
        produto.descricao || '',
        produto.categoria,
        produto.preco,
        produto.estoque,
        produto.fornecedor || '',
        id
      ]
    );
  } finally {
    if (conn) conn.release();
  }
}

async function excluirProduto(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM produtos WHERE id = ?', [id]);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto
};