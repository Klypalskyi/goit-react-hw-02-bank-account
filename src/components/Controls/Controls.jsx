import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ amount, createTransaction, inputChange }) => (
  <section className={styles.controls}>
    <input
      type="number"
      value={amount}
      className={styles.input}
      name="amount"
      placeholder="Enter your amount"
      onChange={inputChange}
    />
    <button
      type="button"
      value="Deposit"
      name="Deposit"
      className={styles.button}
      onClick={createTransaction}
    >
      Deposit
    </button>
    <button
      type="button"
      value="Withdraw"
      name="Withdraw"
      className={styles.button}
      onClick={createTransaction}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  amount: PropTypes.string.isRequired,
  createTransaction: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default Controls;
