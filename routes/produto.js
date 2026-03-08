var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listar);
router.get('/novo', produtoController.formNovo);
router.post('/novo', produtoController.criar);

module.exports = router;