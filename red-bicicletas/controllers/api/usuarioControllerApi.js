const Usuario = require('../../models/usuario')

exports.usuarios_list = function(req, res){
    Usuario.find({}, function(err, usuarioss){
        res.status(200).json({
            usuarios: usuarioss
        })
    })
}

exports.usuarios_create = function(req, res){
    let user = new Usuario({name: req.body.nombre})
    user.save(user, (err) => {
        res.status(200).json(user)
    })
}

exports.usuario_reserva = function(req, res){
    Usuario.findById(req.body.id, function(err, usuario){
        // console.log(usuario)
        usuario.reserva(usuario._id, req.body.bici_id, req.body.desde, req.body.hasta, (err) => {
            // console.log('Reserva!!')
            res.status(200).send("Reservado!")
        })
    })
}