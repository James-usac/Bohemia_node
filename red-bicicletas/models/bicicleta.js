var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

//los objetos heredan de la clase objeto y sobreescribo el toString()
Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + " | color: " + this.color; 
}

//arrays
Bicicleta.allBicis = [];
//metodo add agregando hijo al arrays
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

//metodo para eliminar objetos
Bicicleta.removeByid = function(aBiciId){
    for(var i=0; i < Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i,1);
            break;
        }
    }
}

//buscar id
Bicicleta.findById = function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id ==aBiciId);
    if(aBici)
        return aBici;
    else
        throw new Error(`No exite una bicicleta con el id ${aBiciId}`);
}

/*
//creando objetos
var a = new Bicicleta(1,'rojo','urbana',[41.38089905,2.12292250075175]);
var b = new Bicicleta(2,'azul','urbana',[41.38189905,2.12392250075175]);
//agregando objetos
Bicicleta.add(a);
Bicicleta.add(b);
*/

//Exportando modelo para que lo puedan importar
module.exports = Bicicleta;