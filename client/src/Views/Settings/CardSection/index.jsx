import React from 'react';
import './CardSectionStyles.css';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { makePost, makeGet } from '../../../Shared/Utils/request';
import { useEffect } from 'react';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#555',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export const CardSection = props => {
  const stripe = useStripe();
  const elements = useElements();
  const [saving, setSaving] = React.useState(false);
  // useEffect(()=> {
  //   stripe
  //   .retrieveSource({
  //     id: props.settings.,
  //     client_secret: '{SOURCE_CLIENT_SECRET}',
  //   })
  //   .then(function(result) {
  //     // Handle result.error or result.source
  //   });
  // }
  // , []);

  console.log(props.secret);
  const handleSubmit = event => {
    setSaving(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    stripe
      .confirmCardSetup(props.secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: props.user.email },
        },
      })
      .then(function (result) {
        console.log(result);
        if (!result.error) {
          if (props.card.data) {
            makeGet('/payments/deleteCard/' + props.card.id, () =>
              props.updateCard(),
            );
          }
        } else {
          alert('Error saving card');
        }
      });
    setSaving(false);
  };

  console.log(props.card);

  return (
    <div className='card_settings'>
      <div>
        <h3>Card Settings</h3>
        {props.card ? (
          <div className='current_card'>
            <h4>Current Card</h4>
            {props.card.data.brand.toUpperCase()} : {props.card.data.last4}
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>{props.card ? 'Replace ' : 'Add '}Card</h4>

          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
        <button className='float_right' disabled={!stripe && !saving}>
          Save Card
        </button>
      </form>
    </div>
  );
};

export default CardSection;
