require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var bicicletasRouter = require('./routes/bicicletas');
var tokenRouter = require('./routes/token');
var authAPIRouter = require('./routes/api/auth')

const passport = require('./config/passport');
const session = require('express-session');
//motor de seccion, Guardar la seccion en memoria
const store = new session.MemoryStore;
const jwt = require('jsonwebtoken');

//api
var bicicletasAPIRouter = require('./routes/api/bicicletas');

const Usuariox = require('./models/usuario');
const Token = require('./models/token');

var app = express();
app.set('secretKey','jwt_pwd_!!223344');
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

var mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error: '));

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

//olvide password
app.get('/forgotPassword', function(req, res){
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req, res){
  usuario.findOne({ email: req.body.email }, function (err, usuario) {
      if(!usuario) {
        return res.render('session/forgotPassword', {info: {message: 'No exite correo'}});
      }

  usuario.resetPassword(function(err){
    if(err) return next(err);
    console.log('session/session/forgotPassword')
  });

  res.render('session/forgotPasswordMessage');
});
});

app.get('/resetPassword/:token', function( req, res, next ){
  Token.findOne({token: req.params.token}, function(err,token){
  if(!token) return res.status(400).send({type:'not-verified',msg:'No existe usuario asociado al token. Verifique que su token no haya expirado'});

  usuario.findById(token._userId, function( err, usuario ){
    if(err) return res.status(400).send({msg: 'No existe usuario asociado al token'});
    res.render('session/resetPassword', {errors:{},usuario:usuario});
  });
  })    
});

app.post('/resetPassword', function(req, res){
  if(req.body.password != req.body.confirm_password){
    res.render('session/resetPassword', {errors: {confirm_password: {message:'No coiciden los passwords'
  }},
  usuario: new Usuario({email: req.body.email})});
    return;
  }
  usuario.findOne({email: req.body.email}, function(err, usuario){
    usuario.password = req.body.password;
    usuario.save(function(err){
      if(err){
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({email: req.body.email})});
      }else{
        res.redirect('/login');
      }
    });
  });
});

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);

app.use('/api/auth', authAPIRouter);
app.use('/bicicletas',loggedIn ,bicicletasRouter);
app.use('/api/bicicletas',validarUsuario, bicicletasAPIRouter);


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

function loggedIn(req, res, next){
  if(req.user){
    next();
  } else{
     console.log('usuario sin logearse');
     res.redirect('/login');
  }
}

function validarUsuario(req, res, next){
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
    if(err){
      res.json({status: "error", message: err.message, data: null});
    }else{
      req.body.userID = decoded.id;
      console.log('jwt verify: ' + decoded);

      next();
    }
  });
}

app.use('/privacy_policy', function(req, res){;
  res.sendFile('public/policy_privacy.html');
});

app.use('/google9175166cc36ab553', function(req, res) {
  res.sendFile('public/google9175188cc36ab883.html');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read', 'profile','email',],}));

app.get('/auth/google/callback',passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/error',
  })
);


module.exports = app;
