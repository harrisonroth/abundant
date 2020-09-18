const stripeTestKey = require('../utils/StripeKeys').sk_test;
const stripe = require('stripe')(stripeTestKey);

const makeOffSessionPayment = (customer, amount, callback) => {
    stripe.paymentMethods.list({
        customer: customer,
        type: 'card',
    }).then((paymentMethods) => {
        stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer,
            payment_method: paymentMethods.data[0].id,
            off_session: true,
            confirm: true,
        }, (err, paymentIntent) => {    
            if(err) {
                console.log(err);
                callback(null, err);
                return err;
            }
            callback(paymentIntent, null);
        });
    });
}
