// Kolla om en string innehåller special karaktärer
export const hasSpecial = (inputString) => {
  // Bara en enkel regex, skulle inte vara ok i produktion
  return inputString.match(/\W/) ? true : false;
}

// Kolla om en string innehåller nummer
export const hasNumber = (inputString) => {
  return /\d/.test(inputString);
}

// Kolla in en email är ok
export const checkEmail = (inputEmail) => {
  // eslint-disable-next-line 
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!regex.test(inputEmail)) {
    return { success: false, msg: 'You must enter a valid email adress' };
  }
  return { success: true, msg: inputEmail };
};

