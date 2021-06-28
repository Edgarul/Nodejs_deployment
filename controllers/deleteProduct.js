/*jshint esversion: 6 */

const product = require("../models/product");

module.exports = (req, res) =>{
    let datoeliminar = req.params.id;

    product.findOneAndDelete(datoeliminar, (err, products)=>{
        if(err){
            return res.status(500).send({
                message: `Error al eliminar el producto ${err}`
            });
        }

        if(!products){
            return res.status(404).send({
                message: 'El producto no existe'
            });
        }

        res.status(200).send({Product: products})
    }).lean();
}