var express = require('express');
var router = express.Router();
const requisicaoController = require('../controllers/requisicaoController');

router.get('/', requisicaoController.listar);

module.exports = router;