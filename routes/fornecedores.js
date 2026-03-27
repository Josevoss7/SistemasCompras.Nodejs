var express = require('express');
var router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/', fornecedorController.listar);
router.get('/novo', fornecedorController.formNovo);
router.post('/novo', fornecedorController.criar);

router.get('/editar/:id', fornecedorController.formEditar);
router.post('/editar/:id', fornecedorController.editar);

router.post('/excluir/:id', fornecedorController.excluir);

module.exports = router;