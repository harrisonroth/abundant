import React, { useState, useEffect } from 'react';

const AddressItem = props => {
  return (
    <div className='row form-group justify-content-start'>
      <label className='col-sm-4 col-form-label'>{props.label}</label>
      <div className='col-xl-8'>
        <input
          type='text'
          defaultValue={props.value}
          onChange={e => props.onChange(e.target.value)}
          className='form-control'
          placeholder={props.value}
        />
      </div>
    </div>
  );
};

const AddressInput = props => {
  return (
    <div className='address_card'>
      <div className='card-body'>
        <AddressItem
          label='Street'
          value={props.street}
          onChange={props.streetOnChange}
        />
        <AddressItem
          label='City'
          value={props.city}
          onChange={props.cityOnChange}
        />
        <AddressItem
          label='State'
          value={props.state}
          onChange={props.stateOnChange}
        />
        <AddressItem
          label='Postal Code'
          value={props.zipCode}
          onChange={props.zipCodeOnChange}
        />
      </div>
    </div>
  );
};

export const AddressForm = props => {
  const [street, setStreet] = useState(
    props.address ? props.address.line1 : '',
  );
  const [city, setCity] = useState(props.address ? props.address.city : '');
  const [state, setState] = useState(props.address ? props.address.state : '');
  const [zipCode, setZipCode] = useState(
    props.address ? props.address.postal_code : '',
  );

  useEffect(() => {
    props.setAddress({
      line1: street,
      city: city,
      state: state,
      postal_code: zipCode,
    });
  }, [street, city, state, zipCode]);

  return (
    <div className=''>
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
