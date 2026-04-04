var express = require('express');
var router = express.Router();
const requisicaoController = require('../controllers/requisicaoController');

router.get('/', requisicaoController.listar);
router.get('/nova', requisicaoController.formNova);
router.post('/nova', requisicaoController.criar);

router.get('/editar/:id', requisicaoController.formEditar);
router.post('/editar/:id', requisicaoController.editar);

router.post('/excluir/:id', requisicaoController.excluir);

module.exports = router;