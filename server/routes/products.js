var express = require('express');
var router = express.Router();
var Product = require('./../models/productModel');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET current container products */
router.get("/container", VerifyToken, function(req, res, next) {
    Product.find({"type": { "$all": "Container"}})
        .then(function (products) {
            returnList = [];
            products.map((product) => {
                returnList.push(product)
            });
            res.status(200).json(returnList);
        }
    );
});

/* GET current fill products */
router.get("/fill", VerifyToken, function(req, res, next) {
    Product.find({"type": { "$all": "Fill"}})
        .then(function (products) {
            returnList = [];
            products.map((product) => {
                returnList.push(product)
            });
            res.status(200).json(returnList);
        }
    );
});

router.post("/create", VerifyToken, function(req, res, next) {
    if (req.body.name &&
        req.body.description &&
        req.body.type &&
        req.body.sizes &&
        req.body.fillProducts) {
        data = {
            name : req.body.name,
            description : req.body.description,
            type : req.body.type,
            sizes : req.body.sizes,
            fillProducts : req.body.fillProducts,
            };

        Product.create(data,
            function (err, product) {
            if (err) return res.status(500).json({"Error": "There was an error creating the product. " + err})
            
            res.status(200).json({"product": product});
            });	
    } else {
        return res.status(500).json({"Error": "There was a problem creating the product. Not all required fields present"});
    }
});

module.exports = router;
