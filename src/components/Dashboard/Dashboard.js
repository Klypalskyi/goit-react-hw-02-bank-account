import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import 'react-toastify/dist/ReactToastify.css';

const shortid = require('shortid');

class Dashboard extends Component {
  state = {
    type: '',
    amount: '',
    date: '',
    transactions: [],
    totalDeposit: 0,
    totalWithdraw: 0,
  };

  createTransaction = e => {
    const { target } = e;
    const { amount } = this.state;
    const newAmount = +amount;
    if (newAmount <= 0) {
      toast.error('Amount must be more then 0', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const transaction = {
        id: shortid.generate(),
        type: target.name,
        amount: newAmount,
        date: new Date().toLocaleString(),
      };
      if (transaction.type === 'Deposit') {
        this.setState(prev => ({
          id: '',
          type: '',
          amount: '',
          date: '',
          transactions: [...prev.transactions, transaction],
          totalDeposit: prev.totalDeposit + transaction.amount,
          balance: prev.totalDeposit + transaction.amount - prev.totalWithdraw,
        }));
      }
      if (transaction.type === 'Withdraw') {
        this.setState(prev => ({
          id: '',
          type: '',
          amount: '',
          date: '',
          transactions: [...prev.transactions, transaction],
          totalWithdraw: prev.totalWithdraw + transaction.amount,
          balance: prev.totalDeposit - transaction.amount - prev.totalWithdraw,
        }));
      }
    }
  };

  inputChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      totalDeposit,
      balance,
      totalWithdraw,
      transactions,
      amount,
    } = this.state;
    return (
      <div className="DashboardWrapper">
        <Controls
          amount={amount}
          inputChange={this.inputChange}
          createTransaction={this.createTransaction}
        />
        <Balance
          balance={balance}
          deposit={totalDeposit}
          withdraw={totalWithdraw}
        />
        <TransactionHistory transactions={transactions} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default Dashboard;
