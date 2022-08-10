import React from 'react';
import { currencyMask } from '../Form/validateInfo';
import { IProps } from './Input.props';
import styles from './Input.styles.scss';

export const Input = (props: IProps) => {
  const { inputName, onChange } = props;
  const {
    label,
    errorMessage,
    placeholder,
    name,
    value,
    touched,
    valide,
    type,
  } = inputName;

  let phone = name === 'phone';

  return (
    <div className={styles.form_input}>
      <label>{label}</label>
      <input
        type={type}
        className={styles.form_input_item}
        style={{ border: touched && valide ? '1px solid red' : 'none' }}
        placeholder={placeholder}
        name={name}
        maxLength={phone ? 14 : 300}
        onChange={
          phone
            ? (e) => onChange(currencyMask(e.target.value), name)
            : (e) => onChange(e.target.value, name)
        }
        value={value}
      />
      {touched && valide ? <span>{errorMessage}</span> : null}
    </div>
  );
};
