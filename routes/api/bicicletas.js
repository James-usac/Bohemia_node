var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletaControllerApi');

router.get('/',bicicletaController.Bicicleta_list);
router.post('/create',bicicletaController.Bicicleta_create);
router.delete('/delete',bicicletaController.Bicicleta_delete);

module.exports = router;