var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var BicicletaSchema = new Schema({
    //id es palabra reservada en mongoose
    code: Number,
    color: String,
    modelo: String,
    //array de numbers  y le agrego un indixe basado en el dato geografico
    ubicacion: {
        type: [Number], index: { type: '2disphere', sparse: true}
    }
    //va ordenar priorizando la ubicacion podemos hacer buscados por nuestro indice haciendo busquedas mas rapidas  
});

BicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
}



BicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + " | color: " + this.color; 
}

//busqueda mongo
BicicletaSchema.statics.allBicis = function(cb){
    return this.find({},cb);
}

//el cb es callback no da el resultado
BicicletaSchema.statics.add = function(aBici, cb){
    this.create(aBici,cb);
}

BicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode},cb);
}

BicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode},cb);
}
//le decimos que el nombre es Bicicleta
module.exports = mongoose.model('Bicicleta',BicicletaSchema);