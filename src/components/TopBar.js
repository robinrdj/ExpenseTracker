import React from 'react';
import BalanceCard from './BalanceCard';
import ExpenseCard from './ExpenseCard';
import PieChartCard from './PieChartCard';
import './TopBar.css';

function TopBar() {
  return (
    <div className="topBar">
      {/* <div className="cardContainer"> */}
        <BalanceCard />
        <ExpenseCard />
      {/* </div> */}
      {/* <div className="chartContainer"> */}
        <PieChartCard />
      {/* </div> */}
    </div>
  );
}

export default TopBar;
