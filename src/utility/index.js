import moment from 'moment';

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  const stringRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])');
  const numberRegex = new RegExp('^(?=.*[0-9])');
  const specialRegex = new RegExp('^(?=.*[!@#$%^&*])');
  const lengthRegex = new RegExp('^(?=.{8,16})');
  return {
    checkedString: stringRegex.test(password),
    checkedNumber: numberRegex.test(password),
    checkedSpecial: specialRegex.test(password),
    checkedLength: lengthRegex.test(password),
  };
};

export const validationStr = (name) => {
  const regName = /^[a-z A-Z 0-9,.'-]+$/i;
  return regName.test(name);
};

export const validationName = (name) => {
  const regName = /^[a-z A-Z 0,.'-]+$/i;
  return regName.test(name);
};

export const validationDate = (date) => {
  const validDate = moment(date, 'MM-DD-YYYY');
  return validDate.isValid() && validDate.year() > 1900;
};

export const occurrence = (transferType) => {
  let type = 'investment';
  if (
    transferType.toLowerCase() === 'ach_withdrawal' ||
    transferType.toLowerCase() === 'liquidation'
  ) {
    type = 'withdrawal';
  }
  return type;
};

export const transferState = (state) => {
  if (
    state.toLowerCase() === 'requested' ||
    state.toLowerCase() === 'fundsposted' ||
    state.toLowerCase() === 'postponed'
  ) {
    return 'Processing';
  }
  if (
    state.toLowerCase() === 'rejectedunapproved' ||
    state.toLowerCase() === 'rejectedvalidationfailed'
  ) {
    return 'Failed';
  }
  return state;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
