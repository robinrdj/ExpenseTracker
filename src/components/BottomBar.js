import React from 'react';
import "./BottomBar.css";
import TopExpenses from './TopExpenses';
import RecentTransactions from "./RecentTransactions";
import { useData } from '../Context';


function BottomBar() {
  return (
    <div className='bottomBar'>
      <div className='bottomBar__left'>
      <RecentTransactions />
      </div>
      <div className='bottomBar__right'>
      <TopExpenses />
      </div>
    </div>
  )
}

export default BottomBar;