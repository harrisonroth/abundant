var makeOffSessionPayment = require('./OffSessionPaymentsController');
var Bottle = require('../models/bottleModel');
var RefillOrder = require('../models/pendingRefillModel');
var User = require('../models/userModel');

const updateMeasurementsDaily = () => {
    Bottle.find({}, function(err, bottles) {
        if (err) {
            console.log(err);
            return "Bottle get failed"; 
        }
        bottles.forEach((bottle) => {
            // average yesterday's measurements clear older to measurements
            var max = 0;
            var min = 1000;
            var sum = 0;
            var total = 0;
            for (var i = 0; i < bottle.measurements.length; i++) {
                sum += bottle.measurements[i].percent;
                total ++;
                if (bottle.measurements[i].percent > max) {
                    max = bottle.measurements[i].percent;
                }
                if (bottle.measurements[i].percent < min) {
                    min = bottle.measurements[i].percent;
                }
            }
            if (bottle.measurements.length > 3) {
                sum = sum - (max + min);
                total -= 2;
            }
            bottle.dailyAverages.push({date: bottle.measurements[i].date, percent: sum/total});
            bottle.measurements = [];
            bottle.save();

            let maxDecr = 0;
            let last = bottle.dailyAverages[0].percent
            let totalAverages = bottle.dailyAverages.length;
            for (var i = 1; i < totalAverages; i++) {
                if (maxDecr < (last - bottle.dailyAverages[i].percent)) {
                    maxDecr = last - bottle.dailyAverages[i].percent;
                }
                last = bottle.dailyAverages[i].percent;
            }
            if (bottle.dailyAverages[totalAverages-1].percent - (maxDecr*7) < 0) {
                Product.findById(bottle.refillContents, (err, product) => {
                    if (err) {
                        console.log(err);
                    }
                    RefillOrder.create({
                        userId: bottle.userId,
                        bottleId: bottle._id,
                        refillProduct: bottle.refillContents,
                        size: bottle.size,
                        price: product.sizes.find(itemSize => {
                            return itemSize.size === bottle.size;
                          }).price
                    },
                    function (err, refill) {
                        if (err) {
                            console.log(err);
                        }
                        User.findById(bottle.userId, function (err, user) {
                            if (!err) {
                                user.notifications.push({"type": "Refill", "value": "Refill of " + product.name + " for your bottle (" + bottle.name + ") will be charged to your saved card tomorrow"})
                                user.save();
                                // TODO: Send email to user

                            }
                        });
                    });
                });
            }
        });
    });
}

const chargeForRefillsAndMakeOrders = () => {
    RefillOrder.find({}, function(err, refill) {
        User.findById(bottle.userId, function (err, user) {
            makeOffSessionPayment(user.stripeId, refill.price, (paymentIntent, err) => {
                if (!err) {
                    RefillOrder.findByIdAndRemove(refill._id, (err, refill) => {
                        if (!err) {
                            user.notifications.push({"type": "Refilled", "value": "Refill of " + product.name + " for your bottle (" + bottle.name + ") was charged"})
                            user.save();
                            // TODO: Send email to user
                        }
                    });
                }
            });
        });
    });
}