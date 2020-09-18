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


router.post("/create-payment-intent", (req, res) => {
    const { items } = req.body;
    var totalPrice = 0;
    if (items != null) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            var itemPrice = item.product.sizes.find(itemSize => {
                return itemSize.size === item.size;
            }).price;
            itemPrice += item.fillProduct.sizes.find(itemSize => {
                return itemSize.size === item.size;
            }).price;
            totalPrice += itemPrice;

        }
    }
    // Create a PaymentIntent with the order amount and currency
    stripe.paymentIntents.create({
        amount: totalPrice*100,
        currency: "usd",
        payment_method_types: ['card'],
    },
    function(err, paymentIntent) {
        if (err) {
            console.log(err);
            res.status(500).send({"Error": "An error occured"});
        }
        console.log(paymentIntent);
        res.send({
            clientSecret: paymentIntent.client_secret
        });    
    });
});

module.exports = router;