import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);
const transactions = [
    { title: "Samosa", date: "2024-12-10", amount: 150 , category:"Entertainment"},
    { title: "Movie", date: "2024-12-10", amount: 300, category:"Food" },
    {  title: "Auto", date: "2024-12-10", amount: 50, category:"Travel"},
    { title: "Snacks", date: "2024-12-10", amount: 100, category:"Travel" },
    { title: "Shopping", date: "2024-12-10", amount: 500 , category:"Food"},
    {  title: "Taxi", date: "2024-12-10", amount: 200 , category:"Entertainment"},
    {title: "Groceries", date: "2024-12-10", amount: 400, category:"Food" },
    { title: "Cafe", date: "2024-12-10", amount: 250, category:"Entertainment" },
    // {title: "Bills", date: "2024-12-10", amount: 350 , category:"Travel"},
  ];
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
        console.log(JSON.parse(localStorage.getItem('expenses')));
        return JSON.parse(localStorage.getItem('expenses')) || transactions;

  });
  useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
