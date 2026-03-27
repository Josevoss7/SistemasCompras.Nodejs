var express = require('express');
var router = express.Router();
const ordemCompraController = require('../controllers/ordemCompraController');

router.get('/', ordemCompraController.listar);
router.get('/nova', ordemCompraController.formNova);
router.post('/nova', ordemCompraController.criar);

module.exports = router;