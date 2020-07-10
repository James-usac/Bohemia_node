var Bicicleta = require("../../models/bicicleta");

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
