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

//CONEXION A LA BASE DE DATOS
require('dotenv').config({path: 'variables.env'});

console.log(process.env.DB_URL)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
})


//Router
app.use('/', Router);
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3500;
app.listen(port,host, ()=>{
    console.log('El servidor funciona')
});