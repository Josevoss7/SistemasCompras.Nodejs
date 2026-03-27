var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listar);
router.get('/novo', produtoController.formNovo);
router.post('/novo', produtoController.criar);

router.get('/editar/:id', produtoController.formEditar);
router.post('/editar/:id', produtoController.editar);

router.post('/excluir/:id', produtoController.excluir);

module.exports = router;