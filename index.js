'use strict'

const express = require('express');
const config = require('./config.js')
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const Router = require('./routes/routes.js');

const app = express();


//BODYPARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//RECURSOS ESTATICOS
//Uso de static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//MOTOR DE VISTAS
app.engine('.hbs', hbs({
    defaultLayout: 'index',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');

//Router
app.use('/', Router);


//EDGAR URIEL TAMAYO 
//CONEXION A LA BASE DE DATOS
mongoose.connect(config.db, config.urlParser, (err, res) =>{
    if(err){
        console.log('No se pudo conectar ' + err);
    }
    else{
        console.log('Se conecto el servidor');
        app.listen(config.port, config.host, ()=>{
            console.log('ejecutando en puerto ' + config.port )
        })
    }
})
