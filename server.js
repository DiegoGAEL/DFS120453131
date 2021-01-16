const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;

const app = express();



app.use(express.urlencoded ({extended: true}));
app.use(cookieParser('Secreto'));

app.use(session({
    secret: 'Secreto',
    resave: true, //cada peticón que haga no debe modificarse
    saveUninitialized: true,
}));

//INICIALIZAR

app.use(passport.initialize());
//en caso de las sesiones
app.use(passport.session());

//AUTENTICAR

passport.use(
    new passportLocal(function(username, password, done){
        console.log(username);
        console.log(password);

        if(username === 'Diego' && password === '7654321'){
            console.log("contraseña correcta");

            return done(null,{id:'Diego'});
        }
        else{
            done(null, false);
        }
    }));

    //SERIALIZAR

 passport.serializeUser(function(user, done){
        done(null,user.id);
 });

 passport.deserializeUser(function(user, done){
    done(null,{id:'Diego'});
 });

//RUTAS
app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render("login.ejs");
});

 //VALIDAR CREDENCIALES
 app.get('/login', function(req, res){
     res.render('login.ejs');
 });

 app.post('/login',passport.authenticate('local',{
    successRedirect: '/Bienvenido',
     failureRedirect: '/login',
 }));

app.get('/Bienvenido', function(req, res){
     res.render('bienvenida.ejs');
 });




 app.get('/login', passport.authenticate('local',{
     successRedirect: '/Bienvenido',
     failureRedirect: '/login',
 }));



app.listen(3000, ()=> console.log("Server started"))