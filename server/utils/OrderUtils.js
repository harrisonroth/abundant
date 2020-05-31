var Order = require('./../models/orderModel');

var config = require('./../config');

function updateOrder(orderId, update) {
    let filter = {"_id": orderId};

    Order.findOneAndUpdate(filter, update, { runValidators: true }, (err, order) => {
        if (err) return res.json({
            message: "Order update failed",
            error: err,
            status: 500
        });
        res.status(200).json(order);
    });
}