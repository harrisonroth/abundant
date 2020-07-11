import React, { useEffect, useState } from 'react';
import SettingsViewStyles from './SettingsViewStyles';
import { FaSpinner } from 'react-icons/fa';
import { makeGet, makePost } from '../../Shared/Utils/request';

export const SettingsView = props => {
  const [settings, setSettings] = useState([]);
  const [editCardSettings, setEditCardSettings] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cardNumber, setCardNumber] = useState(
    props.user.settings.card.credit_card,
  );
  const [cvc, setCVC] = useState(props.user.settings.card.cvc);
  const [zipCode, setZipCode] = useState(props.user.settings.card.zip_code);

  const setSettingsList = user => {
    setLoaded(true);
    console.log(user.settings);
    setSettings(user.settings);
  };

  const updateCardSettings = () => {
    var updated = settings;
    updated.card.credit_card = cardNumber;
    updated.card.cvc = cvc;
    updated.card.zip_code = zipCode;
    props.updateSettings(updated);
    makePost('/auth/updateSettings', { settings: updated });
  };

  useEffect(() => {
    let user = props.user;
    console.log(user);
    if (user === null) {
      makeGet('/auth/userData', setSettingsList);
    } else {
      setSettingsList(user);
    }
  }, []);

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
            <label>Zip Code:</label>
            {editCardSettings ? (
              <input
                placeholder={zipCode}
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
              />
            ) : (
              zipCode
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
      <div className='settings_sections'>{getCardSettings()}</div>
    </div>
  );
};
