var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./../models/userModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');

/* GET users listing. */
router.get('/list', function(req, res, next) {
	User.find({_id : { "$all": this.req.users }}) 
		.then(function (users) {
			returnList = {};
			users.map((user) => {
				returnList.push({[user._id]: user.firstName + " " + user.lastName})
			});
			res.status(200).send(users);
	});
});

router.post('/register', function(req, res) {
	if (req.body.email &&
		  req.body.firstName &&
		  req.body.lastName &&
		  req.body.password) {
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	User.create({
	    firstName : req.body.firstName,
	    lastName : req.body.lastName,
	    email : req.body.email,
		password : hashedPassword,
		notifications: [{"type": "Welcome", "value": "Welcome to abundant, thank you for joining us!"}],
		settings: {
			card: {
				credit_card: "",
				cvc: "",
				zip_code: "",
			}
		}
  	},
  	function (err, user) {
  		console.log(err);
	    if (err) return res.status(500).send("There was a problem registering the user.")
	    // create a token
	    var token = jwt.sign({ id: user._id }, config.secret, {
	      expiresIn: 31536000 // expires in one year
	    });
	    res.status(200).send({ auth: true, token: token, userId: user._id, user: user});
	});	
	} else {
		return res.status(500).send("There was a problem registering the user. Not all required fields present")
	}
});


router.post('/login', function(req, res) {
	console.log(req);
	if (req.body.email &&
		  req.body.password) {
			console.log("login");

			authenticate(req.body.email, req.body.password, function(err, user) {
				console.log("login");

			if(err) {
				console.log(err);
				return res.status(500).send("There was a problem logging in.")
			}
			var token = jwt.sign({ id: user._id }, config.secret, {
	      		expiresIn: 31536000 // expires in one year
			});
			returnData = { auth: true, token: token, userId: user._id, user: user};
			res.status(200).send(returnData);
		});
	}

});


router.get('/checkAuth', VerifyToken, function(req, res) {
	User.findById(req.userId, function (err, user) {
		if (err) { 
			console.log(err);
			return res.json({
				message: "get user failed",
				error: err,
				status: 500
			});
		}
		res.status(200).send({user: getUserObjectForClient(user)});
	});
});

router.get('/userData', VerifyToken, function(req, res) {
    User.findById(req.userId, function (err, user) {
		if (err) { 
			console.log(err);
			return res.json({
				message: "get user failed",
				error: err,
				status: 500
			});
		}
		res.status(200).send({user: getUserObjectForClient(user)});
	});
});

router.post("/updateSettings", VerifyToken, function(req, res, next) {
    if (req.body.settings) {
        let filter = {"_id": req.userId};
        let update = {"settings" : req.body.settings};
        User.findOneAndUpdate(filter, update, { runValidators: true }, (err, user) => {
            if (err) return res.json({
                message: "User settings update failed",
                error: err,
                status: 500
            });
            res.status(200).json(getUserObjectForClient(user));
        });
    }
});


router.post("/updateSettings", VerifyToken, function(req, res, next) {
    if (req.body.settings) {
        let filter = {"_id": req.userId};
        let update = {"settings" : req.body.settings};
        User.findOneAndUpdate(filter, update, { runValidators: true }, (err, user) => {
            if (err) return res.json({
                message: "User settings update failed",
                error: err,
                status: 500
            });
            res.status(200).json(getUserObjectForClient(user));
        });
    }
});

router.post("/updateNotifications", VerifyToken, function(req, res, next) {
    if (req.body.notifications) {
        let filter = {"_id": req.userId};
        let update = {"notifications" : req.body.notifications};
        User.findOneAndUpdate(filter, update, { runValidators: true }, (err, user) => {
            if (err) return res.json({
                message: "User notification update failed",
                error: err,
                status: 500
            });
            res.status(200).json(getUserObjectForClient(user));
        });
    }
});



function authenticate(email, password, callback) {
	User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          var err = new Error('Incorrect password.');
        err.status = 401;
        return callback(err);
        }
      })
    });
}

function getUserObjectForClient(user) {
	return {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		notifications: user.notifications,
		settings: user.settings,
		id: user._id
	}
}


module.exports = router;
