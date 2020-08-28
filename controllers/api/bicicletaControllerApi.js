//trallendo la variable var
var Bicicleta = require('../../models/bicicleta');

//obteniendo listado
exports.Bicicleta_list = function(req, res){
    //me devolvera un json
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.Bicicleta_create = function(req, res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    //agregando objeto
    Bicicleta.add(bici);
    //repuesta al ser aceptado
    res.status(200).json({
        bicicleta: bici
    });
}

exports.Bicicleta_delete = function(req, res){
    Bicicleta.removeByid(req.body.id);
    //no hay contenido en la respuesta 204
    res.status(204).send();
}