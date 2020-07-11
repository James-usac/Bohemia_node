var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");

describe('Testing Bicicletas',function(){ 
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';//:27017
        //mongodb://35.202.63.188:27017
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));

        db.once('open',function(){
            console.log('we are connected to test database');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', ()=> {
        it('crear una instancia de bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        })
    });

    describe('Bicicleta.allBicis', ()=> {
        it('Comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            })
        });
    });
});

/*
//se ejecuta antes de cada test
beforeEach(() => {
    Bicicleta.allBicis = [];
});

//prueba para saber cuantas bicicleas inician en el sistema
describe('Bicicleta.allBicis',() => { 
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

//prueba de agregando bicis
describe('Bicicleta.add', () => {
    it('agregando una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1,'rojo','urbana',[41.38089905,2.12292250075175]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

//probando findById
describe('Bicicleta.findById', () =>{
    it('devo devolver la bici 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1,'amarillo','urbana',[41.38089905,2.12292250075175]);
        var b = new Bicicleta(2,'azul','rural',[41.38089905,2.12292250075175]);
        Bicicleta.add(a);
        Bicicleta.add(b);
        
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    });
});

//probando Bicicleta.removeByid
describe('Bicicleta.removeByid', () =>{
    it('debe eliminar', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1,'amarillo','urbana',[41.38089905,2.12292250075175]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        Bicicleta.removeByid(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

*/
