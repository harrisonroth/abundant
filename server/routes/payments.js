const stripeTestKey = require('../utils/StripeKeys').sk_test;
const stripe = require('stripe')(stripeTestKey);
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./../controllers/VerifyToken');
var config = require('./../config');
var User = require('./../models/userModel');

//     const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000,
//     currency: 'usd',
//     payment_method_types: ['card'],
//     receipt_email: 'jenny.rosen@example.com',
//   });


// router.post("/create", VerifyToken, function(req, res, next) {

//     stripe.customer.

// });

router.get("/addCard", VerifyToken, async function(req, res, next) {
    User.findById(req.userId, async function (err, user) {
        if (err) { 
            console.log(err);
            return res.json({
                message: "get user failed",
                error: err,
                status: 500
            });
        }
        stripe.setupIntents.create(
            {customer: user.stripeId},
        ).then((intent) => {
            res.status(200).json({ client_secret: intent.client_secret });
        });
    });
});


router.get("/getCard", VerifyToken, async function(req, res, next) {
    User.findById(req.userId, async function (err, user) {
        if (err) { 
            console.log(err);
            return res.json({
                message: "get user failed",
                error: err,
                status: 500
            });
        }
        stripe.paymentMethods.list({
            customer: user.stripeId,
            type: 'card',
          }).then((list) => {
            console.log(list.data);
            res.status(200).json({ data: list.data[0].card, id: list.data[0].id });
        });
    });
});

router.get("/deleteCard/:id", VerifyToken, async function(req, res, next) {
    var id= req.params.id;
    User.findById(req.userId, async function (err, user) {
        if (err) { 
            console.log(err);
            return res.json({
                message: "get user failed",
                error: err,
                status: 500
            });
        }
        console.log(id);
        stripe.paymentMethods.detach(id
            ).then((result) => {
            res.status(200).json({ data: result });
        });
    });
});

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

router.post("/create-payment-intent", (req, res) => {
    const { items } = req.body;
    console.log(items);
    // Create a PaymentIntent with the order amount and currency
    stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: ['card'],
    },
    function(err, paymentIntent) {
        console.log(paymentIntent);
        res.send({
            clientSecret: paymentIntent.client_secret
        });    
    });
});

module.exports = router;