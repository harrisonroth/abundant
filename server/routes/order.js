var express = require('express');
var router = express.Router();
var Order = require('./../models/orderModel');
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
    order.find({"_id": orderId})
        .then(function (order) {
            if (order.userId == req.userId) {
                res.status(200).json(order);
            } else {
                res.status(401).json({"error": "Current user does not have access to object"});
            }
        }
    );
});


export function updateOrder(orderId, update) {
    let filter = {"_id": orderId};

    order.findOneAndUpdate(filter, update, { runValidators: true }, (err, order) => {
        if (err) return res.json({
            message: "Order update failed",
            error: err,
            status: 500
        });
        res.status(200).json(order);
    });
}

module.exports = router;