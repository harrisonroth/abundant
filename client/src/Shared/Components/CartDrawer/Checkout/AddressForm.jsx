import React, { useState, useEffect } from 'react';

const AddressItem = props => {
  return (
    <div className='row form-group justify-content-start'>
      <label className='col-sm-4 col-form-label'>{props.label}</label>
      <div className='col-xl-8'>
        <input
          type='text'
          defaultValue={props.value}
          onChange={props.onChange}
          className='form-control'
          placeholder={props.value}
        />
      </div>
    </div>
  );
};

const AddressInput = props => {
  return (
    <div className='card'>
      <div className='card-body'>
        <AddressItem
          label='Street'
          value={props.street}
          onChange={props.streetOnChange}
        />
        <AddressItem
          label='City'
          value={props.city}
          onChange={props.cityOnstreetOnChange}
        />
        <AddressItem
          label='State'
          value={props.state}
          onChange={props.stateOnstreetOnChange}
        />
        <AddressItem
          label='Postal Code'
          value={props.zipCode}
          onChange={props.zipCodeOnstreetOnChange}
        />
      </div>
    </div>
  );
};

export const AddressForm = props => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    props.setAddress({
      street: street,
      city: city,
      state: state,
      zipcode: zipCode,
    });
  }, [street, city, state, zipCode]);

  return (
    <div className='container'>
      <AddressInput
        street={street}
        streetOnChange={setStreet}
        city={city}
        cityOnChange={setCity}
        state={state}
        stateOnChange={setState}
        zipCode={zipCode}
        zipCodeOnChange={setZipCode}
      />
      <br />
    </div>
  );
};
