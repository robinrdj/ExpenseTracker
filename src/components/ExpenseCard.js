import React,{useState, useEffect} from 'react';
import Modal from 'react-modal';
import "./ExpenseCard.css";
import { useData } from '../Context';
import { useSnackbar } from 'notistack';

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

function ExpenseCard() {
  const { enqueueSnackbar } = useSnackbar();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const { data, setData } = useData();

  const updateExpenses = ()=>{
    let currentBalance=JSON.parse(localStorage.getItem('balance')) || 5000;
    if(currentBalance<price){
      enqueueSnackbar('Cannot spend more than the wallet balance', { variant: 'warning' });
    }else{
      let newData ={
        title, date, amount:price, category
      }
      setData((prevData)=>[...prevData,newData]);
    }
  }
  useEffect(()=>{
    updateExpenses();
  },[]);

  const openModal = ()=> {
    setIsOpen(true);
  }

  const afterOpenModal= () => {
  }

  const closeModal = ()=> {
    setIsOpen(false);
  }

  const handleTitleChange = (e) =>{
    setTitle(e.target.value);
  }
  const handlePriceChange = (e)=>{
    setPrice(e.target.value);
  }
  const handleCategoryChange=(e)=>{
    setCategory(e.target.value);
  }
  const handleDateChange = (e)=>{
    setDate(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    localStorage.setItem("expenses",JSON.stringify([...expenses,{title,price,category,date}]));
    updateExpenses();
    closeModal();
  }

  return (
    <div className='expenseCard'>
      <h3>Expenses: <span style={{color:" rgb(244, 187, 74)"}}>₹500</span></h3>
    <button onClick={openModal} className='expenseCard__button'>+ Add Expense</button>
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
        <button type='submit' className='button__submit'>Add Expense</button>
        <button onClick={closeModal} className='button__cancel'>Cancel</button>
        </div>
      </form>
    </Modal>
  </div>
  )
}

export default ExpenseCard