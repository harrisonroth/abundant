import React from 'react';
import { makePost, makeGet } from '../../../Shared/Utils/request';
import { useEffect, useState } from 'react';
import { AddressForm } from '../../../Shared/Components/CartDrawer/Checkout/AddressForm';
import { button } from '@material-ui/core';
import { validateAddress } from '../../../Shared/Utils/variableValidation';
import './AddressSectionStyles.css';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const AddressSection = props => {
  const [shippingDetails, setShippingDetails] = useState(
    props.user.settings.shippingAddress,
  );
  const [shippingError, setShippingError] = useState('');
  const [billingDetails, setBillingDetails] = useState(
    props.user.settings.billingAddress,
  );
  const [billingError, setBillingError] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [shippingSaved, setShippingSaved] = useState(false);
  const [billingSaved, setBillingSaved] = useState(false);

  const [showShipping, setShowShip] = React.useState(false);
  const [showBilling, setShowBill] = React.useState(false);

  const setShowShipping = event => {
    event.preventDefault();
    setShowShip(!showShipping);
  };

  const setShowBilling = event => {
    event.preventDefault();
    setShowBill(!showBilling);
  };

  const savedString = 'Address was saved successfully';

  const saveShippingAddress = () => {
    let settings = props.user.settings;
    settings.shippingAddress = shippingDetails;
    makePost('/auth/updateSettings', { settings: settings }, () =>
      setShippingSaved(true),
    );
  };

  const saveBillingAddress = () => {
    let settings = props.user.settings;
    settings.billingAddress = billingDetails;
    makePost('/auth/updateSettings', { settings: settings }, () =>
      setBillingSaved(true),
    );
  };

  const saveAddresses = () => {
    let settings = props.user.settings;
    settings.billingAddress = shippingDetails;
    settings.shippingAddress = shippingDetails;
    makePost('/auth/updateSettings', { settings: settings }, () =>
      setShippingSaved(true),
    );
  };

  return (
    <div className='address_section'>
      <div className='shipping_address'>
        <h3 onClick={setShowShipping}>
          Shipping Address{' '}
          {showShipping ? <FaCaretUp></FaCaretUp> : <FaCaretDown></FaCaretDown>}{' '}
        </h3>
        {showShipping ? (
          <div>
            {shippingSaved ? (
              <AddressForm
                address={shippingDetails}
                setAddress={setShippingDetails}
                errorString={shippingError}
                saved={savedString}
              />
            ) : (
              <AddressForm
                address={shippingDetails}
                setAddress={setShippingDetails}
                errorString={shippingError}
              />
            )}
            <input
              style={{ width: '8%' }}
              type='checkbox'
              checked={sameAsShipping}
              onChange={() => {
                setSameAsShipping(!sameAsShipping);
              }}
            />
            <label>Shipping Address same as Billing</label>
            <button
              variant='contained'
              className='float_right'
              onClick={() => {
                let errorString = validateAddress(shippingDetails);
                if (errorString.length > 0) {
                  setShippingError(errorString);
                  return;
                }
                if (sameAsShipping) {
                  saveAddresses();
                } else {
                  saveShippingAddress();
                }
              }}
            >
              Save Address
            </button>
          </div>
        ) : null}
      </div>
      <br></br>
      <div className='billing_address'>
        <h3 onClick={setShowBilling}>
          Billing Address{' '}
          {showBilling ? <FaCaretUp></FaCaretUp> : <FaCaretDown></FaCaretDown>}{' '}
        </h3>
        {showBilling ? (
          <div>
            {billingSaved ? (
              <AddressForm
                address={billingDetails}
                setAddress={setBillingDetails}
                errorString={billingError}
                saved={savedString}
              />
            ) : (
              <AddressForm
                address={billingDetails}
                setAddress={setBillingDetails}
                errorString={billingError}
              />
            )}

            <button
              variant='contained'
              className='float_right'
              onClick={() => {
                let errorString = validateAddress(billingDetails);
                if (errorString.length > 0) {
                  setBillingError(errorString);
                  return;
                }
                saveBillingAddress();
              }}
            >
              Save Address
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
