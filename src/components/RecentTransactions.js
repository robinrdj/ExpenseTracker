import React, { useState, useEffect } from "react";
import "./RecentTransactions.css";
import { IoPizzaOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { MdCardTravel } from "react-icons/md";
import Modal from 'react-modal';
import { useData } from '../Context';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const RecentTransactions = () => {
let subtitle;
const [modalIsOpen, setIsOpen] = React.useState(false);
const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [date, setDate] = useState("");
const [expenses, setExpenses] = useState([]);
const { data, setData } = useData();


const updateExpenses = ()=>{
  if(title!=" "){
    const updatedArr = data.filter((item) => item.title !== title);
    let newData ={
      title, date, amount:price, category
    }
    setData(updatedArr.concat([newData]));
  }
 
}

useEffect(()=>{
  updateExpenses();
},[]);

const openModal=()=> {
  setIsOpen(true);
}

const afterOpenModal=()=> {
}

const closeModal=()=>{
  setIsOpen(false);
}

const handleTitleChange=(e)=>{
  setTitle(e.target.value);
}
const handlePriceChange =(e)=>{
  setPrice(e.target.value);
}
const handleCategoryChange=(e)=>{
  setCategory(e.target.value);
}
const handleDateChange=(e)=>{
  setDate(e.target.value);
}
const handleSubmit=(e)=>{
  e.preventDefault();
  if(title.length!=0){
    alert(title);
    updateExpenses();
  }
  setTitle("");
  setPrice("");
  setCategory("");
  setDate("");
  closeModal();
}

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = data.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const formatDate = (dateInput) => {
    const date = new Date(dateInput); 
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const transactions = [
    { title: "Samosa", date: "2024-12-10", amount: 150 , category:"Entertainment"},
    { title: "Movie", date: "2024-12-10", amount: 300, category:"Food" },
    { title: "Auto", date: "2024-12-10", amount: 50, category:"Travel"},
    { title: "Snacks", date: "2024-12-10", amount: 100, category:"Travel" },
    { title: "Shopping", date: "2024-12-10", amount: 500 , category:"Food"},
    { title: "Taxi", date: "2024-12-10", amount: 200 , category:"Entertainment"},
    { title: "Groceries", date: "2024-12-10", amount: 400, category:"Food" },
    { title: "Cafe", date: "2024-12-10", amount: 250, category:"Entertainment" },
    { title: "Bills", date: "2024-12-10", amount: 350 , category:"Travel"},
  ];
  const deleteTransaction = (title) => {
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    const updatedArr = expenses.filter((item) => item.title !== title);
    setExpenses(updatedArr);
    if(updatedArr.length==0){
      console.log(transactions);
      setData(transactions);
    }else{
      setData(updatedArr);
    }
  
  };
  return (
    <div className="transactions__container">
      <h2>RecentTransactions</h2>
      <div className="transactions__list">
        {currentTransactions.map((transaction, index) => (
          <div className="transaction__card" key={index}>
            <div className="transaction__info">
            {transaction.category==="Food" && <IoPizzaOutline />}
                {transaction.category==="Entertainment" &&  <CiGift />}
                {transaction.category==="Travel" && <MdCardTravel/>}
              <div className="details">
                <h3>{transaction.title}</h3>
                <p>{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="transaction__actions">
              <p className="amount">{transaction.amount}</p>
              <button className="btn delete-btn"  onClick={() => {
                    deleteTransaction(transaction.title)}}>✖</button>
              <button className="btn edit-btn" onClick={openModal} >✎</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="page__btn" onClick={handlePrevPage} disabled={currentPage === 1}>
          ←
        </button>
        <span className="page__number">{currentPage}</span>
        <button className="page__btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
          →
        </button>
      </div>

      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="expenseCardRow">
        <input type="text" placeholder='Title' value={title} onChange={handleTitleChange} />
        <input type="number" placeholder='Price' value={price} onChange={handlePriceChange}/>
        </div>
        <div className="expenseCardRow">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option Value="Food">Food</option>
          <option Value="Entertainment">Entertainment</option>
          <option Value="Travel">Travel</option>
        </select>
        <input type="date" placeholder='dd/mm/yyyy' value={date} onChange={handleDateChange}/>
        </div>
        <div className="expenseCardRow">
        <button type='submit'>Add Expense</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </Modal>

    </div>
  );
};

export default RecentTransactions;
