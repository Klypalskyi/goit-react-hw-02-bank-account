import React from 'react';
import styles from './App.module.css';
import Dashboard from '../Dashboard/Dashboard';

const App = () => {
  return (
    <div className={styles.container}>
      <Dashboard />
    </div>
  );
};

export default App;
