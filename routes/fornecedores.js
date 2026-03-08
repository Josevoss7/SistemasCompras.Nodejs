var express = require('express');
var router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/', fornecedorController.listar);

module.exports = router;