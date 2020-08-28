//exportando modelo
var Bicicleta = require('../models/bicicleta');

//llamando a la vista
exports.Bicicleta_list = function(req, res){
    //enviando arrays
    res.render('bicicletas/index',{bicis: Bicicleta.allBicis});
}

exports.Bicicleta_create_get = function(req, res){
    res.render('bicicletas/create');
}

//con post usamos req
exports.Bicicleta_create_post = function(req, res){
    //body porque esta en el cuerpo nuestros atributos
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    //redireccionando a bicicletas index
    res.redirect('/bicicletas');

}

//update
exports.Bicicleta_update_get = function(req, res){
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici});
}

//con post usamos req
exports.Bicicleta_update_post = function(req, res){
    //Modificando atributo con req.params.id guardamos el valor del parametro
    var bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    //redireccionando a bicicletas index
    res.redirect('/bicicletas');

}

exports.Bicicleta_delete_post = function(req, res){
    //le envio el id
    Bicicleta.removeByid(req.body.id);

    res.redirect('/bicicletas');
}