var express = require('express');
var router = express.Router();
var Order = require('./../models/orderModel');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET current orders */
router.get("/", VerifyToken, function(req, res, next) {
    Order.find({"userId": { "$all": req.userId}})
        .then(function (orders) {
            returnList = [];
            orders.map((order) => {
                returnList.push(order)
            });
            res.status(200).json(returnList);
        }
    );
});

/* GET specific order for current user*/
router.get("/:orderId", VerifyToken, function(req, res, next) {
    var orderId = req.params.orderId;
    Order.find({"_id": orderId})
        .then(function (order) {
            if (order.userId == req.userId) {
                res.status(200).json(order);
            } else {
                res.status(401).json({"error": "Current user does not have access to object"});
            }
        }
    );
});

module.exports = router;