var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Bottle = require('./../models/bottleModel');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET current bottles */
router.get("/", VerifyToken, function(req, res, next) {
    Bottle.find({"userId": { "$all": req.userId}})
        .then(function (bottles) {
            returnList = [];
            bottles.map((bottle) => {
                returnList.push(bottle)
            });
            res.status(200).json(returnList);
        }
    );
});

/* GET specific bottle for current user*/
router.get("/:bottleId", VerifyToken, function(req, res, next) {
    var bottleId = req.params.bottleId;
    Bottle.find({"_id": bottleId})
        .then(function (bottle) {
            if (bottle.userId == req.userId) {
                res.status(200).json(bottle);
            } else {
                res.status(401).json({"error": "Current user does not have access to object"});
            }
        }
    );
});

/* POST update bottle name */
router.post("/:bottleId", VerifyToken, function(req, res, next) {
    let bottleId = req.params.bottleId;
    let filter = {"_id": bottleId, "userId": req.userId};
    let update = {"name" : req.body.name};
    Bottle.findOneAndUpdate(filter, update, { runValidators: true }, (err, bottle) => {
        if (err) return res.json({
            message: "Bottle update failed",
            error: err,
            status: 500
        });
        res.status(200).json(bottle);
    });
});

/* GET set bottle to inactive */
router.get("/:bottleId/deactivate", VerifyToken, function(req, res, next) {
    var bottleId = req.params.bottleId;
    let filter = {"_id": bottleId, "userId": req.userId};
    let update = {"active": false};
    Bottle.findOneAndUpdate(filter, update, { runValidators: true }, (err, bottle) => {
        if (err) return res.json({
            message: "Bottle update failed",
            error: err,
            status: 500
        });
        res.status(200).json(bottle);
    });
});



module.exports = router;
