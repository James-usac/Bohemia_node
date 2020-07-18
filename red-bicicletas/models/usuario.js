var mongoose = require('mongoose');
var Reserva = require('./reserva');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
const brcypt = require('bcrypt')
//aleatoridad en la encryptacion
const saltRouds = 10; 

const validateEmail = function(email){
    const re = '/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/'
    return re.test(email);
}

var usuarioShema = new Schema({ 
    nombre: {
        type: String,
        trim: true,
        required : [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'El correo es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email valido'],
        match: [/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

//antes de hacer el save ejecute esta funcion
usuarioShema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = brcypt.hashSync(this.password, saltRouds);
    }
    next();
});

//comparar si el estring es valido
usuarioShema.methods.validPassword = function(password){
    return brcypt.compareSync(password, this.password)
}

//agregar como plugin, sirve para el unique
usuarioShema.plugin(uniqueValidator, {message: 'El {PATH} ya exite con otro usuario'});


usuarioShema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta:biciId, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = mongoose.model('Usuario',usuarioShema);