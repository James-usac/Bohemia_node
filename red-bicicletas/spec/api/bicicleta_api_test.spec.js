var Bicicleta = require("../../models/bicicleta");
var request = require('request');
var server = require('../../bin/www');

//se ejecuta antes de cada test
/*
describe('Bicicleta Api',() => { 
    describe('GET Bicicletas /',() => { 
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1,'rojo','urbana',[41.38089905,2.12292250075175]);
            Bicicleta.add(a);
            //ejecutar un get
            request.get('http://localhost:3000/api/bicicletas',function(error,response,body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

});

describe('POST Bicicleta /create',() => { 
    //done es un parametro que pasamos
    it('Status 200', (done) => {
        var headers = {"content-type" : 'application/json'};
        var aBici = '{ "id":5, "color": "magenta", "modelo": "urbano", "lat": 41.38189905, "lng": 2.12392250075175 }';
        request.post({
            headers: headers,
            url: "http://localhost:3000/api/bicicletas/create",
            body: aBici
        }, function(error,response,body){
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(5).color).toBe("magenta");
            expect(Bicicleta.allBicis.length).toBe(1);
            done();
        });
    });    
});

//delete primero creo uno y luego lo borro
describe('Delete Bicicleta /delete',() => { 
    //done es un parametro que pasamos
    it('Status 200', (done) => {
        var headers = {"content-type" : 'application/json'};
        var aBici = '{ "id":5, "color": "magenta", "modelo": "urbano", "lat": 41.38189905, "lng": 2.12392250075175 }';
        var id = '{ "id":5}';
        request.post({
            headers: headers,
            url: "http://localhost:3000/api/bicicletas/create",
            body: aBici
        }, function(error,response,body){
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(5).color).toBe("magenta");
            expect(Bicicleta.allBicis.length).toBe(1);
            //delete
            request.delete({
                headers: headers,
                url: "http://localhost:3000/api/bicicletas/delete",
                body: id
            }, function(error,response,body){
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
            done();
        });
    });    
});    

*/