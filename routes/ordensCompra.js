var express = require('express');
var router = express.Router();
const ordemCompraController = require('../controllers/ordemCompraController');

router.get('/', ordemCompraController.listar);

module.exports = router;