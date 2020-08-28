//modulo de rutas de express
var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuarios');

router.get('/',usuariosController.list);
router.get('/create',usuariosController.create_get);
router.post('/create',usuariosController.create);
//:id enviamos desde la ruta el parametro
router.get('/:id/update',usuariosController.update_get);
router.post('/:id/update',usuariosController.update);
router.post('/:id/delete',usuariosController.delete);

module.exports = router;