import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { makePost } from '../../../Utils/request';
import { AddressForm } from './AddressForm';
import { Button } from '@material-ui/core';
import { clearCartContents } from '../../../Utils/cart';
import { useHistory } from 'react-router-dom';
import { CartCard } from '../Card';
import { validateAddress } from '../../../Utils/variableValidation';

export const CheckoutForm = props => {
  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState('shipping');
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({});
  const [shippingError, setShippingError] = useState('');
  const [billingDetails, setBillingDetails] = useState({});
  const [billingError, setBillingError] = useState('');
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    makePost('/payments/create-payment-intent', { items: props.items }, data =>
      setClientSecret(data.clientSecret),
    );

    let itemList = [];
    var totalPrice = 0;
    props.items.forEach(item => {
      var itemPrice = getPrice(item, item.size);
      totalPrice += itemPrice;
      itemList.push(
        <div className='order_item'>
          <CartCard item={item} price={itemPrice} />
        </div>,
      );
    });
    setItems(itemList);
    setTotalPrice(totalPrice);
  }, []);

  const getPrice = (item, size) => {
    let price = item.product.sizes.find(itemSize => {
      return itemSize.size === size;
    }).price;
    price += item.fillProduct.sizes.find(itemSize => {
      return itemSize.size === size;
    }).price;
    return price;
  };

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
          billing_details: billingDetails,
        },
        shipping: shippingDetails,
        receipt_email: props.user.email,
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
          makePost(
            '/order/create',
            {
              items: props.items,
              price: props.price,
              stripeId: payload.paymentIntent.id,
            },
            () => {
              clearCartContents();
            },
          );
          props.closeModal();
          props.closeCart();
          history.push('/orders');
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

  const getOrderOverview = () => {
    return (
      <div>
        <h3>Order Overview</h3>
        {items}
        <div className='overiew_price'>
          <h3>Total Price: ${totalPrice}</h3>
        </div>
      </div>
    );
  };

  const setShipping = data => {
    setShippingDetails({
      name: props.user.firstName + ' ' + props.user.lastName,
      address: data,
    });
  };

  const setBilling = data => {
    setBillingDetails({
      name: props.user.firstName + ' ' + props.user.lastName,
      address: data,
      email: props.user.email,
    });
  };

  return (
    <div className='checkout'>
      <div>
        <span className='close' onClick={props.closeModal}>
          &times;
        </span>
      </div>
      <h2>Order Checkout</h2>
      <div className='checkout_content'>
        {step == 'shipping' ? (
          <div className='shipping_details'>
            <h3>Shipping Address</h3>
            <AddressForm
              address={shippingDetails.address}
              setAddress={setShipping}
              errorString={shippingError}
            />
            <input
              style={{ width: '8%' }}
              type='checkbox'
              checked={sameAsShipping}
              onChange={() => {
                setSameAsShipping(!sameAsShipping);
              }}
            />
            <label>Shipping Address same as Billing</label>
            <Button
              variant='contained'
              className='float_right'
              onClick={() => {
                let errorString = validateAddress(shippingDetails.address);
                if (errorString.length > 0) {
                  setShippingError(errorString);
                  return;
                }
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
            <AddressForm
              address={billingDetails.address}
              setAddress={setBilling}
              errorString={billingError}
            />

            <Button
              variant='contained'
              className='float_right'
              onClick={() => {
                let errorString = validateAddress(billingDetails.address);
                if (errorString.length > 0) {
                  setBillingError(errorString);
                  return;
                }
                setStep('payment');
              }}
            >
              Next
            </Button>

            <Button
              variant='contained'
              className='float_right'
              onClick={() => {
                setStep('shipping');
              }}
            >
              Previous
            </Button>
          </div>
        ) : null}

        {step == 'payment' ? (
          <div className='payment_step'>
            <div className='order_overview'>{getOrderOverview()}</div>
            <div className='payment_details'>{getStripeForm()}</div>
            <Button
              variant='contained'
              className='float_right'
              onClick={() => {
                if (sameAsShipping) {
                  setStep('shipping');
                } else {
                  setStep('billing');
                }
              }}
            >
              Previous
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
