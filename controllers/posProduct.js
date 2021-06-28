const Product = require("../models/product");

/*jshint esversion: 6 */

module.exports = (req, res) =>{

        let product = new Product();
        product.name = req.body.name;
        product.picture = req.body.avatar;
        product.price = req.body.price;
        product.category = (req.body.category).toLowerCase();
        product.description = req.body.description;
        
        console.log(req.body);
        
        product.save((err, productStored) =>{
        
        if (err) return res.status(500).send ({
        message: `Èrror al realizar la petición ${err}`
        });
        
        res.status(200).send({product:productStored});
        });
}