var express = require('express');
var router = express.Router();
const ordemCompraController = require('../controllers/ordemcompraController');

router.get('/', ordemCompraController.listar);
router.get('/nova', ordemCompraController.formNova);
router.post('/nova', ordemCompraController.criar);

router.get('/editar/:id', ordemCompraController.formEditar);
router.post('/editar/:id', ordemCompraController.editar);

router.post('/excluir/:id', ordemCompraController.excluir);

module.exports = router;