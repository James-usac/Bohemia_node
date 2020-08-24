var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuariosRouter = require('./routes/usuarios');
var bicicletasRouter = require('./routes/bicicletas');
var tokenRouter = require('./routes/token');
//api
var bicicletasAPIRouter = require('./routes/api/bicicletas');
//var usuarioAPIRouter = require('./routes/api/')
var mailer = require('./mailer/mailer');
//motor de seccion, Guardar la seccion en memoria
const store = new session.MemoryStore;

var app = express();
app.use(session({ 
  //cuanto dura la cookie, tiempo en milisegundos
  cookie: { maxAge:240 * 60 * 60 * 1000 },
  //donde se guarda la session
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_biciletas **** cualquier cosa'
}));
var mongoose = require('mongoose');
const usuario = require('./models/usuario');

// mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
var mongoDB = "mongodb://localhost/red_bicicletas";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error: '));
/*
mailer.createTestAccount('error',function(err, account){
  console.log('Iniciando mensaje')
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//configura seccion al servidor
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login',function(req, res){
  res.render('session/login')
});

app.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err);
    if(!usuario) return res.render('session/login',{info})
    req.logIn(usuario, function(err){
      if(err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);//hace que se ejecute
});

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/')
});

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);
//app.use('/bicicletas', bicicletasRouter);
//api
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas',bicicletasAPIRouter);
//app.use('/api/usuarios',usuarioAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
