import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import 'react-toastify/dist/ReactToastify.css';

const shortid = require('shortid');

class Dashboard extends Component {
  state = {
    id: '',
    type: '',
    amount: '',
    date: '',
    transactions: [],
    balance: 0,
    totalDeposit: 0,
    totalWithdraw: 0,
  };

  componentDidMount() {
    const { transactions, totalDeposit, totalWithdraw } = this.state;
    this.setState({
      totalDeposit: transactions
        .filter(transaction => transaction.type === 'Deposit')
        .reduce((acc, transaction) => acc + transaction.amount, 0),
      totalWithdraw: transactions
        .filter(transaction => transaction.type === 'Withdraw')
        .reduce((acc, transaction) => acc + transaction.amount, 0),
      balance: totalDeposit - totalWithdraw,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;
    const newTotalDeposit = transactions
      .filter(transaction => transaction.type === 'Deposit')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const newTotalWithdraw = transactions
      .filter(transaction => transaction.type === 'Withdraw')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const newBalance = newTotalDeposit - newTotalWithdraw;
    if (transactions.length !== prevState.transactions.length) {
      this.setState({
        totalDeposit: newTotalDeposit,
        totalWithdraw: newTotalWithdraw,
        balance: newBalance,
      });
    }
  }

  createTransaction = e => {
    const { target } = e;
    const { amount } = this.state;
    if (amount <= 0) {
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
        type: target.value,
        amount,
        date: new Date().toLocaleString(),
      };
      this.setState(prev => ({
        id: '',
        type: '',
        amount: '',
        date: '',
        transactions: [...prev.transactions, transaction],
      }));
    }
  };

  inputChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: +value });
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
