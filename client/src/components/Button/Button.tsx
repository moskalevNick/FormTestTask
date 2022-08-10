import React from 'react';
import styles from './Button.styles.scss';

export const Button = ({ disabled }): JSX.Element => (
  <button disabled={disabled} className={styles.btn}>
    {!disabled ? 'Отправить' : 'Загрузка...'}
  </button>
);
