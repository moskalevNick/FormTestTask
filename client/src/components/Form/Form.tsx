import React, { FormEvent, useState } from 'react';
import { Input } from '..';
import { IFormState, IInputProps, IMessage } from './Form.props';
import { isValid } from './validateInfo';
import styles from './Form.styles.scss';
import { Button } from '../Button/Button';
import axios from 'axios';

const defaultValues = {
  username: {
    name: 'username',
    value: '',
    type: 'text',
    placeholder: 'Имя и Фамилия',
    errorMessage: 'Введите имя и фамилию корректно!',
    label: 'Имя и Фамилия',
    valide: false,
    touched: false,
  },
  email: {
    name: 'email',
    value: '',
    type: 'email',
    placeholder: 'Email',
    errorMessage: 'Введите корректный email!',
    label: 'Email',
    valide: false,
    touched: false,
  },
  phone: {
    name: 'phone',
    value: '',
    type: 'text',
    placeholder: '+(7,8,9)(000)000-00-00',
    errorMessage: 'Нужно ввести российский номер телефона!',
    label: 'Номер телефона',
    valide: false,
    touched: false,
  },
  birthday: {
    name: 'birthday',
    value: '',
    type: 'date',
    placeholder: 'День рождения',
    errorMessage: 'Введите дату рождения!',
    label: 'День рождения',
    valide: false,
    touched: false,
  },
  message: {
    name: 'message',
    value: '',
    type: 'text',
    placeholder: 'Сообщение',
    errorMessage: 'Сообщение не соответствует нужной длине!',
    label: 'Сообщение',
    valide: false,
    touched: false,
  },
};

export const Form = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage>({ status: false, text: '' });
  const [values, setValues] = useState<IFormState>(defaultValues);

  const checkForm = () => {
    let result = false;
    Object.keys(values).forEach((name) => {
      if (!values[name].valide && values[name].touched) {
        result = true;
      } else {
        values[name].valide = true;
        values[name].touched = true;
        renderMessages('Заполните форму', false);
        return false;
      }
    });
    return result;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.defaults.baseURL = 'http://localhost:5000';
    const isFormvalid = checkForm();
    if (isFormvalid) {
      const { username, email, birthday, message, phone } = values;
      const data = {
        username: username.value,
        email: email.value,
        birthday: birthday.value,
        phone: phone.value,
        message: message.value,
      };

      try {
        setLoading(true);
        const response = await axios.post('/submitForm', data);
        if (response.data.message === 'success') {
          renderMessages('Сообщение принято', true);
          clearInputs();
          setLoading(false);
        } else {
          setLoading(false);

          const errorField = response.data.errorField;
          let searchableValue;
          for (let value in defaultValues) {
            if ((value = errorField)) {
              searchableValue = defaultValues[errorField].label;
            }
          }

          return renderMessages(`Ошибка в поле: ${searchableValue}`, false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      return renderMessages('Форма заполнена некорректно!', false);
    }
  };

  const onChange = (value: string, input: IInputProps['name']) => {
    const copyValues = { ...values };
    const control = copyValues[input];
    if (input === 'username') {
      control.value = value.toUpperCase();
    } else {
      control.value = value;
    }
    control.touched = true;
    control.valide = isValid(control.value, input);
    setValues(copyValues);
  };

  const renderInputs = () => {
    return Object.keys(values).map((input, index) => {
      const inputName: IInputProps = values[input];
      return (
        <Input
          key={inputName.name + index}
          inputName={inputName}
          onChange={onChange}
        />
      );
    });
  };

  const renderMessages = (mess: string, status: boolean) => {
    setMessage({ text: mess, status });
    setTimeout(() => {
      setMessage({ text: '', status: false });
    }, 4000);
  };

  const clearInputs = () => {
    const copyState = { ...values };
    Object.keys(copyState).forEach((name) => {
      copyState[name].value = '';
    });
    setValues(copyState);
  };

  return (
    <div className={styles.form_contaner}>
      <form onSubmit={handleSubmit} noValidate>
        {renderInputs()}
        <Button disabled={loading ? true : false} />
      </form>
      <div
        className={styles.message}
        style={{
          display: message ? 'block' : 'none',
          color: !message['status'] ? 'red' : 'green',
        }}
      >
        {message['text']}
      </div>
    </div>
  );
};
