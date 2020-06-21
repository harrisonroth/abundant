var Measurement = require('../models/measurementModel');
var Bottle = require('../models/bottleModel');

function updateMeasurementsDaily() {
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
            for (var i = 0; i < bottle.measurements.length; i++) {
                sum += bottle.measurements[i].percent;
                if (bottle.measurements[i].percent > max) {
                    max = bottle.measurements[i].percent;
                }
                if (bottle.measurements[i].percent < min) {
                    min = bottle.measurements[i].percent;
                }

                sum = sum - (max + min);
                bottle.dailyAverages.push({date: bottle.measurements[i].date, percent: sum/(bottle.measurements.length-2)});
                bottle.measurements = [];
                bottle.save();
            }
        });
    });
}

module.exports = updateMeasurementsDaily;