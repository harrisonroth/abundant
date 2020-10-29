var express = require('express');
var router = express.Router();
var Measurement = require('./../models/measurementModel');
var Bottle = require('./../models/bottleModel');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET specific set of measurements */
router.get("/:bottleId", VerifyToken, function(req, res, next) {
    var bottleId = req.params.bottleId;
    Measurement.find({"bottleId": bottleId})
        .then(function (measurementsObjects) {
            res.status(200).json(measurementsObjects);
        }
    );
});

router.post("/:bottleId", VerifyToken, function(req, res, next) {
    let bottleId = req.params.bottleId;
    let filter = {"bottleId": bottleId};
    if (req.body.measurement != null && req.body.batteryPercent != null) {
        let update = { $push: {measurements : req.body.measurement}, $set: {batteryPercent: req.body.batteryPercent}};
        Bottle.findOneAndUpdate(filter, update, { runValidators: true }, (err, bottle) => {
            if (err) return res.json({
                message: "Measurements update failed",
                error: err,
                status: 500
            });

            let data = {
                bottleId: bottle._id,
                datetime: req.body.measurement.date,
                percent: req.body.measurement.percent,
            };

            Measurement.create(data,
                function (err, measurement) {
                if (err) return res.status(500).json({"Error": "There was an error creating the measurement. " + err})
                res.status(200).json({"measurement": measurement, "bottle": bottle});
            });
        });
    } else {
        res.status(500).json({"Error": "Not all required fields provided"});
    }
});

module.exports = router;    