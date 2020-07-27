var mongoose = require('mongoose');
var Reserva = require('./reserva');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
const brcypt = require('bcrypt');
const crypto = require('crypto');
//aleatoridad en la encryptacion
const saltRouds = 10; 

const Token = require('../models/token')
const mailer = require('../mailer/mailer')

const validateEmail = function(email){
    const re = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
    //return RegExp.test(email);
    return true;
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
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

usuarioShema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err){
        if (err) {  return console.log(err.nessage); } 

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificación de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click en este link: \n' + 'http://localhost:500' + '\/token/confirmation\/' + token.token + '.\n'
       };
       
       mailer.sendMail(mailOptions, function (err) {
           if (err) { return console.log(err.message); } 
           console.log('A verification email has been sent to' + email_destination + '.');
        });
   });
}

module.exports = mongoose.model('Usuario',usuarioShema);