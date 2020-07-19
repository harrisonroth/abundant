import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { makePost } from '../../../Utils/request';
import { AddressForm } from './AddressForm';
import { Button } from '@material-ui/core';

export const CheckoutForm = props => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState('shipping');
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({});
  const [billingDetails, setBillingDetails] = useState({});

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    makePost('/payments/create-payment-intent', { items: props.items }, data =>
      setClientSecret(data.clientSecret),
    );
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    setProcessing(true);
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: ev.target.name.value,
          },
        },
      })
      .then(payload => {
        console.log(payload);
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        }
      });
  };

  const getStripeForm = () => {
    return (
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {' '}
            Stripe dashboard.
          </a>{' '}
          Refresh the page to pay again.
        </p>
      </form>
    );
  };

  return (
    <div className='checkout'>
      <div>
        <span className='close' onClick={props.closeModal}>
          &times;
        </span>
      </div>

      {step == 'shipping' ? (
        <div className='shipping_details'>
          <h3>Shipping Address</h3>
          <AddressForm setAddress={setShippingDetails} />
          <input
            name='sameAsBilling'
            type='checkbox'
            onChange={() => {
              setSameAsShipping(!sameAsShipping);
            }}
          />
          <label>Shipping Address same as Billing:</label>
          <Button
            variant='contained'
            className='float_right'
            onClick={() => {
              if (sameAsShipping) {
                setStep('payment');
                setBillingDetails(shippingDetails);
              } else {
                setStep('billing');
              }
            }}
          >
            Next
          </Button>
        </div>
      ) : null}

      {step == 'billing' ? (
        <div className='billing_details'>
          <h3>Billing Address</h3>
          <AddressForm setAddress={setBillingDetails} />
          <Button
            variant='contained'
            className='float_right'
            onClick={() => {
              setStep('shipping');
            }}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            className='float_right'
            onClick={() => {
              setStep('payment');
            }}
          >
            Next
          </Button>
        </div>
      ) : null}

      {step == 'payment' ? (
        <div className='payment_details'>{getStripeForm()}</div>
      ) : null}
    </div>
  );
};
