var express = require('express');
var router = express.Router();
const requisicaoController = require('../controllers/requisicaoController');

router.get('/', requisicaoController.listar);
router.get('/nova', requisicaoController.formNova);
router.post('/nova', requisicaoController.criar);

module.exports = router;