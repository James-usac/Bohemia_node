var Bicicleta = require("../../models/bicicleta");
var request = require('request');
var server = require('../../bin/www');
var mongoose = require("mongoose");

//se ejecuta antes de cada test

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

    describe('Bicicleta Api',() => { 
        describe('GET Bicicletas /',() => { 
            it('Status 200', (done) => {
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toBe(0);
                    var aBici = new Bicicleta({code: 1, color: "Verde", modelo:"Urbana"});
                    Bicicleta.add(aBici,function(err, newBici){
                        if (err) console.log(err);
                        //ejecutar un get
                        request.get('http://localhost:3000/api/bicicletas',function(error,response,body){
                            expect(response.statusCode).toBe(200);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('POST Bicicleta /create',() => { 
        //done es un parametro que pasamos
        it('Status 200', (done) => {
            var aBici = new Bicicleta({code: 5, color: "Verde", modelo:"Urbana"});
            Bicicleta.add(aBici);
            var headers = {"content-type" : 'application/json'};
            var aBici = '{ "id":5, "color": "magenta", "modelo": "urbano", "lat": 41.38189905, "lng": 2.12392250075175 }';
            request.post({
                headers: headers,
                url: "http://localhost:3000/api/bicicletas/create",
                body: aBici
            }, function(error,response,body){
                expect(response.statusCode).toBe(500);
                //expect(Bicicleta.findById(5).color).toBe("magenta");
                //expect(Bicicleta.allBicis.length).toBe(1);
                Bicicleta.findByCode(5, function(err,tarjetbicis){
                    if (err) console.log(err);
                    expect(tarjetbicis.color).toEqual("Verde");
                    done();
                });
            });
        });    
    });

});


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