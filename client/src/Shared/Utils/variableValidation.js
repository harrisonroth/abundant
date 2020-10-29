export const validateAddress = address => {
  if (
    !(
      hasValue(address.line1) &&
      hasValue(address.city) &&
      hasValue(address.state) &&
      hasValue(address.postal_code)
    )
  ) {
    return 'All fields must have a value';
  }
  let zip = Number(address.postal_code);
  if (address.postal_code.length != 5 || Number.isNaN(zip)) {
    return 'Zipcode is not valid';
  }
  return '';
};

export const hasValue = value => {
  return value !== null && value !== '' && value !== undefined;
};
