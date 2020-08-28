//modulo de rutas de express
var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta');

//protocolo http get pasar la ruta
//nos redirija a listado
router.get('/',bicicletaController.Bicicleta_list);
router.get('/create',bicicletaController.Bicicleta_create_get);
router.post('/create',bicicletaController.Bicicleta_create_post);
//:id enviamos desde la ruta el parametro
router.get('/:id/update',bicicletaController.Bicicleta_update_get);
router.post('/:id/update',bicicletaController.Bicicleta_update_post);
router.post('/:id/delete',bicicletaController.Bicicleta_delete_post);

module.exports = router;