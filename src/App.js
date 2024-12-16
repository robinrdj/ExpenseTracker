import './App.css';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import { SnackbarProvider, useSnackbar } from 'notistack';
import RecentTransactions from "./components/RecentTransactions";
import TopExpenses from './components/TopExpenses';
import { DataProvider } from './Context';


// import AddBalanceModal from './components/AddBalanceModal';

import React from 'react';

function App() {
  return (
    <div className="App">
      <DataProvider>
      <SnackbarProvider>
      <TopBar />
      <BottomBar />
      </SnackbarProvider>
      </DataProvider>
     
    </div>
  );
}

export default App;
