var express = require('express');
var router = express.Router();
var Measurement = require('./../models/measurementModel');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET specific set of measurements */
router.get("/:bottleId", VerifyToken, function(req, res, next) {
    var bottleId = req.params.bottleId;
    Measurement.find({"bottleId": bottleId})
        .then(function (measurementsObject) {
            res.status(200).json(measurementsObject.measurements);
        }
    );
});

router.post("/:bottleId", VerifyToken, function(req, res, next) {
    let bottleId = req.params.bottleId;
    let filter = {"bottleId": bottleId};
    let update = { $push: req.body.measurement};
    Bottle.findOneAndUpdate(filter, update, { runValidators: true }, (err, bottle) => {
        if (err) return res.json({
            message: "Measurements update failed",
            error: err,
            status: 500
        });
        res.status(200).json(bottle);
    });
});

module.exports = router;