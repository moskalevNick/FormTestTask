const rule = {
  validName: /^([A-Z-А-ЯЁ]){3,30}\s{1}([A-Z-А-ЯЁ|\-]){3,30}$/,
  validEmail: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
  validBirthday: /^(\d{4}\-\d{2}\-\d{2})$/,
  validPhone: /^\+?(\d)(\()(\d{3})(\))(\d{7})$/,
};

export const isValid = (value: string, inputName: string): boolean => {
  if (!value) {
    return true;
  }
  try {
    switch (inputName) {
      case 'username':
        return !rule.validName.test(value);
      case 'email':
        return !rule.validEmail.test(value);
      case 'message':
        return !(value.length > 9 && value.length < 301);
      case 'phone':
        return !rule.validPhone.test(value);
      case 'birthday':
        return !rule.validBirthday.test(value);
    }
  } catch {
    alert(
      'Что-то пошло не так, Пересмотрите заполнение формы, возможно, это всё из-за вас!'
    );
    return false;
  }
};

const clearOnLetters = (val: string) => {
  return val.replace(/(\D)g/, '');
};

export const currencyMask = (value: string) => {
  let inputVal = clearOnLetters(value);
  if (!inputVal) {
    return (inputVal = '');
  }

  return strClear(inputVal);
};

function strClear(str: string) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      newStr += '+';
    } else if (!['7', '8', '9'].includes(str[1])) {
      newStr += '7';
    } else if (i === 2) {
      newStr += '(';
    } else if (i === 6) {
      newStr += ')';
    } else {
      newStr += str[i];
    }
  }

  return newStr;
}
