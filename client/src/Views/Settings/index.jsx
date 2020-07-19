import React, { useEffect, useState } from 'react';
import SettingsViewStyles from './SettingsViewStyles';
import { FaSpinner } from 'react-icons/fa';
import { makeGet, makePost } from '../../Shared/Utils/request';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardSection from './CardSection';

const stripePromise = loadStripe(
  'pk_test_51H5cuhBlog3CYTmE5G41BqgL6ZhNmYgcSSf7YgykC5IX6KWBJN1jknowTKO4l3XvhWHTW4dzaDTTcf5Ymj8gmWHT00Qus2EI0C',
);

export const SettingsView = props => {
  const [settings, setSettings] = useState([]);
  const [editCardSettings, setEditCardSettings] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cardNumber, setCardNumber] = useState(
    props.user.settings.card.credit_card,
  );
  const [cvc, setCVC] = useState(props.user.settings.card.cvc);
  const [exp_month, setExpMonth] = useState(''); //props.user.settings.card.exp_month);
  const [exp_year, setExpYear] = useState(''); //props.user.settings.card.exp_year);
  const [secret, setSecret] = useState('');
  const [card, setCard] = useState('');

  const setSettingsList = user => {
    setLoaded(true);
    setSettings(user.settings);
  };

  const updateCardSettings = () => {
    var updated = settings;
    updated.card.credit_card = cardNumber;
    updated.card.cvc = cvc;
    updated.card.exp_month = exp_month;
    updated.card.exp_year = exp_year;
    props.updateSettings(updated);
    makePost('/auth/updateSettings', { settings: updated });
  };

  useEffect(() => {
    let user = props.user;
    if (user === null) {
      makeGet('/auth/userData', setSettingsList);
    } else {
      setSettingsList(user);
    }

    getCardData();
  }, []);

  const getCardData = () => {
    setSecret('');
    makeGet('/payments/addCard', data => {
      setSecret(data.client_secret);
    });
    makeGet('/payments/getCard', data => {
      setCard(data);
    });
  };

  const getCardSettings = () => {
    if (!loaded) {
      return (
        <div className='no_notifications'>
          <FaSpinner height='40' width='40' />
        </div>
      );
    }
    return (
      <div className='section'>
        <div className='section_title'>
          <div className='edit_card_section'>
            {editCardSettings ? (
              // Add data validation here
              <div>
                <button
                  title='Save'
                  variant='contained'
                  onClick={() => {
                    setEditCardSettings(false);
                    updateCardSettings();
                  }}
                >
                  Save
                </button>

                <button
                  title='Cancel'
                  variant='contained'
                  onClick={() => {
                    setEditCardSettings(false);
                    setCardNumber(props.user.settings.card.credit_card);
                    setCVC(props.user.settings.card.cvc);
                    setZipCode(props.user.settings.card.zip_code);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                title='Edit'
                variant='contained'
                onClick={() => setEditCardSettings(true)}
              >
                Edit
              </button>
            )}
          </div>
          <h3>Card Settings</h3>
        </div>
        <div className='section_body'>
          <div className='item'>
            <label>Card Number:</label>
            {editCardSettings ? (
              <input
                placeholder={cardNumber}
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
              />
            ) : (
              cardNumber
            )}
          </div>
          <div className='item'>
            <label>CVC:</label>
            {editCardSettings ? (
              <input
                placeholder={cvc}
                value={cvc}
                onChange={e => setCVC(e.target.value)}
              />
            ) : (
              cvc
            )}
          </div>
          <div className='item'>
            <label>Expiration:</label>
            {editCardSettings ? (
              <div className='exp'>
                <input
                  placeholder={exp_month}
                  value={exp_month}
                  onChange={e => setExpMonth(e.target.value)}
                />
                /
                <input
                  placeholder={exp_year}
                  value={exp_year}
                  onChange={e => setExpYear(e.target.value)}
                />
              </div>
            ) : exp_month === '' ? null : (
              `${exp_month} / ${exp_year}`
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <SettingsViewStyles />
      <div className='content_header'>
        <h1>Settings</h1>
        <div className='cart_icon'>{props.getCartIcon()}</div>
      </div>
      {/* <div className='settings_sections'>{getCardSettings()}</div> */}
      {secret !== '' ? (
        <Elements stripe={stripePromise}>
          <CardSection
            secret={secret}
            user={props.user}
            card={card}
            updateCard={getCardData}
          />
        </Elements>
      ) : null}
    </div>
  );
};
