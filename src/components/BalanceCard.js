import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSnackbar } from 'notistack';
import './BalanceCard.css';

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

function BalanceCard() {
  const { enqueueSnackbar } = useSnackbar();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [income, setIncome] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(JSON.parse(localStorage.getItem('balance')) || 5000);
  }, []);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setIncome('');
  };
  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBalance = balance + parseInt(income || 0);
    localStorage.setItem('balance', JSON.stringify(newBalance));
    setBalance(newBalance);
    enqueueSnackbar('Income added successfully!', { variant: 'success' });
    closeModal();
  };
  return (
    <div className="balanceCard">
      <h3>Wallet Balance: <span style={{color:"rgb(157, 255, 91)"}}>₹{balance}</span></h3>
      <button onClick={openModal} className='balanceCard__button'>+ Add Income</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Income Modal"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' , flexDirection:"column"}}>
        <div className="balanceCardRow">
          <input
            type="number"
            placeholder="Income Amount"
            value={income}
            onChange={handleIncomeChange}
            required
          />
          <button type="submit" className='button__submit'>Add Balance</button>
          <button type="button" className='button__cancel' onClick={closeModal}>
            Cancel
          </button>
          </div>       
        </form>
       
      </Modal>
    </div>
  );
}

export default BalanceCard;
