import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, deposit, withdraw }) => (
  <div className={styles.balanceBox}>
    <div className={styles.depositBox}>
      <span className={styles.depositArrow}>&uarr;</span> {deposit}$
    </div>
    <div className={styles.withdrawBox}>
      <span className={styles.withdrawArrow}>&darr;</span> {withdraw}$
    </div>
    <div className={styles.total}>Balance: {balance}$</div>
  </div>
);

Balance.propTypes = {
  balance: PropTypes.number,
  deposit: PropTypes.number,
  withdraw: PropTypes.number,
};

Balance.defaultProps = {
  balance: 0,
  deposit: 0,
  withdraw: 0,
};

export default Balance;
