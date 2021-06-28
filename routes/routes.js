/*jshint esversion: 6 */

//import module

const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const path = require('path');
const Product = require('../models/product.js')

//create a route object
const app = express.Router();

module.exports = app;


//ROUTES

//Pagina HOME
app.get('/', (req, res)=>{
    res.render('product')
});

app.get('/editar', (req, res)=>{
    res.render('product')
})

app.get('/api/products', (req, res) =>{
    Product.find({}, (err, products) =>{
        if (err) {
           return res.status(500).send({
               message: `Error al realizar la peticion ${err}`
           });
        }

        if(!products){
            return res.status(404).send({
                message: `No hay productos en la base de datos`
            }); 
        }

        res.status(200).send({Products: [products]});
    }).lean();
});





// INSERTAR VALORES EN LA BD
const postProduct = require('../controllers/posProduct.js')

app.post('/api/product', postProduct, (req, res)=>{
    app.render('product')
});


//POR FILTRO
app.get('/api/products/:datoBusqueda', (req, res) =>{
    let datoBusqueda = req.params.datoBusqueda;
    //Product.findById(datoBusqueda, (err, products)=>{
    Product.find({name: datoBusqueda}, (err,products)=>{
        if(err){
            return res.status(500).send({
                message: `Error en la busqueda ${err}`
            });
        }

        if(!products){
            return res.status(404).send({
                message: 'El producto no existe'
            });
        }

        res.status(200).send({Product: products})
    }).lean();;
})


//Modificar producto PUT
const putProduct = require('../controllers/putProduct.js');
app.put('/api/product/:id', putProduct)
//Edgar Uriel Tamayo Lopez

//Eliminar registro DELETE
const deleteProduct = require('../controllers/deleteProduct.js');
app.delete('/api/product/:idEliminar', deleteProduct);

//POR NOMBRE


app.use((req,res)=>{
    res.status(404).send('pagina no encontrada');

});