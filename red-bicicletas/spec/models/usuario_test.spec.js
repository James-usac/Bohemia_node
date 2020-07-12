var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');

 

describe('Probando usuarios ...', function(){
    beforeEach(function(done){
        
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,
            {
                useNewUrlParser : true,
                useUnifiedTopology: true
            });
        
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:')); 
        db.once('open', function() {
            console.log('Conectado a la base de datos de test database');
            done();
        });
    });

    afterEach(function(done){
        Reserva.deleteMany({},function(err,success){
            if(err)
                console.log(err);
            Usuario.deleteMany({},function(err,success){
                if(err)
                    console.log(err);
                Bicicleta.deleteMany({},function(err,success){
                    if(err)
                        console.log(err);
                    done();
                });
            });    
        });
    });

    describe('Al momento de reservar',() => {


        
        it('debe existir la reserva',(done) => {
            const usuario = new Usuario({nombre : 'James Melgar'});
            usuario.save();
            
            const bicicleta = new Bicicleta({code : 1, color : 'Rojo', modelo : "urbana"}); 
            bicicleta.save();

            var hoy = new Date();
            var manana = new Date();
            manana.setDate(hoy.getDate() + 1);

            usuario.reservar(bicicleta.id, hoy, manana,function(err, reserva){
                
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err,res){
                    if(err)
                        console.log(err);
                    console.log(res);
                    var cont = res[0];
                    console.log(cont);
                    expect(res.length).toBe(1);
                    expect(cont.diasDeReserva()).toBe(2);
                    expect(cont.bicicleta.code).toBe(1);
                    expect(cont.usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        })
    });

});