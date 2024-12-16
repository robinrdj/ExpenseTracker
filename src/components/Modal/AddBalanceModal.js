import React from "react";
import "./AddBalanceModal.css";

const AddBalanceModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Balance</h2>
        <form>
          <div className="form-group">
            <input type="number" placeholder="Income Amount" />
          </div>
          <div className="buttons">
            <button type="submit" className="add-btn">Add Balance</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBalanceModal;
